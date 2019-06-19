#!/bin/sh -eu

./configure.sh > /var/www/config.js
echo Starting nginx
nginx -g "daemon off;"
