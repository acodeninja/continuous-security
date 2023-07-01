#!/usr/bin/env bash

njsscan --json --output /output/report.json /target
chmod 777 /output/report.json
