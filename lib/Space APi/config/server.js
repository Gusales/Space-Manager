const express = require("express");
const app = express();
const port = 1313;

const bd = require("./database");

app.get("/adminSM/:user", (req, res) => {
  // res.send("BEM VINDO AO SPACE API");

  bd.query(
    "SELECT * FROM `admgrs` WHERE nome = " + "'" + req.params.user + "'",
    function (error, results, fields) {
      if (error) {
        throw error;
      } else {
        res.send(results);
        console.table(results);
        // if ((results)) {
        //   console.log("DEV NÂO ENCONTRADO");
        // } else {
        //   res.send(results);
        // }
      }
      //   console.log('The solution is: ', results[0].solution);
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
