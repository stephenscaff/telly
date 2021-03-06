/**
 * Gulp File for Static projects using HBS partials.
 */
const gulp            = require('gulp'),
      autoprefixer    = require('gulp-autoprefixer'),
      babelify        = require('babelify'),
      browserify      = require('browserify'),
      buffer          = require('vinyl-buffer'),
      del             = require('del'),
      handlebars      = require('gulp-compile-handlebars'),
      newer           = require('gulp-newer'),
      rename          = require('gulp-rename'),
      sass            = require('gulp-sass'),
      source          = require('vinyl-source-stream'),
      terser          = require('gulp-terser'),
      gls             = require('gulp-live-server'),
      open             = require('open');

// Server Port
const PORT = 8000;

// Error handler
function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

// Cleanup
function clean() {
  return del(["dist/"]);
}

// CSS
function buildCSS() {
  return gulp.src('src/assets/scss/*.scss')
  .pipe(sass({
    outputStyle: 'compressed',
    imagePath: 'assets/images/',
    precision: 3,
    errLogToConsole: true,
    autoprefixer: {add: true},
  }))
  .on('error', handleError)
  .pipe(autoprefixer())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('dist/assets/css/'))
}

// Build JS
// uses browserify for js modules and babel for transpiling
function buildJS() {
  const bundler = browserify('src/assets/js/app.js').transform(
    'babelify',
    { presets: ['@babel/preset-env'],
      plugins: ["@babel/transform-runtime"]
    }
  )
  return bundler.bundle()
  .on('error', handleError)
  .pipe(source('app.js'))
  .pipe(buffer())
  .pipe(terser({
    mangle: false,
    compress: true,
  }))
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('dist/assets/js/'));
}

// Images
function buildImages() {
  return gulp.src('src/assets/images/**/*', { allowEmpty: true })
    .pipe(newer('dist/assets/images/'))
    .pipe(gulp.dest('dist/assets/images/'))
}


// Templates
// HBS Partials
function buildViews() {
  return gulp.src('src/views/pages/*.hbs')
    .pipe(handlebars({}, {
      ignorePartials: true,
      batch: ['src/views/components']
    }))
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(gulp.dest('dist/'));
}


// Data
function buildData() {
  return gulp.src('src/assets/data/**/*', { allowEmpty: true })
    .pipe(newer('dist/assets/data/'))
    .pipe(gulp.dest('dist/assets/data/'))
}

// Serve (simple express server)
function serve() {
  var server = gls.static('dist/', PORT);
  //server.start();
  var promise = server.start();
  //optionally handle the server process exiting
  promise.then(function(result) {
    console.log('server started')
    openBrowser()
  });
}

/**
 * Open Browser
 * @requires open
 */
function openBrowser() {
  var url = `http://localhost:${PORT}`;
  var chrome = ('google chrome' || 'google-chrome' || 'chrome');

  open(url);
}


// Watcheraq
function watch() {
  gulp.watch('src/assets/scss/**/*', buildCSS)
  gulp.watch('src/assets/js/**/*', buildJS)
  gulp.watch('src/assets/data/**/*', buildData)
  gulp.watch('src/assets/images/**/*', buildImages)
  gulp.watch('src/views/**/*', buildViews)
  gulp.watch('src/**/*.html', serve, (file) => {
    server.notify.apply(server, [file]);
  });
}



// Build
var build = gulp.parallel(
  buildCSS,
  buildJS,
  buildImages,
  buildViews,
  buildData,
  serve,
  watch
);

gulp.task(build);
gulp.task('default', build);
