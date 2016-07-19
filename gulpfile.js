'use strict';
const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const runSequence = require('run-sequence');
const shell = require('gulp-shell');
const eslint = require('gulp-eslint');
const del = require('del');
const browserSync = require('browser-sync');
const uglify = require('gulp-uglify');
const webpackConfig = require("./client/webpack.config.js");
//const nodemon = require('nodemon');

/**
 * lint JavaScript
 */
gulp.task('lint', () => {

  return gulp
    .src([
      'client/src/**',
      '!bower_components/',
      '!node_modules/',
      '!client/vendor/**'
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());

});

/**
 * Webpack
 */
gulp.task('webpack', () => {

  return gulp
    .src('./client/src/app.js')
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest('./client/dist/'));

});

/**
 * Build
 */
gulp.task('webpack-build', (cb) => {

  const config = Object.create(webpackConfig);
  config.devtool = null;
  config.debug = false;
  config.watch = false;

  config.plugins = config.plugins.concat(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  );

  webpack(config, function (err) {
    if (err) {
      throw err;
    }

    cb();
  });

});

/**
 * Server nodemon
 */
gulp.task('nodemon', () => {

  return nodemon({
    script: `./server/web_server.js`,
    ignore: [
      'node_modules/'
    ],
    env: {
      HOST: 'localhost',
      PORT: 4000,
      HTTP_TIMEOUT: 1000
    }
  })
    .on('restart', () => {
      console.log('server restarted!');

      browserSync.reload({stream: true});
    });

});

/**
 * Dist WWW
 */
gulp.task('www', ['clean'], () => {
  const folder = './client';
  const destFolder = './www/';

  return gulp
    .src([
      `${folder}/*`,
      `${folder}/dist/**/*`,
      `${folder}/Fonts/*`,
      `${folder}/res/**`,
      `${folder}/vendors/**`,
      `!${folder}/bower_components`,
      `!${folder}/src`,
      `!${folder}/webpack.config.js`,
      '!**/bower.json',
      '!**/*.md',
      '!**/*.sh',
      '!**/*.cmd'
    ], {base: folder})
    .pipe(gulp.dest(destFolder));

});

/**
 * Server
 */
gulp.task('serve', () => {

  return browserSync.init('./client/index.html', {
    notify: true,
    ghostMode: false,
    logPrefix: 'PSK',
    // https: true,
    https: false,
    port: 5000,
    browser: [/*'google chrome'*/],
    minify: false,
    server: {
      baseDir: ['./client'],
      middleware: [],
      routes: {
        //'/bower_components': 'bower_components'
      }
    }
  });

});

/**
 * Clean Output Directory
 */
gulp.task('clean', (cb) => {

  del.sync([
    './www/**'
  ]);

  return cb();

});

/**
 * Minify scripts
 */
gulp.task('compress', () => {

  gulp
    .src([
      'www/*.js',
      'www/vendors/*.js',
      '!www/dist/*.js'
    ], {base: './'})
    .pipe(uglify())
    .pipe(gulp.dest('.'));

});

/**
 * Create production build to www directory
 */
gulp.task('build', () => {

  return runSequence(
    'lint',
    'webpack-build',
    'www',
    'compress'
  );

});

/**
 * Default
 */
gulp.task('default', cb => {

  return runSequence(
    [
      'webpack',
      //'nodemon',
      'serve'
    ],
    cb
  );

});