test:
	open tests/test.html
	open tests/test2.html

minify:
	uglifyjs -o backbone.localStorage-min.js backbone.localStorage.js
