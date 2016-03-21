var gulp = require('gulp');

// files & directories
var clean = require('gulp-clean');
var concat = require('gulp-concat');

// HTML
var htmlbuild = require('gulp-htmlbuild');

// CSS
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var cssbeautify = require('gulp-cssbeautify');
var csso = require('gulp-csso');

// JavaScript
var uglify = require('gulp-uglify');

// Tasks
gulp.task('less', function() {
	gulp.src('./src/styles/*.less')
		.pipe(less())
		.pipe(cssbeautify({indent: '\	'}))
		.pipe(autoprefixer({
			browsers: ['> 1%'],
			cascade: true
		}))
		.pipe(gulp.dest('./src/styles/compiled/'));
});

gulp.task('watch', function() {
	gulp.watch('./src/styles/*.less', ['less']);
});

// clean tasks
gulp.task('clean', function() {
	gulp.src('./public/', {read: false})
		.pipe(clean());
});

// build tasks
gulp.task('build:html', function() {
	gulp.src('./src/index.html')
		.pipe(htmlbuild({
			js: htmlbuild.preprocess.js(function(block) {
				block.write('js/app.min.js');
				block.end();
			}),
			css: htmlbuild.preprocess.css(function(block) {
				block.write('css/style.min.css');
				block.end();
			})
		}))
		.pipe(gulp.dest('./public/'));
});

gulp.task('build:css', function() {
	gulp.src('./src/styles/compiled/*css')
		.pipe(concat('style.min.css'))
		.pipe(csso())
		.pipe(gulp.dest('./public/css/'));
});

gulp.task('build:js', function() {
	gulp.src('./src/scripts/*.js')
		.pipe(concat('app.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./public/js/'));
});

gulp.task('build:img', function() {
	gulp.src('./src/images/**')
		.pipe(gulp.dest('./public/images/'));
});

gulp.task('build', ['build:html', 'build:css', 'build:js', 'build:img']);

// images
gulp.task('img:transport', function() {
	gulp.src('_origin/img/compil/*')
		.pipe(gulp.dest('./src/images/'));
});

// validate
// gulp-htmlhint, gulp-csslint, gulp-jshint