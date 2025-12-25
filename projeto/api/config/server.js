const express = require("express");
const app = express();
const port = process.env.PORT || 1313


app.listen(port, () => {
  console.log(`Servidor rolando`);
});

module.exports = app;
