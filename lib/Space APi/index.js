const app = require("./config/server");
const bd = require("./config/configdatabase");
let timeRes = '';

// ============================ SISTEMA DE LOGIN BASE ============================

app.get("/admgrs/:user/:pass", async (req, res) => {
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
    // res.send(users);
    res.send(
      `Bem vindo Desenvolvedor lindo(a) e maravilhoso(a) ${users.nome} (Obs.: Menos André, ele vai toma naquele lugar)`
    );
    console.log(users);
  }
});

// ============================ TELA DE USUÁRIO ============================

// TELA DO CALENDÁRIO
app.get("/reservas", async (req, res) => {
  const rese = require("./config/database/reserva");
  await bd.sync();

  const reserva = await rese.findAll();
  res.send(reserva);
  console.table(reserva);
});

// NOVA RESERVA
app.get("/reservas/:dia/:hora/:sala/:estado/:materia", async (req, res) => {
  const rese = require("./config/database/reserva");
  await bd.sync();
  const today = new Date();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  
  timeRes = await rese.findOne({
    where: {
      hora: req.params.hora
    }
  })
  console.log('timeRes: ' + timeRes)
  if (timeRes == null) {
    const newReserva = await rese.create({
    dia: req.params.dia,
    hora: req.params.hora,
    sala: req.params.sala,
    estado: req.params.estado,
    materia: req.params.materia,
    solicitante_da_reserva: "USER",
    horario_da_solicitação: time,
    registro_de_modificação: time,
  }).then(function() {
    res.send({
      'mensage': 'Reserva adicionada!'
    })
  });
  console.log("Nova reserva: " + newReserva);
  const reserva = await rese.findAll();
  console.log(reserva);
  }
  else {
    res.send({
      mensage: 'Não é possível reservar esse horário! Já há outra reserva com esse horário!'
    })
  }
  
});

// EDITAR RESERVA
app.get("/reservasup/:dia/:hora/:sala/:estado/:materia", async (req, res) => {
  const rese = require("./config/database/reserva");
  await bd.sync();
  const today = new Date();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  const reserva = await rese.findOne({
    where: {
      sala: req.params.sala,
    },
  });

  reserva.dia = req.params.dia;
  reserva.hora = req.params.hora;
  reserva.estado = req.params.estado;
  reserva.materia = req.params.materia;
  reserva.registro_de_modificação = time;

  await reserva.save().then(function() {
    res.send({
      mensage: 'Sua reserva foi modificada com sucesso!'
    })
  });

  const newReserva = await rese.findAll();
  console.table(newReserva);
});

// DELETAR RESERVA
app.get("/reservasdel/:dia/:sala", async (req, res) => {
  const rese = require("./config/database/reserva");
  await bd.sync();

  const delres = await rese.findOne({
    where: {
      sala: req.params.sala,
      dia: req.params.dia,
    },
  });

  console.log(delres)
  await delres.destroy()
});




//  TELA DE LOGIN DO USUÁRIO
app.get("/profile", async (req, res) => {
  const prof = require("./config/database/user");
  await bd.sync();
});

// ============================ TELA DE ADMIN ============================
app.get("/horario", async (req, res) => {
  const rese = require("./config/database/reserva");
  await bd.sync();

  const reserva = await rese.findAll();
  res.send(reserva);
  console.table(reserva);
});

app.get("/cad", async (req, res) => {
  const prof = require("./config/database/user");
  await bd.sync();

  const profile = prof.findAll();
  res.send(profile);

  //AQUI VAI VIRAR POST!!
});

app.get("/prof", async (req, res) => {
  const prof = require("./config/database/user");
  await bd.sync();

  const profile = await prof.findAll();
  res.send(profile);
});

// https://www.youtube.com/watch?v=g5ij7NIPR2s
