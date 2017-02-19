const path = require('path');

module.exports = {
  entry: './src/driver.js',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.test\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  output: {
    path: path.resolve('test'),
    filename: 'test.out.js'
  },

  resolve: {
    alias: {
      'backbone.localstorage': path.resolve('build/backbone.localstorage.js')
    }
  }
};
