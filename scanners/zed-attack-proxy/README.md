# Zed Attack Proxy

## Usage

Use this security scanner with the [continuous-security](https://github.com/acodeninja/continuous-security) application.

## Configuration

This scanner requires a target URL to scan and can be configured as follows:

`.continuous-security.yml`
```yaml
scanners:
  - name: @continuous-security/scanner-zed-attack-proxy
    with:
      target: http://example.com
```

To target a service you have started locally, you can use the target `http://host.docker.internal` 
to connect. 

For example if you are testing this example express js application.

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

Use this configuration

```yaml
scanners:
  - name: @continuous-security/scanner-zed-attack-proxy
    with:
      target: http://172.17.0.1:3000
```

And run the following commands

```shell
node app.js & continuous-security scan
```


