# barkoder-ui
HTML5 client for [barkoder](https://github.com/maslick/barkoder)

[![Build Status](https://travis-ci.org/maslick/barkoder-ui.svg?branch=master)](https://travis-ci.org/maslick/barkoder-ui)
[![Docker image](https://shields.beevelop.com/docker/image/image-size/maslick/barkoder-ui/latest.svg?style=flat-square)](https://cloud.docker.com/u/maslick/repository/docker/maslick/barkoder-ui)

## Heroku
```
git clone https://github.com/maslick/barkoder-ui.git
heroku create barkoder-ui
git push heroku master
heroku config:set \
  KC_URL=https://keycloak.io/auth \
  REALM=barkoder \
  CLIENT_ID=barkoder-web \
  KC_ROLE=craftroom \
  BACKEND_URL=https://barkoder.herokuapp.com
heroku open
```

## s2i
```
s2i build \
  https://github.com/maslick/barkoder-ui.git \
  registry.access.redhat.com/rhscl/nodejs-8-rhel7 \
  barkoder-ui:1.0

docker run -d \
  -e KC_URL=https://keycloak.io/auth \
  -e REALM=barkoder \
  -e CLIENT_ID=barkoder-web \
  -e KC_ROLE=craftroom \
  -e BACKEND_URL=https://barkoder.herokuapp.com \
  -e PORT=8080 \
  -p 8080:8080 \
  barkoder-ui:1.0

open http://`docker-machine ip`:8080
```

## Docker multistage build
[Here](docker/Dockerfile) I'm using ``node:8`` image as build image and ``nginx`` as runtime image. This reduces image size from ~500Mb to 100Mb.
```
docker build -t barkoder-ui:1.0 -f docker/Dockerfile .
docker image prune --filter label=stage=intermediate -f
docker run -d \
    -e KC_URL=https://keycloak.io/auth \
    -e REALM=barkoder \
    -e CLIENT_ID=barkoder-web \
    -e KC_ROLE=craftroom \
    -e BACKEND_URL=https://barkoder.io \
    -p 8081:80 \
    barkoder-ui:1.0
open http://`docker-machine ip`:8081
```
