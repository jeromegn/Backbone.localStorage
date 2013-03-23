test: test-globals-amd test-commonjs

test-globals-amd:
	mocha-phantomjs ./spec/runner.html

test-commonjs: link ./spec/localStorage_commonjs_spec.bundled.js
	mocha-phantomjs ./spec/runner_commonjs.html

link install:
	npm $@

clean:
	rm -rf node_modules ./spec/localStorage_commonjs_spec.bundled.js

./spec/localStorage_commonjs_spec.bundled.js: ./spec/localStorage_commonjs_spec.js
	./node_modules/browserify/bin/cmd.js -e $< -o $@

minify:
	uglifyjs -o backbone.localStorage-min.js backbone.localStorage.js
