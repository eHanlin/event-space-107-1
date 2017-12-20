const gulp = require("gulp");
const fs = require("fs");
const del = require("del");
const Q = require("q");
const templateUtil = require("gulp-template-util");
const replace = require("gulp-replace");
const replaceMulti = require("gulp-replace-pro");
const babel = require("gulp-babel");
const imagemin = require("gulp-imagemin");
const pngquant = require("imagemin-pngquant");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify-es").default;

const basePath = {
  base: "src"
};
const dist = "dist";

function libTask(destination) {
  console.log("=======> libTask <=======");
  return function () {
    let packageJson = JSON.parse(
      fs.readFileSync("package.json", "utf8").toString()
    );

    if ( !packageJson.dependencies ) {
      packageJson.dependencies = {};
    }

    let webLibModules = [];
    for ( let module in packageJson.dependencies ) {
      webLibModules.push("node_modules/" + module + "/**/*");
    }

    return gulp
      .src(webLibModules, {
        base: "node_modules/"
      })
      .pipe(gulp.dest(destination));
  };
}

function copyStaticTask(destination) {
  console.log("=======> copyStaticTask <=======");
  return function () {
    return gulp
      .src(
        [
          "src/**/*.html",
          "src/img/**/*",
          "src/css/**/*.css",
          "src/js/package/*.css",
          "src/lib/**/*",
          "src/js/**/*.js",
          "src/js/package/*.js"
        ], {
          base: "src"
        }
      )
      .pipe(gulp.dest(destination));
  };
}

function clean(sourceDir) {
  console.log(`=======> clean ${sourceDir} <=======`);

  return function () {
    return del([sourceDir]);
  };
}

function devToBuildEnv() {
  gulp
    .src(["src/js/*.js"], {
      base: "./"
    })
    .pipe(replace(/[^\w](http:\/\/localhost:8080)\/([\w-\/]+)"/g, function (match, p1, p2) {
        let buildEnv = `"/${p2}"`;
        console.log(`chest domain => ${match} to ${buildEnv}`);
        return buildEnv
      })
    )
    .pipe(replace(/[^\w](http:\/\/localhost:9090)\/([\w-\/]+)\?userSpecific=([\w])+"/g, function (match, p1, p2) {
        let buildEnv = `"/${p2}"`;
        console.log(`currencyBank domain => ${match} to ${buildEnv}`);
        return buildEnv
      })
    )
    .pipe(gulp.dest(""));
}

function buildEnvToDev() {
  gulp
    .src(["src/js/*.js"], {
      base: "./"
    })
    .pipe(replace(/[^\w]\/(chest)\/([\w-\/]+)"/g, function (match, p1, p2) {
        let dev = `"http://localhost:8080/${p1}/${p2}"`;
        console.log(`chest domain => ${match} to ${dev}`);
        return dev
      })
    )
    .pipe(replace(/[^\w]\/(currencyBank)\/([\w-\/]+)"/g, function (match, p1, p2) {
        let dev = `"http://localhost:9090/${p1}/${p2}?userSpecific=${gulp.env.user}"`;
        console.log(`currencyBank domain => ${match} to ${dev}`);
        return dev
      })
    )
    .pipe(gulp.dest(""));
}

function minifyImage(sourceImage) {
  console.log("=======> minifyImage <=======");
  return function () {
    return gulp
      .src(sourceImage, basePath)
      .pipe(imagemin({
        use: [pngquant()]
      }))
      .pipe(gulp.dest(dist));
  };
}

function minifyCSS(sourceCss) {
  console.log("=======> minifyCSS <=======");
  return function () {
    return gulp
      .src(sourceCss, basePath)
      .pipe(cleanCSS({
        keepBreaks: true
      }))
      .pipe(gulp.dest(dist));
  };
}

function minifyJS(sourceJS) {
  console.log("=======> minifyJS <=======");
  return function () {
    return gulp
      .src(sourceJS, { base: "babel-temp" })
      .pipe(
        uglify({
          mangle: false
        }).on("error", function (error) {
          console.log(error);
        })
      )
      .pipe(gulp.dest(dist));
  };
}

function babelJS(sourceJS) {
  return function () {
    return gulp
      .src(sourceJS, basePath)
      .pipe(babel())
      .pipe(gulp.dest("babel-temp"));
  };
}

function buildJS() {
  console.log("=======> buildJS <=======");
  let deferred = Q.defer();

  Q.fcall(function () {
    return templateUtil.logStream(babelJS(["src/js/*.js"]));
  }).then(function () {
    return templateUtil.logStream(minifyJS("babel-temp/js/**/*.js"));
  }).then(function () {
    return templateUtil.logPromise(clean("babel-temp"));
  });

  return deferred.promise;
}

gulp.task("lib", libTask("src/lib"));
gulp.task("build", ["style", "lib"]);
gulp.task("minifyCSS", minifyCSS("src/css/**/*.css"));
gulp.task("minifyImage", minifyImage("src/img/**/*.png"));
gulp.task("minifyJS", minifyJS("src/js/**/*.js"));
gulp.task("buildEnvToDev", buildEnvToDev);
gulp.task("devToBuildEnv", devToBuildEnv);
gulp.task("package", function () {
  var deferred = Q.defer();
  Q.fcall(function () {
    return templateUtil.logPromise(clean(dist));
  }).then(function () {
    return templateUtil.logStream(copyStaticTask("dist"));
  }).then(function () {
    return Q.all([
      templateUtil.logStream(minifyImage("src/img/**/*.png")),
      templateUtil.logStream(minifyCSS("src/css/**/*.css")),
      templateUtil.logStream(buildJS)
    ]);
  });

  return deferred.promise;
});