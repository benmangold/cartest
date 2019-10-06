#!/bin/sh
set -e
## ##
## starts nodejs and ffmpeg in a docker container
##
## on linux, we can mount the host network to the container
##
## use via `npm run ci`
## ##

npx webpack --mode production; 

cd "$(dirname "$0")"

## set credentials proveded by jenkins

touch aws.secret.js

echo "module.exports = {" >> aws.secret.js
echo "  AWS_ACCESS_KEY: '$AWS_ACCESS_KEY'," >> aws.secret.js
echo "  AWS_SECRET_KEY: '$AWS_SECRET_KEY'," >> aws.secret.js
echo "};" >> aws.secret.js
echo "" >> aws.secret.js

## build docker container with secret

cd ..

docker build -t bm/nodejs-ffmpeg .

rm server/aws.secret.js

docker run -it -d --name nodejs -e CI_ENV=$CI_ENV --network host bm/nodejs-ffmpeg node server/index.js 