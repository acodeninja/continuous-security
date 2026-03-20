#!/usr/bin/env bash

EXTRA_ARGS=""

if [[ -f "poetry.lock" ]]; then
  pip install poetry poetry-plugin-export
  poetry export -f requirements.txt -o requirements.txt --without-hashes
  EXTRA_ARGS="--no-deps --disable-pip"
fi

pip-audit --format json --output /output/report.json $EXTRA_ARGS --requirement requirements.txt || exit 0
