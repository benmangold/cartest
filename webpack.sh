#!/bin/bash
set -e
## ##
## runs webpack to produce /client/dist/bundle.js
##
## use via `npm run webpack`
## ##

cd "$(dirname "$0")"


docker build -t bm/webpack -f $PWD/webpack.Dockerfile .

echo "running webpack in $PWD"

docker run --rm -it -v $PWD/client:/tmp/app/client bm/webpack npm run dist
