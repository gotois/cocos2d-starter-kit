#!/usr/bin/env bash
./node_modules/.bin/nyc --reporter=lcov --reporter=text ./node_modules/.bin/_mocha server/test/ && ./node_modules/.bin/codecov -e TRAVIS_NODE_VERSION