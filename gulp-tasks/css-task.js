var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var concatCss = require('gulp-concat-css');
var livereload = require('gulp-livereload');

var config = require('../configuration.json');
var srcFiles = config.frontDir + '/sass/basic.scss';

module.exports = cssTask;
module.exports.srcFiles = srcFiles;

function cssTask() {
	return gulp.src(srcFiles)
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(concatCss('style.css'))
		.pipe(minifyCss())
		.pipe(gulp.dest(config.buildDir))
		.pipe(livereload());
}