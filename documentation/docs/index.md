---
title: Home
hide:
  - navigation
---

# Continuous Security

The continuous security tool is an attempt to solve two major problems with existing open-source
security auditing and testing tools:

- To simplify the configuration and operation of security tools by software developers.
- To empower project decision makers with the context they need to effectively prioritise 
  remediation of detected security vulnerabilities.

[![npm version](https://badge.fury.io/js/@continuous-security%2Fapplication.svg)](https://badge.fury.io/js/@continuous-security%2Fapplication) ![npm](https://img.shields.io/npm/dw/@continuous-security/application)

## Getting Started

**Requirements**

* Docker (via [Docker CE](https://docs.docker.com/engine/install/),  [Docker Desktop](https://www.docker.com/products/docker-desktop/) or [Rancher](https://github.com/rancher-sandbox/rancher-desktop/))
* [NodeJS >= 18](https://nodejs.org/en/download/package-manager)

```shell
npm i -g @continuous-security/application
continuous-security init
continuous-security scan
```
