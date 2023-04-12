#!/usr/bin/env bash

bandit -f json --exit-zero -o /output/report.json -r /target
