//initialize all of our variables
var autoPrefixBrowserList = ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'];

//load all of our dependencies
//add more here if you want to include more libraries
gulp          = require('gulp');
gutil         = require('gulp-util');
concat        = require('gulp-concat');
uglify        = require('gulp-uglify');
compass       = require('gulp-compass');
imagemin      = require('gulp-imagemin');
del           = require('del');
autoprefixer  = require('gulp-autoprefixer');
cache         = require('gulp-cached');
svgstore      = require('gulp-svgstore');
svgmin        = require('gulp-svgmin');
path          = require('path');


gulp.task('clean', function() {
  del('assets');
});

gulp.task('fonts', function() {
  gulp.src(['src/fonts/*'])
  .pipe(gulp.dest('assets/fonts/'));
});

gulp.task('images', function(tmp) {
  gulp.src(['src/img/*'])
    .pipe(cache('imaging'))
    .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })
    .pipe(gulp.dest('assets/img/')));
});

gulp.task('scripts', function() {
  return gulp.src(['src/js/src/jquery.js', 'src/js/src/**/*.js'])
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
    gulp.src('src/svg/*.svg')
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
        .pipe(svgstore())
        .pipe(gulp.dest('assets/svg'));
});

gulp.task('watch', function() {
    gulp.watch('src/img/**', ['images']);
    gulp.watch('src/js/**', ['scripts']);
    gulp.watch('src/sass/**', ['styles']);
    gulp.watch('src/svg/**', ['svgstore']);
});

gulp.task('build', ['fonts', 'images', 'scripts', 'styles', 'svgstore']);

gulp.task('default', ['build', 'watch']);
