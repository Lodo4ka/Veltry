var gulp = require('gulp');
var scss = require('gulp-sass');
var pug = require('gulp-pug');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var bs = require('browser-sync').create();
// var concat = require('gulp-concat');

gulp.task('pug', function() {
    return gulp.src('src/pug/index.pug')
        .pipe(plumber({
            errorHandler: notify.onError(function(err) {
                return {
                    title: "Markup",
                    message: err.message
                };
            })
        }))
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest('dist'))
})

gulp.task('styles', function() {
    return gulp.src('src/scss/style.scss')
        .pipe(plumber({
            errorHandler: notify.onError(function(err) {
                return {
                    title: 'HTML',
                    message: err.message
                };
            })
        }))
        .pipe(scss({ output: 'expanded' }))
        // .pipe(concat('./src/scss/libs/font-awesome.css'))
        .pipe(gulp.dest('dist'))
})

// gulp.task('copy:html', function(){
//   return gulp.src('src/index.html')
//     .pipe(gulp.dest('dist'))
// })

gulp.task('copy:img', function() {
    return gulp.src('src/img/**/*.{png,jpg,jpeg,gif,svg}')
        .pipe(gulp.dest('dist/img'))
})

gulp.task('copy:fonts', function() {
    return gulp.src('src/fonts/*')
        .pipe(gulp.dest('dist/fonts'))
})

gulp.task('watch', function() {
    gulp.watch('src/scss/**/*.scss', gulp.series('styles'))
    gulp.watch('src/pug/*.pug', gulp.series('pug'))
    gulp.watch('src/img/*', gulp.series('copy:img'))
    gulp.watch(['src/scss/**/*.scss', 'src/pug/index.pug', 'src/img/**/*.{png,jpg,jpeg,gif,svg}']).on('change', bs.reload)
})

gulp.task('bs', function() {
    bs.init({
        server: {
            baseDir: "./dist"
        }
    });
});

gulp.task('default', gulp.parallel(
    gulp.series('styles', 'pug', 'copy:img', 'copy:fonts', 'watch'),
    'bs'
))