test:
	mocha-phantomjs spec/runner.html

minify:
	uglifyjs -o backbone.localStorage-min.js backbone.localStorage.js
