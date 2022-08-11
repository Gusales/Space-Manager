const express = require("express");
const app = express();
const port = 1313;

app.get('/', (req, res) => {
  res.send("Bem vindo dev a Space APi");
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
