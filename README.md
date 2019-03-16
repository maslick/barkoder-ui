# barkoder-ui
HTML5 client for [barkoder](https://github.com/maslick/barkoder)

## Heroku
```
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
