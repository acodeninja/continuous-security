#!/usr/bin/env bash

if [[ -f "poetry.lock" ]]; then
  pip install poetry
  poetry export -f requirements.txt -o requirements.txt --without-hashes
fi

pip-audit --format json --output /output/report.json --requirement requirements.txt || exit 0
