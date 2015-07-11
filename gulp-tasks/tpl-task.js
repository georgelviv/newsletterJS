var through = require('through2');
var File = require('vinyl');
var gutil = require('gulp-util');
var path = require('path');
var PluginError = gutil.PluginError;
var gulp = require('gulp');
var livereload = require('gulp-livereload');

var config = require('../configuration.json');
var srcFiles = [config.frontDir + '/tpl/**/*.tpl'];
var resultFile = 'tpl.js';

module.exports = tplTask;
module.exports.srcFiles = srcFiles;

function tplTask() {
	return gulp.src(srcFiles)
		.pipe(htmlToObj(resultFile))
		.pipe(gulp.dest(config.frontDir + '/js'))
		.pipe(livereload());
}

function htmlToObj (pathFile) {
	if (!pathFile) {
		throw new PluginError('htmlToObj', 'Missing pathFile option for htmlToObj');
	}

	var tplObj = {};
	var resultFile;

	return through.obj(function(file, enc, cb) {

		if (!resultFile) {
			resultFile = new File({
				base: path.dirname(pathFile),
				path: pathFile,
			});
		}

		var tplContent = file._contents.toString();
		var tplName = file.history[0].split('\\');
		tplName = tplName[tplName.length - 1];

		tplObj[tplName] =  tplContent;

		cb();
	}, function(cb) {
		var templatesProvider = '(function () {window.$_$ = window.$_$ || {};window.$_$.TemplatesProvider = TemplatesProvider;';
		templatesProvider += 'function TemplatesProvider() { var templatesObj =' + JSON.stringify(tplObj) + ';';
		templatesProvider += 'this.getTemplate = getTemplate; function getTemplate (template) { ';
		templatesProvider += ' return templatesObj[template]; }}})("4343434");';
		resultFile.contents = new Buffer(templatesProvider);
		this.push(resultFile);
		cb();
	});
}
