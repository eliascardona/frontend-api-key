#!/bin/sh
set -eu

envsubst '${API_KEY} ${API_HOST}' \
    < /etc/nginx/templates/nginx.conf.template
    > /etc/nginx/conf.d/default.conf

exec nginx -g 'daemon off;'