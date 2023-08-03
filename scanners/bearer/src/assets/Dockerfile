FROM bearer/bearer:latest

WORKDIR /target

USER root
RUN git clone https://github.com/Bearer/bearer-rules.git /bearer
RUN cd /bearer && git checkout "$(git describe --tags `git rev-list --tags --max-count=1`)"

ENTRYPOINT bearer scan \
  --disable-default-rules --external-rule-dir /bearer/rules \
  --format json \
  --output /output/report.json \
  /target
