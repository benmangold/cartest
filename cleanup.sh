#!/bin/bash

## https://stackoverflow.com/questions/34228864/stop-and-delete-docker-container-if-its-running

docker stop nginx || true && docker rm nginx || true
docker stop nodejs || true && docker rm nodejs || true
docker stop mongo || true && docker rm mongo || true
