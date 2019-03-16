# barkoder-ui
HTML5 client for [barkoder](https://github.com/maslick/barkoder)

## Heroku
```
$ git clone https://github.com/maslick/barkoder-ui.git
$ heroku create barkoder-ui
$ git push heroku master
$ heroku config:set \
    KC_URL=https://keycloak.io/auth \
    REALM=barkoder \
    CLIENT_ID=barkoder-web \
    KC_ROLE=craftroom \
    BACKEND_URL=https://barkoder.herokuapp.com
$ heroku open
```

## Docker
```
$ s2i build \
    https://github.com/maslick/barkoder-ui.git \
    registry.access.redhat.com/rhscl/nodejs-8-rhel7 \
    barkoder-ui:1.0

$ docker run -d \
    -e KC_URL=https://keycloak.io/auth \
    -e REALM=barkoder \
    -e CLIENT_ID=barkoder-web \
    -e KC_ROLE=craftroom \
    -e BACKEND_URL=https://barkoder.herokuapp.com \
    -e PORT=8080 \
    -p 8080:8080 \
    barkoder-ui:1.0

$ open http://`docker-machine ip`:8080
```
