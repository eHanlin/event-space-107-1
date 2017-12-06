let gulp = require("gulp");
let fs = require("fs");
let del = require("del");
let Q = require("q");
let util = require("gulp-template-util");
let replace = require('gulp-replace-pro');
let babel = require("gulp-babel");
let imagemin = require("gulp-imagemin");
let pngquant = require("imagemin-pngquant");
let cleanCSS = require("gulp-clean-css");
let uglify = require('gulp-uglify-es').default;

let basePath = { base: "src" };
var dist = "dist";

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
      .src(webLibModules, { base: "node_modules/" })
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
        ],
        {
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

function replaceToDev() {
  gulp.src(["src/js/event-totalAssets.js", "src/js/event-userchest.js"], { base: "./" })
    .pipe(replace({
      "https://test.ehanlin.com.tw/chest": "http://localhost:8080/chest",
      "https://test.ehanlin.com.tw/currencyBank": "http://localhost:9090/currencyBank"
    }))
    .pipe(gulp.dest(''))
}

function replaceToTest() {
  gulp.src(["src/js/event-totalAssets.js", "src/js/event-userchest.js"], { base: "./" })
    .pipe(replace({
      "http://localhost:8080/chest": "https://test.ehanlin.com.tw/chest",
      "http://localhost:9090/currencyBank": "https://test.ehanlin.com.tw/currencyBank"
    }))
    .pipe(gulp.dest(''))
}

function replaceToProduction() {
  gulp.src(["src/js/event-totalAssets.js"], { base: "./" })
    .pipe(replace("https://test.ehanlin.com.tw", 'http://localhost:9090'))
    .pipe(gulp.dest(''))
}

function minifyImage(sourceImage) {
  console.log("=======> minifyImage <=======");
  return function () {
    return gulp
      .src(sourceImage, basePath)
      .pipe(imagemin({ use: [pngquant()] }))
      .pipe(gulp.dest(dist));
  };
}

function minifyCSS(sourceCss) {
  console.log("=======> minifyCSS <=======");
  return function () {
    return gulp
      .src(sourceCss, basePath)
      .pipe(cleanCSS({ keepBreaks: true }))
      .pipe(gulp.dest(dist));
  };
}

function minifyJS(sourceJS) {
  console.log("=======> minifyJS <=======");
  return function () {
    return gulp
      .src(sourceJS, basePath)
      .pipe(
        uglify({ mangle: false }).on("error", function (error) {
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
    return util.logStream(
      babelJS(["src/js/*.js"])
    );
  }).then(function () {
    return util.logStream(minifyJS("babel-temp/js/**/*.js"));
  }).then(function () {
    return util.logPromise(clean("babel-temp"));
  });

  return deferred.promise;
}

gulp.task("lib", libTask("src/lib"));
gulp.task("build", ["style", "lib"]);
gulp.task("minifyCSS", minifyCSS("src/css/**/*.css"));
gulp.task("minifyImage", minifyImage("src/img/**/*.png"));
gulp.task("minifyJS", minifyJS("src/js/**/*.js"));
gulp.task("replaceToDev", replaceToDev);
gulp.task("replaceToTest", replaceToTest);

gulp.task("package", function () {
  var deferred = Q.defer();
  Q.fcall(function () {
    return util.logPromise(clean(dist));
  }).then(function () {
    return Q.all([
      util.logStream(libTask("dist/lib")),
      util.logStream(copyStaticTask("dist")),
      //util.logStream(styleTask("dist/css"))
    ]);
  }).then(function() {
    return Q.all([
      util.logStream(minifyImage("src/img/**/*.png")),
      util.logStream(minifyCSS("src/css/**/*.css")),
      util.logStream(minifyJS("src/js/*.js"))
    ]);
  });

  return deferred.promise;
});
