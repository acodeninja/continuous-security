FROM owasp/zap2docker-stable

USER root
RUN apt-get update && apt-get install -y gettext-base && rm -rf /var/lib/apt/lists/*

USER zap
RUN zap.sh -addonupdate -cmd

WORKDIR /target
COPY scan.sh /
COPY zap.yml /

ENTRYPOINT bash /scan.sh
