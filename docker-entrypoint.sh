#!/bin/sh
set -eu

: "${API_KEY:?API_KEY environment variable must be set}"
: "${API_UPSTREAM:?API_UPSTREAM environment variable must be set}"

envsubst '${API_UPSTREAM} ${API_KEY}' \
    < /etc/nginx/templates/nginx.conf.template \
    > /etc/nginx/conf.d/default.conf

exec nginx -g 'daemon off;'