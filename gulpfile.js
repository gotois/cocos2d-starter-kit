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
const nodemon = require('gulp-nodemon');
const mochaPhantomJS = require('gulp-mocha-phantomjs');
const webpackConfig = require("./client/webpack.config");

const clientPath = './client';
const serverPath = './server';

/**
 * Lint JavaScript
 */
gulp.task('lint', () => {

  return gulp
    .src([
      // Client
      `${clientPath}/src/**`,
      '!bower_components/',
      '!node_modules/',
      `!${clientPath}/vendor/**`,
      // Server
      `${serverPath}/**`
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
    .src(`${clientPath}/src/game.js`)
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest(`${clientPath}/dist/`));

});

/**
 * Webpack src build
 */
gulp.task('webpack-build', cb => {

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

  webpack(config, err => {
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
    script: `${serverPath}/web_server.js`,
    ext: 'json js',
    ignore: [
      'node_modules/',
      'bower_components/',
      'server/test/'
    ],
    env: {
      HOST: 'localhost',
      PORT: 9000,
      HTTP_TIMEOUT: 1000
    },
    stdout: true,
    readable: false
  })
    .on('restart', () => {
      console.log('server restarted!');

      browserSync.reload({stream: true});
    });

});

/**
 * WWW directory
 */
gulp.task('www', ['clean'], () => {

  return gulp
    .src([
      `${clientPath}/*`,
      `${clientPath}/dist/**/*`,
      `${clientPath}/Fonts/*`,
      `${clientPath}/res/**`,
      `${clientPath}/vendors/**`,
      `!${clientPath}/bower_components`,
      `!${clientPath}/src`,
      `!${clientPath}/webpack.config.js`,
      '!**/bower.json',
      '!**/*.md',
      '!**/*.sh',
      '!**/*.cmd'
    ], {base: clientPath})
    .pipe(gulp.dest('./www/'));

});

/**
 * Start Client Server
 */
gulp.task('serve', () => {

  return browserSync.init(`${clientPath}/index.html`, {
    notify: true,
    ghostMode: false,
    logPrefix: 'PSK',
    https: false,
    port: 5000,
    browser: [],
    minify: false,
    server: {
      baseDir: [clientPath],
      middleware: [],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

});

/**
 * Clean output directory
 */
gulp.task('clean', cb => {

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
gulp.task('build', cb => {

  return runSequence([
      'lint',
      'webpack-build',
      'www',
      'compress'
    ],
    cb);

});

/**
 * Mocha client side tests
 */
gulp.task('test', () => {

  return gulp
    .src('./client/test/runner.html')
    .pipe(mochaPhantomJS());

});

/**
 * Default
 */
gulp.task('default', cb => {

  return runSequence([
      'webpack',
      'nodemon',
      'serve'
    ],
    cb
  );

});
