'use strict';

const path = require('path');
const _ = require('underscore');


const isProd = _.reduce(process.argv, function(memo, arg) {
  return memo || arg === '--production' || arg === '-p';
}, false);

console.log(isProd);

module.exports = {
  entry: {
    app: ['./src/driver.js']
  },
  externals: {
    backbone: true,
    underscore: true,
    'window-or-global': true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  output: {
    filename: `backbone.local${isProd ? '.min' : ''}.js`,
    path: path.resolve('build'),
    library: 'backbone.local',
    libraryTarget: 'commonjs2'
  }
};
