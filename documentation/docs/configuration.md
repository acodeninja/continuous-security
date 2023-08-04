---
hide:
  - navigation
---

# Configuration

The continuous security tool uses a configuration file `.continuous-security.{yml|json}`. For an 
easy-to-follow setup for your project, use the `continuous-security init` command to answer 
questions about the scanners you wish to use.

```typescript title="configuration.d.ts"
type ConfigurationFile = {
  ignore?: Array<string>;
  scanners: Array<string | {
    name: string;
    with?: Record<string, string>;
  }>;
}
```

## Example JavaScript Project

```yaml title=".continuous-security.yml file for a JavaScript project"
ignore:
  - node_modules/
  - build/
  - dist/
scanners:
  - "@continuous-security/scanner-bearer"
  - "@continuous-security/scanner-javascript-js-x-ray"
  - "@continuous-security/scanner-javascript-njsscan"
  - "@continuous-security/scanner-javascript-npm-audit"
  - name: "@continuous-security/scanner-zed-attack-proxy"
    with:
        target: http://localhost:3000
```

## Example Ruby Project

```yaml title=".continuous-security.yml file for a Ruby project"
scanners:
  - "@continuous-security/scanner-bearer"
  - "@continuous-security/scanner-ruby-bundle-audit"
  - name: "@continuous-security/scanner-zed-attack-proxy"
    with:
        target: http://localhost:3000
```

## Example Python Project

```yaml title=".continuous-security.yml file for a Python project"
scanners:
  - "@continuous-security/scanner-python-pip-audit"
  - "@continuous-security/scanner-python-bandit"
  - name: "@continuous-security/scanner-zed-attack-proxy"
    with:
        target: http://localhost:3000
```
