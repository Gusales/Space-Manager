const express = require("express");
const app = express();


app.listen(1313, () => {
  console.log(`Servidor rolando`);
});
module.exports = app;
