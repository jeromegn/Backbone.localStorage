'use strict';

const path = require('path');
const _ = require('underscore');


const isProd = _.reduce(process.argv, function(memo, arg) {
  return memo || arg === '--production' || arg === '-p';
}, false);

module.exports = {
  entry: {
    app: ['./src/driver.js']
  },
  externals: {
    backbone: {
      commonjs: 'backbone',
      commonjs2: 'backbone',
      root: 'Backbone'
    },
    underscore: {
      commonjs: 'underscore',
      commonjs2: 'underscore',
      root: '_'
    }
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
    filename: `backbone.localStorage${isProd ? '.min' : ''}.js`,
    path: path.resolve('build'),
    library: 'Backbone.LocalStorage',
    libraryTarget: 'umd'
  }
};
