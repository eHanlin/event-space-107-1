const gulp = require('gulp')
const templateUtil = require('gulp-template-util')
const replace = require('gulp-replace')
const rename = require('gulp-rename')
const babel = require('gulp-babel')
const imageMin = require('gulp-imagemin')
const pngquant = require('imagemin-pngquant')
const cache = require('gulp-cache')
const cleanCSS = require('gulp-clean-css')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify-es').default
const del = require('del')
const Q = require('q')

const basePath = {
  base: 'src'
}
const dist = 'dist'

function copyStaticTask(destination) {
  console.log('=======> copyStaticTask <=======')
  return function () {
    return gulp
      .src(['src/**/*.html', 'src/img/**/*', 'src/css/package/*.css', 'src/lib/**/*', 'src/js/**/*.js', 'src/js/package/*.js'],
        { base: 'src' }
      )
      .pipe(gulp.dest(destination))
  }
}

function clean(source) {
  console.log(`=======> clean ${source} <=======`)

  return function () {
    return del([source])
  }
}

function devToBuildEnv() {
  return gulp
    .src(['src/js/*.js'], {
      base: './'
    })
    .pipe(
      replace(/[^\w](http:\/\/localhost:8080)\/([\w-/]+)"/g, function (match, p1, p2) {
        let buildEnv = `"/${p2}"`
        console.log(`chest domain => ${match} to ${buildEnv}`)
        return buildEnv
      })
    )
    .pipe(
      replace(/[^\w](http:\/\/localhost:9090)\/([\w-/]+)\?userSpecific=([\w])+"/g, function (match, p1, p2) {
        let buildEnv = `"/${p2}"`
        console.log(`currencyBank domain => ${match} to ${buildEnv}`)
        return buildEnv
      })
    )
    .pipe(gulp.dest(''))
}

function buildEnvToDev() {
  return gulp
    .src(['src/js/*.js'], {
      base: './'
    })
    .pipe(
      replace(/[^\w]\/(chest)\/([\w-/]+)"/g, function (match, p1, p2) {
        let dev = `"http://localhost:8080/${p1}/${p2}"`
        console.log(`chest domain => ${match} to ${dev}`)
        return dev
      })
    )
    .pipe(
      replace(/[^\w]\/(currencyBank)\/([\w-/]+)"/g, function (match, p1, p2) {
        let dev = `"http://localhost:9090/${p1}/${p2}?userSpecific=${gulp.env.user}"`
        console.log(`currencyBank domain => ${match} to ${dev}`)
        return dev
      })
    )
    .pipe(gulp.dest(''))
}

function buildEnvToDevModule() {
  return gulp.src(['src/js/module/*.js', 'src/js/main.js'], {
    base: './'
  })
    .pipe(
      replace(/[`]\/(chest)\/([\w-/${}]+)`/g, function (match, p1, p2) {
        let dev = `\`http://localhost:8080/${p1}/${p2}\``
        console.log(`chest domain => ${match} to ${dev}`)
        return dev
      })
    )
    .pipe(
      replace(/[`]\/(currencyBank)\/([\w-/${}]+)`/g, function (match, p1, p2) {
        let dev = `\`http://localhost:9090/${p1}/${p2}?userSpecific=${gulp.env.user}\``
        console.log(`currencyBank domain => ${match} to ${dev}`)
        return dev
      })
    )
    .pipe(gulp.dest(''))
}

function minifyImage(sourceImage) {
  console.log('=======> minifyImage <=======')
  return function () {
    return gulp
      .src(sourceImage, basePath)
      .pipe(cache(imageMin({
        use: [pngquant({ speed: 7 })]
      })))
      .pipe(gulp.dest(dist))
  }
}

function minifyJs(sourceJS) {
  console.log('=======> minifyJS <=======')
  return function () {
    return gulp.src(sourceJS, { base: 'babel-temp' })
      .pipe(
        uglify({
          mangle: false
        }).on('error', function (error) {
          console.log(error)
        })
      )
      .pipe(gulp.dest(dist))
  }
}

function babelJS(sourceJS) {
  return function () {
    return gulp.src(sourceJS, basePath)
      .pipe(babel())
      .pipe(gulp.dest('babel-temp'))
  }
}

function buildJS() {
  console.log('=======> buildJS <=======')
  let deferred = Q.defer()

  Q.fcall(function () {
    return templateUtil.logStream(babelJS(['src/js/*.js']))
  }).then(function () {
    return templateUtil.logStream(minifyJs('babel-temp/js/**/*.js'))
  }).then(function () {
    return templateUtil.logPromise(clean('babel-temp'))
  })

  return deferred.promise
}

function concatCss() {
  return function () {
    return gulp.src('src/css/*.css', basePath)
      .pipe(concat('ehanlin-space-all.css'))
      .pipe(cleanCSS())
      .pipe(rename(function (path) {
        path.basename += '.min'
      }))
      .pipe(gulp.dest('src/css'))
      .pipe(gulp.dest('dist/css'))
  }
}

gulp.task('concatCss', function () {
  var deferred = Q.defer()
  Q.fcall(function () {
    return templateUtil.logPromise(clean('src/css/ehanlin-space-all.min.css'))
  }).then(function () {
    return templateUtil.logStream(concatCss())
  })

  return deferred.promise
})
gulp.task('minifyImage', minifyImage('src/img/**/*.png'))
gulp.task('minifyJs', minifyJs('src/js/**/*.js'))
gulp.task('buildEnvToDev', buildEnvToDev)
gulp.task('module', buildEnvToDevModule)
gulp.task('devToBuildEnv', devToBuildEnv)
gulp.task('package', function () {
  var deferred = Q.defer()
  Q.fcall(function () {
    return templateUtil.logPromise(clean(dist))
  }).then(function () {
    return templateUtil.logStream(devToBuildEnv)
  }).then(function () {
    return templateUtil.logStream(copyStaticTask('dist'))
  }).then(function () {
    return Q.all([
      templateUtil.logStream(minifyImage('src/img/**/*.png')),
      templateUtil.logStream(concatCss()),
      templateUtil.logStream(buildJS)
    ])
  })

  return deferred.promise
})
