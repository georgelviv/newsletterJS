var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var addsrc = require('gulp-add-src');
var concatCss = require('gulp-concat-css');
var livereload = require('gulp-livereload');

var config = require('../configuration.json');
var srcFiles = config.frontDir + '/sass/basic.scss';

var additionCSS = config.frontDir + '/css/font-awesome.css';

module.exports = cssTask;
module.exports.srcFiles = config.frontDir + '/sass/**/*.scss';

function cssTask() {
	return gulp.src(srcFiles)
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(addsrc(additionCSS)) 
		.pipe(concatCss('style.css'))
		.pipe(minifyCss())
		.pipe(gulp.dest(config.buildDir))
		.pipe(livereload());
}