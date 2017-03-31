// Gulp configuration to reload browser when files change
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const browserify = require('gulp-browserify');
const rename = require('gulp-rename');

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'src',
      index: 'index.html',
      port: 3000
    }
  });
});

gulp.task('scripts', () => {
  gulp.src('jasmine/spec/invertedIndex-spec.js')
    .pipe(browserify())
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('jasmine/testfiles'));
});

gulp.task('default', ['browserSync'], () => {
  gulp.watch('src/public/css/*.css', browserSync.reload);
  gulp.watch('src/public/js/*.js', browserSync.reload);
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/*.js', browserSync.reload);
  gulp.watch('jasmine/spec/allBooks/*.json', browserSync.reload);
  gulp.watch('jasmine/spec/*.js', browserSync.reload);
});
