#!/bin/sh

## ##
## starts nodejs and ffmpeg in a docker container
##
## use via `npm run server`
## ##

cd "$(dirname "$0")"

cd ..

docker build -t bm/nodejs-ffmpeg .

docker run -d --rm --name nodejs -p 3000:3000 bm/nodejs-ffmpeg node server/index.js
