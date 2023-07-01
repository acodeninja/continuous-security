FROM ruby:latest

WORKDIR /scanner

RUN gem install bundle-audit
RUN bundler-audit update

WORKDIR /target

COPY scan.rb /

ENTRYPOINT ruby /scan.rb
