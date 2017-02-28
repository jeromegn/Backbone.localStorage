const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/driver.js',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      },
      {
        test: /\.test\.js$/,
        loader: 'babel-loader',
        options: {
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
      'backbone.localStorage': path.resolve('src/driver.js')
    }
  },

  plugins: [
    new HtmlWebpackPlugin({ title: 'Tree-shaking' })
  ]
};
