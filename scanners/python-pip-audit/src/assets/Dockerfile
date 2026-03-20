FROM python:3.13

WORKDIR /scanner

RUN pip install pip-audit

WORKDIR /target

COPY scan.sh /

ENTRYPOINT bash /scan.sh
