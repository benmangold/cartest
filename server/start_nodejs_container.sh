#!/bin/sh

## ##
## starts nodejs and ffmpeg in a docker container
##
## use via `npm run server`
## ##

cd "$(dirname "$0")"

cd ..

docker build -t bm/nodejs-ffmpeg .

docker run -it -d --name nodejs -p 3000:3000 -e CI_ENV:$CI_ENV bm/nodejs-ffmpeg node server/index.js 
