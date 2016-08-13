#!/usr/bin/env bash
./node_modules/.bin/mocha --compilers js:babel-core/register ./server/test/runner.js && gulp test