'use strict';
const path = require('path');
const webpack = require('webpack');

module.exports = {
  cache: true,
  debug: true,
  entry: {
    app: __dirname + '/src/app.js'
  },
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].min.js'//TODO: rename game.min.js
  },
  watch: true,
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        loader: 'babel',
        exclude: [
          /node_modules/
        ],
        test: /\.js$/,
        query: {
          presets: ['es2015']
        }
      }
    ],
    resolve: {
      extensions: [
        '',
        '.js',
        '.json'
      ]
    }
  }
};