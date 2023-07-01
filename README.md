# Continuous Security Scanning

[![npm version](https://badge.fury.io/js/@continuous-security%2Fapplication.svg)](https://badge.fury.io/js/@continuous-security%2Fapplication) ![npm](https://img.shields.io/npm/dw/@continuous-security/application)

This repository is the codebase for TM470 Project by Lawrence Goldstien

## Getting Started

**Requirements**

* Docker (via [Docker CE](https://docs.docker.com/engine/install/),  [Docker Desktop](https://www.docker.com/products/docker-desktop/) or [Rancher](https://github.com/rancher-sandbox/rancher-desktop/))
* [NodeJS >= 18](https://nodejs.org/en/download/package-manager)

```shell
npm i -g @continuous-security/application
continuous-security init
continuous-security scan
```

## Available Scanners

| Scanner               | Links                                                                                                                                                                                                                                                                                                                                                                     |
|-----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **NPM Audit**         | [![docs](https://img.shields.io/badge/documentation-✔-brightgreen)](scanners/npm-audit/README.md) [![npm version](https://badge.fury.io/js/@continuous-security%2Fscanner-npm-audit.svg)](https://badge.fury.io/js/@continuous-security%2Fscanner-npm-audit) ![npm](https://img.shields.io/npm/dw/@continuous-security/scanner-npm-audit)                                 |
| **NJSScan**           | [![docs](https://img.shields.io/badge/documentation-✔-brightgreen)](scanners/njsscan/README.md) [![npm version](https://badge.fury.io/js/@continuous-security%2Fscanner-njsscan.svg)](https://badge.fury.io/js/@continuous-security%2Fscanner-njsscan) ![npm](https://img.shields.io/npm/dw/@continuous-security/scanner-njsscan)                                         |
| **JS-X-Ray**          | [![docs](https://img.shields.io/badge/documentation-✔-brightgreen)](scanners/js-x-ray/README.md) [![npm version](https://badge.fury.io/js/@continuous-security%2Fscanner-js-x-ray.svg)](https://badge.fury.io/js/@continuous-security%2Fscanner-js-x-ray) ![npm](https://img.shields.io/npm/dw/@continuous-security/scanner-js-x-ray)                                     |
| **Python Bandit**     | [![docs](https://img.shields.io/badge/documentation-✔-brightgreen)](scanners/python-bandit/README.md) [![npm version](https://badge.fury.io/js/@continuous-security%2Fscanner-python-bandit.svg)](https://badge.fury.io/js/@continuous-security%2Fscanner-python-bandit) ![npm](https://img.shields.io/npm/dw/@continuous-security/scanner-python-bandit)                 |
| **Python PIP Audit**  | [![docs](https://img.shields.io/badge/documentation-✔-brightgreen)](scanners/python-pip-audit/README.md) [![npm version](https://badge.fury.io/js/@continuous-security%2Fscanner-python-pip-audit.svg)](https://badge.fury.io/js/@continuous-security%2Fscanner-python-pip-audit) ![npm](https://img.shields.io/npm/dw/@continuous-security/scanner-python-pip-audit)     |
| **Ruby Bundle Audit** | [![docs](https://img.shields.io/badge/documentation-✔-brightgreen)](scanners/ruby-bundle-audit/README.md) [![npm version](https://badge.fury.io/js/@continuous-security%2Fscanner-ruby-bundle-audit.svg)](https://badge.fury.io/js/@continuous-security%2Fscanner-ruby-bundle-audit) ![npm](https://img.shields.io/npm/dw/@continuous-security/scanner-ruby-bundle-audit) |
