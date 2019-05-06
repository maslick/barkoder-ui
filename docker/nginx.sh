#!/bin/sh -eu

./configure.sh > /usr/share/nginx/html/config.js
echo Starting nginx
nginx -g "daemon off;"
