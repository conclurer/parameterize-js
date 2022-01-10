#!/bin/sh

rm -rf ./dist
tsc
cp package.json dist/package.json
cp LICENSE.txt dist/LICENSE.txt
cp README.md dist/README.md
