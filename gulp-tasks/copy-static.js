var gulp = require('gulp');
var config = require('../configuration.json');

module.exports = copyStatic;

function copyStatic() {
	return gulp.src(config.frontDir + '/' + config.startPoint)
		.pipe(gulp.dest(config.buildDir));
}