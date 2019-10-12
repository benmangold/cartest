#!/bin/bash
set -e
## ##
## runs eslint to produce /client/src
##
## use via `npm run eslint`
## ##

cd "$(dirname "$0")"

cd ../..

docker build -t bm/eslint -f $PWD/client/eslint/Dockerfile .

echo "running webpack in $PWD"

docker run --rm -v $PWD/client:/tmp/app/client bm/eslint
