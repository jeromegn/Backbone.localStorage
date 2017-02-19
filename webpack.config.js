'use strict';

const path = require('path');


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
    filename: 'backbone.localstorage.js',
    path: path.resolve('build'),
    library: 'backbone.localstorage',
    libraryTarget: 'commonjs2'
  }
};
