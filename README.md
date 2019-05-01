# Cocos2d-Starter-Kit
[![Build Status](https://travis-ci.org/gotois/cocos2d-starter-kit.svg?branch=master&style=flat-square)](https://travis-ci.org/gotois/cocos2d-starter-kit) 
[![Dependency Status](https://david-dm.org/gotois/cocos2d-starter-kit.svg?style=flat-square)](https://david-dm.org/gotois/cocos2d-starter-kit) 
[![devDependency Status](https://david-dm.org/gotois/cocos2d-starter-kit/dev-status.svg?style=flat-square)](https://david-dm.org/gotois/cocos2d-starter-kit#info=devDependencies) 
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/d7124f2e22014cc786e48cb8771b81fa)](https://www.codacy.com/app/qertis/cocos2d-starter-kit?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=gotois/cocos2d-starter-kit&amp;utm_campaign=Badge_Grade)
[![codecov](https://codecov.io/gh/gotois/cocos2d-starter-kit/branch/master/graph/badge.svg)](https://codecov.io/gh/gotois/cocos2d-starter-kit)

<img src="http://www.cocos2d-x.org/attachments/802/cocos2dx_landscape.png" height="128">

## Features
* Code coverage
* Heroku config
* Travis CI
* ESlint
* ES6 Flow Babel
* Hapi WebServer
* SocketIO
* Cocos2d custom build or Cocos CLI build
* ES6 Mocha tests (selenium in clientside)

## Install
```sh
npm install
```

Install Cocos CLI for auto build or you should install custom cocos2d-js move it in vendors directory and change path in index.html

## Usage
1. Change WS server path in project.json ("serverWS")
2. ```gulp```
3. Open Webpage: `http://localhost:5000/`

## Tests:
### All tests
```sh
npm test
```

## Run development server
```sh
gulp nodemon
```

Special for goto Interactive Software
