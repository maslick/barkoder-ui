#!/bin/sh -eu

./configure.sh > /usr/share/nginx/html/js/config.js
echo Starting nginx
nginx -g "daemon off;"
