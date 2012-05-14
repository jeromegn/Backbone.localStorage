test:
	open tests/test.html
	open tests/test2.html

minified:
	uglifyjs -o backbone.localStorage-min.js backbone.localStorage.js
