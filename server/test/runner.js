'use strict';
import chai from '../../node_modules/chai/chai.js';
GLOBAL.assert = chai.assert;

// Run server tests
import './server_test';

// Run browser tests
//./node_modules/.bin/mocha-phantomjs  -R dot client/test/test.html