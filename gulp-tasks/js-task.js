var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var livereload = require('gulp-livereload');

var config = require('../configuration.json');
var srcFiles = [config.frontDir + '/js/utility.js', config.frontDir + '/js/router.js', config.frontDir + '/js/app.js'];
var resultFile = 'script.js';

module.exports = jsTask;
module.exports.srcFiles = srcFiles;

function jsTask() {
	return gulp.src(srcFiles)
		.pipe(jshint({lookup: false}))
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(concat(resultFile))
		.pipe(uglify())
		.on('error', function (err) {
			console.log('Error in uglify');
		})
		.pipe(gulp.dest(config.buildDir))
		.pipe(livereload());
}