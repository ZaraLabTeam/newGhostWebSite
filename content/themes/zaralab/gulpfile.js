'use strict';

//initialize all of our variables
var autoPrefixBrowserList = ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'];

//load all of our dependencies
//add more here if you want to include more libraries
var gulp          = require('gulp');
var gutil         = require('gulp-util');
var concat        = require('gulp-concat');
var uglify        = require('gulp-uglify');
var compass       = require('gulp-compass');
var imagemin      = require('gulp-imagemin');
var clean         = require('gulp-clean');
var autoprefixer  = require('gulp-autoprefixer');
var cache         = require('gulp-cached');
var svgstore      = require('gulp-svgstore');
var svgmin        = require('gulp-svgmin');
var path          = require('path');


gulp.task('clean', function() {
    return gulp.src('assets', {read: false})
        .pipe(clean());
});

gulp.task('fonts', function() {
    return gulp.src(['src/fonts/*'])
        .pipe(gulp.dest('assets/fonts/'));
});

gulp.task('images', function(tmp) {
    return gulp.src(['src/img/*'])
        .pipe(cache('imaging'))
        .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })
        .pipe(gulp.dest('assets/img/')));
});

gulp.task('scripts', function() {
    return gulp.src(['src/js/jquery.js', 'src/js/**/*.js'])
        .pipe(concat('app.js'))
        .on('error', gutil.log)
        .pipe(uglify())
        .pipe(gulp.dest('assets/js'));
});

gulp.task('styles', function() {
    return gulp.src('src/sass/**')
        // .pipe(cache('sassing'))
        .pipe(compass({
          css: 'src/css',
          sass: 'src/sass',
          image: 'src/img',
          font: 'src/fonts'
        }))
        .pipe(autoprefixer({
         browsers: autoPrefixBrowserList,
         cascade:  true
        }))
        .on('error', gutil.log)
        .pipe(concat('style.css'))
        .pipe(gulp.dest('assets/css'));
});

gulp.task('svgstore', function () {
    return gulp.src('src/svg/*.svg')
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            };
        }))
        .on('error', gutil.log)
        .pipe(svgstore())
        .pipe(gulp.dest('assets/svg'));
});

gulp.task('watch', function() {
    gulp.watch('src/img/**', ['images']);
    gulp.watch('src/js/**', ['scripts']);
    gulp.watch('src/sass/**', ['styles']);
    gulp.watch('src/svg/**', ['svgstore']);
});

gulp.task('assets', ['fonts', 'images', 'scripts', 'styles', 'svgstore']);

gulp.task('build', ['clean'], function() {
    return gulp.start('assets');
});

gulp.task('default', ['build', 'watch']);
