#!/usr/bin/env bash

pip-audit --format json --output /output/report.json --requirement requirements.txt || exit 0
