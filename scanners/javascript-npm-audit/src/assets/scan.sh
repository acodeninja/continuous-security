#!/usr/bin/env bash

npm audit --json > /output/report.json
chmod 777 /output/report.json
