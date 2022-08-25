const app = require("./config/server");
const bd = require("./config/database");
const { use } = require("./config/server");

// ============================ SISTEMA DE LOGIN BASE ============================

app.get('/admgrs/:user/:pass', async (req, res) => {
  const Users = require("./config/database/user");
  await bd.sync();
  // console.table(bd)

  const users = await Users.findOne({
    where: {
      nome: req.params.user,
    },
  });

  if (users === null) {
    res.send("Nada encontrado para: <br> " + `Nome : ${req.params.user}`);
    console.log("Usuário não encontrado, acesso negado");
  } else if (req.params.pass != users.senha) {
    res.send(`Senha errada para: ${req.params.user}`);
  } else {
    res.send(users);
    console.log(users);
  }
});

// ============================ TELA DE USUÁRIO ============================

app.get("/reservas", async (req, res) => {
  res.send("Rota das reservas");
});
app.get("/profile", async (req, res) => {
  res.send("Rota do perfil");
});

// ============================ TELA DE ADMIN ============================
app.get("/horario", async (req, res) => {
  res.send("Rota da Tabela dos Horários");
});
app.get("/cad", async (req, res) => {
  //AQUI VAI VIRAR POST!!
  res.send("Rota para cadastrar usuários");
});
app.get("/prof", async (req, res) => {
  res.send("Rota da Tabela com professores");
});

app.listen(1313, () => {
  console.log(`Servidor rolando`);
});
