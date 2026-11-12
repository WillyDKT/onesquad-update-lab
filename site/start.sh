#!/bin/sh
set -eu

cd "$(dirname "$0")"

npm run build:docs
exec python3 -m http.server "${1:-9000}" --bind 127.0.0.1 --directory out
