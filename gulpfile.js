const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
const browserSync = require ('browser-sync');

gulp.task('sass', () => {
    return gulp.src('dev/scss/**/*.scss')
                .pipe(sass({
                    outputStyle: 'compressed'
                }).on('error', sass.logError))
                .pipe(gulp.dest('dist/css/'))
                .pipe(browserSync.stream())
})
gulp.task('pug', () => {
    return gulp.src('dev/**/*.pug')
                .pipe(pug({
                    pretty: true
                }))
                .pipe(gulp.dest('dist/'))
})

gulp.task('default', () => {
    gulp.watch('dev/**/*.pug', gulp.series('pug'))
    gulp.watch('dev/scss/**/*.scss', gulp.series('sass'))
    gulp.watch('dist/**/*.html').on('change', browserSync.reload)
    browserSync.init({
        server:{
            baseDir: './dist'
        }
    })
})