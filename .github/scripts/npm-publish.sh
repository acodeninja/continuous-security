#!/usr/bin/env bash

PACKAGE_NAME="$(cat package.json | jq -rc '.name')";
THIS_VERSION="$(cat package.json | jq -rc '.version')";
PUBLISHED_VERSION="$(npm view "$PACKAGE_NAME" --json | jq -rc '."dist-tags".latest')";

echo "Local version:  $THIS_VERSION";
echo "Remote version: $PUBLISHED_VERSION";

[[ "$PUBLISHED_VERSION" == "null" ]] && PUBLISHED_VERSION="0.0.0"

[[ "$THIS_VERSION" == "$PUBLISHED_VERSION" ]] \
  && echo "Local and remote versions are the same, skipping publish" \
  && exit;
[[ "$(echo -e "$THIS_VERSION\n$PUBLISHED_VERSION" | sort -V | tail -1)" == "$PUBLISHED_VERSION" ]] \
  && echo "Remote version is highest, skipping publish" \
  && exit;

echo "Proceeding with publish operation"

npm publish
