#!/bin/bash

## ##
## starts nodejs and ffmpeg in a docker container
##
## use via `npm run server`
## ##

cd "$(dirname "$0")"

cd ..

docker run -it -d --rm --name nodejs -v $PWD/server:/tmp/app/server -p 3000:3000 bm/nodejs-ffmpeg npm run server-watch