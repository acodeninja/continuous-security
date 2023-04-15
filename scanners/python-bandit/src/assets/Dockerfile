FROM python:latest

WORKDIR /scanner

RUN pip install bandit

WORKDIR /target

COPY scan.sh /

ENTRYPOINT bash /scan.sh
