var gulp = require('gulp'),
    jade = require('gulp-jade'),
    stylus = require('gulp-stylus'),
    livereload = require('gulp-livereload'),
    myth = require('gulp-myth'),
    csso = require('gulp-csso'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    connect = require('connect'),
    addsrc = require('gulp-add-src'),
    coffee = require('gulp-coffee');


gulp.task('stylus', function() {
    gulp.src('./assets/stylus/screen.styl')
        .pipe(stylus({
            use: ['nib']
        }))
    .on('error', console.log)
    .pipe(myth())
    .pipe(gulp.dest('./public/css/'))
});


gulp.task('jade', function() {
    gulp.src(['./assets/template/*.jade', '!./assets/template/_*.jade'])
        .pipe(jade({
            pretty: true
        }))
        .on('error', console.log)
    .pipe(gulp.dest('./public/'))
});


gulp.task('js', function() {
    gulp.src(['./assets/coffee/**/*.coffee', '!./assets/coffee/vendor/**/*.coffee'])
        .pipe(coffee()).on('error', console.log)
        .pipe(addsrc(['./assets/js/**/*.js', '!./assets/coffee/vendor/**/*.js']))
        .pipe(concat('index.js'))
        .pipe(gulp.dest('./public/js'))
});


gulp.task('build', function() {
    gulp.src('./assets/stylus/screen.styl')
        .pipe(stylus({
            use: ['nib']
        }))
    .pipe(myth())
    .pipe(csso())
    .pipe(gulp.dest('./build/css/'))

    // jade
    gulp.src(['./assets/template/*.jade', '!./assets/template/_*.jade'])
        .pipe(jade())
        .pipe(gulp.dest('./build/'))

    // js
    gulp.src(['./assets/coffee/**/*.coffee', '!./assets/coffee/vendor/**/*.coffee'])
        .pipe(coffee()).on('error', console.log)
        .pipe(addsrc(['./assets/js/**/*.js', '!./assets/coffee/vendor/**/*.js']))
        .pipe(concat('index.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'));

    // image
    gulp.src('./assets/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/img'))

});


gulp.task('images', function() {
    gulp.src('./assets/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/img'))

});
