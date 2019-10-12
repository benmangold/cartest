#!/bin/bash

set +e

rm client/dist/bundle.js

echo ~~ stopping docker containers ~~

docker stop webpack
docker stop nginx
docker stop nodejs
docker stop mongo

echo ~~ removing docker containers ~~

docker rm nodejs
docker rm nginx
docker rm mongo