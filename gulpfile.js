var gulp = require('gulp');

// Files & Directories
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

// Validators
var htmlhint = require("gulp-htmlhint");
var csslint = require('gulp-csslint');
var jshint = require('gulp-jshint');

// Tasks
gulp.task('less', function() {
	gulp.src('./src/styles/*.less')
		.pipe(less())
		.pipe(cssbeautify({indent: '\	'}))
		.pipe(autoprefixer({
			browsers: ['> 1%'],
			cascade: true
		}))
		.pipe(gulp.dest('./src/css_compiled/'));
});

gulp.task('watch', function() {
	gulp.watch('./src/styles/*.less', ['less']);
});

// clean tasks
gulp.task('clean', function() {
	gulp.src(['./public/', './src/css_compiled/'], {read: false})
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
	gulp.src('./src/css_compiled/*.css')
		.pipe(concat('style.min.css'))
		.pipe(csso())
		.pipe(gulp.dest('./public/css/'));
});

gulp.task('build:js', function() {
	gulp.src([
		'./src/scripts/jQuery_script.js',
		'./src/scripts/bb_models.js',
		'./src/scripts/bb_collections.js',
		'./src/scripts/*.js'
		])
		.pipe(concat('app.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./public/js/'));
});

gulp.task('build:other', function() {
	gulp.src('./src/images/**')
		.pipe(gulp.dest('./public/images/'));
	gulp.src('./src/fonts/**')
		.pipe(gulp.dest('./public/fonts/'));
});

gulp.task('build', ['build:html', 'build:css', 'build:js', 'build:other']);

// transport images
gulp.task('img:tr', function() {
	gulp.src('_origin/img/compil/*')
		.pipe(gulp.dest('./src/images/'));
});

// validate tasks (default settings)
gulp.task('validate:html', function() {
	gulp.src('./src/*.html')
		.pipe(htmlhint())
		.pipe(htmlhint.reporter());
});

gulp.task('validate:css', function() {
	gulp.src('./src/css_compiled/*.css')
		.pipe(csslint())
		.pipe(csslint.reporter());
});

gulp.task('validate:js', function() {
	gulp.src('./src/scripts/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter());
});

gulp.task('validate', ['validate:html', 'validate:css', 'validate:js']);