gulp = require 'gulp'
ejs = require 'gulp-ejs'
connect = require 'gulp-connect'
almond = require 'almond'
coffee = require 'gulp-coffee'
jade = require 'gulp-jade'
uglify = require 'gulp-uglify'
clean = require 'gulp-clean'
rjs = require 'gulp-requirejs'
stylus = require 'gulp-stylus'
server = require 'gulp-express'
concat = require 'gulp-concat'
imagemin = require 'gulp-imagemin'

gulp.task 'connect', ->
  connect.server
    port: 1337
    livereload: on
    root: './public'

gulp.task 'build', ['coffee'], ->
	rjs
		baseUrl: 'js'
		name: '..node_modules/almond/almond'
		include: ['main']
		out: 'all.js'
		wrap:on
	.pipe do uglify
	.pipe gulp.dest 'public/js'
	.pipe do connect.reload

gulp.src 'js/', read: no
	.pipe do clean

gulp.task 'coffee', ->
  gulp.src 'coffee/**/*.coffee'
    .pipe do coffee
    .pipe gulp.dest 'js'

gulp.task 'ejs', ->
  gulp.src 'ejs/*.ejs'
    .pipe do ejs
    .pipe gulp.dest 'public'
    .pipe do connect.reload

gulp.task 'stylus', ->
  gulp.src 'stylus/*.styl'
    .pipe stylus set: ['compress']
    .pipe gulp.dest 'public/css'
    .pipe do connect.reload

gulp.task 'watch', ->
  gulp.watch 'ejs/*.ejs', ['ejs']
  gulp.watch 'stylus/*.styl', ['stylus']
  gulp.watch 'coffee/*.coffee', ['build']

gulp.task 'default', ['ejs', 'stylus', 'build', 'connect', 'watch']