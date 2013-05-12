bin = ./node_modules/.bin

test: test-globals-amd test-commonjs

test-globals-amd:
	$(bin)/mocha-phantomjs ./spec/runner.html

test-commonjs: install ./spec/localStorage_commonjs_spec.bundled.js
	$(bin)/mocha-phantomjs ./spec/runner_commonjs.html

link install:
	@npm $@

clean:
	rm -rf node_modules ./spec/localStorage_commonjs_spec.bundled.js

./spec/localStorage_commonjs_spec.bundled.js: ./spec/localStorage_commonjs_spec.js
	$(bin)/browserify -e $< -o $@

minify:
	$(bin)/uglifyjs -o backbone.localStorage-min.js backbone.localStorage.js
