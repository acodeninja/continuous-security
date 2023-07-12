const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(`<form><input name="words" /></form><p>${req.query?.words}</p>`);
  console.log(req.url, 'request');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
