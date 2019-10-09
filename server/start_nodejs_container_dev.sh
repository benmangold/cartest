#!/bin/bash

## ##
## starts nodejs and ffmpeg in a docker container
##
## use via `npm run server`
## ##

cd "$(dirname "$0")"

cd ..

docker build -t bm/nodejs-ffmpeg .

# docker run -it --rm --name nodejs -v $PWD/server:/tmp/app/server -p 3000:3000 bm/nodejs-ffmpeg /bin/sh

docker run -it --rm --name nodejs -v $PWD/server:/tmp/app/server -p 3000:3000 bm/nodejs-ffmpeg npm run server-watch