#!/usr/bin/env bash

envsubst < /zap.yml > "$HOME/configured-zap.yml"
zap.sh -cmd -autorun "$HOME/configured-zap.yml"
