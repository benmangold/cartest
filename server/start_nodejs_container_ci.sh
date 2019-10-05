#!/bin/sh

## ##
## starts nodejs and ffmpeg in a docker container
##
## on linux, we can mount the host network to the container
##
## use via `npm run ci`
## ##

cd "$(dirname "$0")"

cd ..

docker build -t bm/nodejs-ffmpeg .

docker run -it -d --rm --name nodejs -e CI_ENV:$CI_ENV --network host bm/nodejs-ffmpeg node server/index.js 