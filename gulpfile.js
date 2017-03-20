// Gulp configurations to reload browser when files change
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const browserify = require('gulp-browserify');
const rename = require('gulp-rename');

gulp.task('browserSync', function() {
    browserSync.init({
       server: {
            baseDir: "./",
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

gulp.task('default', ['browserSync'], function() {
    gulp.watch('public/css/*.css', browserSync.reload);
    gulp.watch('public/js/*.js', browserSync.reload);
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('src/*.js', browserSync.reload);
    gulp.watch('jasmine/spec/allBooks/*.json', browserSync.reload);
});