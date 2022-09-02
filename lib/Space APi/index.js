const app = require("./config/server");
const bd = require("./config/configdatabase");
const Prof = require("./config/database/user");
const rese = require("./config/database/reserva");
let timeRes = "";

// ============================ SISTEMA DE LOGIN BASE ============================

app.get("/login/:rm/:senha", async (req, res) => {
  await bd.sync();

  const users = await Prof.findOne({
    where: {
      rm: req.params.rm,
    },
  });

  if (users == null) {
    res.send({
      mensage: "Usuário não encontrado",
    });
  } else if (req.params.senha != users.senha) {
    res.send({
      mensage: `Senha errada para: ${req.params.rm}`,
    });
  } else {
    res.send({
      mensage: "Acesso Autorizado",
    });
  }
});

// ============================ TELA DE USUÁRIO ============================

// TELA DO CALENDÁRIO
app.get("/reservas", async (req, res) => {
  await bd.sync();

  const reserva = await rese.findAll();
  res.send(reserva);
});

// NOVA RESERVA
app.get("/reservas/:dia/:hora/:sala/:estado/:materia/:rm", async (req, res) => {
  await bd.sync();
  const today = new Date();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  timeRes = await rese.findOne({
    where: {
      hora: req.params.hora,
    },
  });
  console.log("timeRes: " + timeRes);
  if (timeRes == null) {
    const newReserva = await rese
      .create({
        dia: req.params.dia,
        hora: req.params.hora,
        sala: req.params.sala,
        estado: req.params.estado,
        materia: req.params.materia,
        solicitante_da_reserva: req.params.rm,
        horario_da_solicitação: time,
        registro_de_modificação: time,
      })
      .then(function () {
        res.send({
          mensage: "Reserva adicionada!",
        });
      });
    console.log("Nova reserva: " + newReserva);
    const reserva = await rese.findAll();
    console.log(reserva);
  } else {
    res.send({
      mensage:
        "Não é possível reservar esse horário! Já há outra reserva com esse horário!",
    });
  }
});

// EDITAR RESERVA
app.get("/reservasup/:rm/:sala/:dia/:hora/:novasala/:novodia/:novahora/:mat/:estado", async (req, res) => {
  await bd.sync();
  const today = new Date();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  const rmUser = await rese.findOne({
    where: {
      solicitante_da_reserva: req.params.rm,
      sala: req.params.sala,
      dia: req.params.dia,
      hora: req.params.hora
    },
  });


  rmUser.dia = req.params.novodia;
  rmUser.sala = req.params.novasala;
  rmUser.hora = req.params.novahora;
  rmUser.estado = req.params.estado;
  rmUser.materia = req.params.mat;
  rmUser.registro_de_modificação = time;

  await rmUser.save().then(function () {
    res.send({
      mensage: "Sua reserva foi modificada com sucesso!",
    });
  });

  const newReserva = await rese.findAll();
  console.table(newReserva);
});

// DELETAR RESERVA
app.get("/reservasdel/:dia/:sala", async (req, res) => {
  await bd.sync();

  const delres = await rese.findOne({
    where: {
      sala: req.params.sala,
      dia: req.params.dia,
    },
  });

  console.log(delres);
  await delres.destroy();
});

//  TELA DE PERFIL DO USUÁRIO
app.get("/perfil/:rm", async (req, res) => {
  await bd.sync();

  const users = await Prof.findAll({
    where: {
      rm: req.params.rm
    }
  });
  res.send(users);
});

// modificar dados
app.get('/perfilup/:rm/:nome/:email/:foto/:senha/:materia', async (req, res) => {
  await bd.sync();

  const user = await Prof.findOne({
    where: {
      rm: req.params.rm
    }
  });

  user.nome = req.params.nome
  user.email = req.params.email
  user.foto = req.params.foto
  user.materia = req.params.materia
  user.senha = req.params.senha

  await user.save().then(function () {
    res.send({
      mensage: "Perfil Modificado com sucesso!",
    });
  });
})

app.get('/perfildel/:rm', async (req, res) => {
  await bd.sync();
  const user = await Prof.findOne({
    where: {
      rm: req.params.rm
    }
  });

  await user.destroy().then(function () {
    res.send({
      mensage: "Perfil excluido com sucesso!",
    });
  });;
})
// ============================ TELA DE ADMIN ============================
app.get("/horario", async (req, res) => {
  await bd.sync();

  const reserva = await rese.findAll();
  res.send(reserva);
  console.table(reserva);
});

app.get("/cad/:rm/:nome/:email/:foto/:senha/:materia", async (req, res) => {
  await bd.sync();
  profileUser = await Prof.findOne({
    where: {
      rm: req.params.rm
    }
  });

  if (profileUser == null) {
    const newUsers = dbUsers.create({
      rm: req.params.rm,
      nome: req.params.nome,
      e_mail: req.params.email,
      foto: req.params.foto,
      senha: req.params.senha,
      matéria: req.params.materia
    }).then(function () {
      res.send({
        mensage: "Usuário Cadastrado com Sucesso!",
      });
    });
    console.log('novos usuários: ' + newUsers)
    console.log(profileUser)
  }
  else {
    res.send({
      mensage: 'Não é possível cadastrar o usuário, pois o mesmo ja consta o mesmo RM no sistema!'
    })
  }
  

});

app.get("/prof", async (req, res) => {
  await bd.sync();

  const profile = await prof.findAll();
  res.send(profile);
});

// https://www.youtube.com/watch?v=g5ij7NIPR2s

// :rm/:sala/:dia/:hora/:novasala/:novodia/:novahora/materia
// gustavo/labinfo/01092022/730820/labinfo/02092022/730820/sw2