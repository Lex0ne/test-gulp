var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    livereload = require('gulp-livereload'),
    myth = require('gulp-myth'),
    csso = require('gulp-csso'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    connect = require('connect'),
    addsrc = require('gulp-add-src'),
    server = require('gulp-express'),
    coffee = require('gulp-coffee');


gulp.task('build', function() {
    gulp.src('./assets/stylus/*.styl')
        .pipe(stylus())
        .pipe(myth())
        .pipe(csso())
        .pipe(gulp.dest('./public/stylesheets/'))

    // js
    gulp.src(['./assets/coffee/**/*.coffee', '!./assets/coffee/vendor/**/*.coffee'])
        .pipe(coffee()).on('error', console.log)
        .pipe(addsrc(['./assets/js/**/*.js', '!./assets/coffee/vendor/**/*.js']))
        .pipe(concat('index.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/javascripts'));

    // image
    gulp.src('./assets/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/images'))

});


gulp.task('server', function () {
    // Start the server at the beginning of the task
    server.run(['./bin/www']);

    // Restart the server when file changes
    gulp.watch(['./views/**/*.ejs'], server.notify);
    gulp.watch(['./public/stylesheets/**/*.css'], ['styles:css']);
    gulp.watch(['{.tmp,./public}/stylesheets/**/*.css'], function(event){
        gulp.run('styles:css');
        server.notify(event);
    });

    gulp.watch(['./public/javascripts/**/*.js'], ['jshint']);
    gulp.watch(['./public/images/**/*'], server.notify);
    gulp.watch(['app.js', 'routes/**/*.js'], [server.run]);
});

gulp.task('stop', function () {
    // Start the server at the beginning of the task
    server.stop();
});
