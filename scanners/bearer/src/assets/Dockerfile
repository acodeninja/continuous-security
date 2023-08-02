FROM bearer/bearer:latest

USER root
RUN git clone https://github.com/Bearer/bearer-rules.git /rules
RUN apt-get update && apt-get install -y yq jq
WORKDIR /target

ENTRYPOINT bearer scan --format json --output /output/report.json /target
