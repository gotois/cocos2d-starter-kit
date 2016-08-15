#!/usr/bin/env bash
./node_modules/.bin/gulp build

# Если установлен cocos-CLI значит упаковываем с помощью него
env | grep cocos && npm run clean && cocos compile -s ./client -o ./www -p web -m release || exit 0