const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const app = require("./config/server");
const SECRET = require("./config/authenticate");
const bd = require("./config/configdatabase");
const Prof = require("./config/database/user");
const rese = require("./config/database/reserva");
const cursoSM = require("./config/database/cursos");
const Materia = require("./config/database/materia");
const Space = require("./config/database/space");
const smHora = require("./config/database/smHora");
const transport = require("./config/nodemailer");
const relacionamentoUserMat = require("./config/database/relacionamento1");
const relacionamentoReserva = require("./config/database/relacionamento2");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// ============================ SISTEMA DE LOGIN BASE ============================

app.post("/authen", async (req, res) => {
  const idForUser = req.body.idUser;
  const token = req.headers["x-acess-token"];
  const user = await Prof.findOne({
    where: {
      idCad: idForUser,
    },
  });
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      res.send({
        mensage: "Token inválido",
      });
    } else {
      if (idForUser == decoded.userID) {
        res.send({
          mensage: "Token válido",
          userID: decoded.userID,
          type: user.typeCad,
        });
      } else {
        res.send({
          mensage: "Token inválido",
        });
      }
    }
  });
});

app.post("/login", async (req, res) => {
  await bd.sync();
  const { rm, senha } = req.body;

  const user = await Prof.findOne({
    where: {
      rmCad: rm,
    },
  });

  if (user === null) {
  } else {
    bcrypt.compare(senha, user.seCad, (err, data) => {
      if (err) throw err;
      if (data) {
        const token = jwt.sign({ userID: user.idCad }, SECRET, {
          expiresIn: 3600,
        });
        res.send({
          mensage: "Acesso autorizado",
          auth: true,
          token: token,
          idUser: user.idCad,
          type: user.typeCad,
          status: user.stateCad,
        });
      } else {
        res.send({
          mensage: "Acesso negado - Senha incorreta",
          auth: false,
        });
      }
    });
  }
});

app.post("/validationUser", async (req, res) => {
  await bd.sync();
  const { rm, email } = req.body;

  const data = new Date();
  const day = data.getDay();
  const mouth = data.getMonth();
  const year = data.getFullYear();

  const hour = data.getHours();
  const min = data.getMinutes();

  const timeSoli = `${day}/${mouth}/${year} as ${hour}h${min}min`;

  const user = await Prof.findOne({
    where: {
      rmCad: rm,
      emailCad: email,
    },
  });

  if (user === null) {
    res.send({
      mensage: "Usuário Não encontrado!",
    });
  } else {
    const token = jwt.sign({ userID: user.idCad }, SECRET, { expiresIn: 300 });
    transport
      .sendMail({
        from: "Space Manager <spacemanagerGR@gmail.com>",
        to: email,
        subject: "Alteração de senha",
        html: `
      <h1>Olá ${user.namecCad}!</h1>
      <h3>Recebemos as ${timeSoli} uma solicitação para a alteração de sua senha no nosso sistema</h3>
        <h3>Clique no link abaixo para realizar a alteração de sua senha</h3>
        <h3><a href="http://127.0.0.1:5500/client/assets/html/changePass/changePass.html?user=${user.idCad}">Trocar senha</a></h3>
        `,
        text: `Solicitação para a mudança de senha`,
      })
      .then((response) => {
      })
      .catch((err) => {
      });

    res.send({
      mensage:
        "Um email foi enviado para seu email, cheque sua caixa de email ou spam para realizar a alteração da senha",
      token: token,
      id: user.idCad,
    });
  }
});

app.post("/change", async (req, res) => {
  await bd.sync();
  const { id, pass } = req.body;
  bcrypt.hash(pass, 10, async (errBcrypt, hash) => {
    if (errBcrypt) {
      return res.status(500).send({
        errpr: errBcrypt,
      });
    } else {
      const user = await Prof.findOne({
        where: {
          idCad: id,
        },
      });

      user.seCad = hash;
      await user.save().then(() => {
        transport
          .sendMail({
            from: "Space Manager <spacemanagerGR@gmail.com>",
            to: user.emailCad,
            subject: "Alteração de senha",
            html: `
              <h1>Olá ${user.namecCad}!</h1>
              <h3>Sua senha acaba de ser alterada com sucesso!</h3>
                <h3>Caso não tenha sido você que fez a mudança, entre em contato com o administrador do sistema (Secretaria da Escola)</h3>
                `,
            text: `Alteração da senha`,
          })
          .then((response) => {
            res.send({
              mensage: `Senha modificada com sucesso!`,
            });
          })
          .catch((err) => {
          });
      });
    }
  });
});
app.get("/loadMat/:id", async (req, res) => {
  await bd.sync();
  const mats = [];
  const seachMatForUser = await relacionamentoUserMat.findAll({
    where: {
      idUser: req.params.id,
    },
  });

  for (let index = 0; index < seachMatForUser.length; index++) {
    const matForUser = await Materia.findOne({
      where: {
        idMat: seachMatForUser[index].idMat,
      },
    });
    mats.push(matForUser.matsMat);
  }

  res.send(mats);
});

app.post("/getUser", async (req, res) => {
  const idUser = req.body.id;
  await bd.sync();

  const users = await Prof.findOne({
    where: {
      idCad: idUser,
    },
  });
  res.send(users);
});
// ============================ TELA DE USUÁRIO ============================

// TELA DO CALENDÁRIO
app.get("/reservas", async (req, res) => {
  await bd.sync();

  const reserva = await rese.findAll();
  const evoCalendarInfo = [];
  const thisDate = "date";
  for (let index = 0; index < reserva.length; index++) {
    const events = {
      id: "eventId" + reserva[index].idRes,
      name: `${reserva[index].horaResDe} - ${reserva[index].horaResAte}`,
      date: reserva[index].dayRes,
      description: `Local: ${reserva[index].espaRes}`,
      type: "event",
    };
    evoCalendarInfo.push(events);
  }
  res.send({
    evoCalendarInfo: evoCalendarInfo,
    reservas: reserva,
  });
});

app.post("/getreservas", async (req, res) => {
  await bd.sync();
  const pesquisa = req.body.selectSala;
  const reserva = await rese.findOne({
    where: {
      espaRes: pesquisa,
    },
  });

  if (reserva == null) {
    res.send({
      mensage: "Não há nenhuma reserva para essa sala ;)",
    });
  } else {
    res.send(reserva);
  }
});

app.post("/modalist", async (req, res) => {
  await bd.sync();
  const { day } = req.body;

  const getReservas = await rese.findAll({
    where: {
      dayRes: day,
    },
  });

  if (getReservas.length === 0) {
    res.send({
      mensage: "Não há nehuma reserva de outros professores para hoje",
    });
  } else {
    res.send({
      reservas: getReservas,
    });
  }
});

app.post("/admget", async (req, res) => {
  await bd.sync();
  const { id } = req.body;
  const reserva = await rese.findOne({
    where: {
      idRes: id,
    },
  });

  if (reserva == null) {
    res.send({
      mensage: "Não há nenhuma reserva para essa sala ;)",
    });
  } else {
    res.send(reserva);
  }
});

app.post("/getReservasByID", async (req, res) => {
  await bd.sync();
  const { id } = req.body;

  const reserva = await rese.findOne({
    where: {
      idRes: id,
    },
  });

  if (reserva === null) {
    res.send({
      mensage: "Não há nenhuma reserva",
    });
  } else {
    res.send(reserva);
  }

});

// NOVA RESERVA
app.post("/seachFromId", async (req, res) => {
  const user = req.body.user;
  await bd.sync();
  const nrese = await rese.findAll({
    where: {
      userRes: user,
    },
  });

  if (nrese == null) {
    res.send("Não há nenhuma reserva para esse usuário");
  } else {
    const evoCalendarInfo = [];
    const thisDate = "date";
    for (let index = 0; index < nrese.length; index++) {
      const events = {
        id: "eventId" + nrese[index].idRes,
        name: `${nrese[index].horaResDe} - ${nrese[index].horaResAte}`,
        date: nrese[index].dayRes,
        description: `Local: ${nrese[index].espaRes}`,
        type: "event",
      };
      evoCalendarInfo.push(events);
    }
    res.send({
      reservaInfo: nrese,
      evoCalendarInfo: evoCalendarInfo,
    });
  }
});

app.post("/getCoordRes", async (req, res) => {
  const user = req.body.user;
  await bd.sync();
  const nrese = await rese.findAll();

  if (nrese == null) {
    res.send("Não há nenhuma reserva para esse usuário");
  } else {
    const evoCalendarInfo = [];
    const thisDate = "date";
    for (let index = 0; index < nrese.length; index++) {
      const events = {
        id: "eventId" + nrese[index].idRes,
        name: `${nrese[index].horaResDe} - ${nrese[index].horaResAte}`,
        date: nrese[index].dayRes,
        description: nrese[index].espaRes,
        type: "event",
      };
      evoCalendarInfo.push(events);
    }
    res.send({
      reservaInfo: nrese,
      evoCalendarInfo: evoCalendarInfo,
    });
  }
});

app.get("/getReserva/:idReserva", async (req, res) => {
  const idReserva = req.params.idReserva;
  await bd.sync();

  const nrese = await rese.findOne({
    where: {
      idRes: idReserva,
    },
  });

  if (nrese != null) {
    res.send(nrese);
  } else {
    res.send({
      mensage: "Não há nenhuma reserva com esse id!",
    });
  }
});
app.post("/reservas", async (req, res) => {
  await bd.sync();
  const today = new Date();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const horarios = req.body.timeReserva;
  const timeRes = await rese.findOne({
    where: {
      horaResDe: req.body.horaIni,
      horaResAte: req.body.horaFim,
      dayRes: req.body.data,
    },
  });
  if (timeRes == null) {
    const newReserva = await rese
      .create({
        userRes: req.body.user,
        curRes: req.body.curso,
        matRes: req.body.materia,
        horaResDe: req.body.horaIni,
        horaResAte: req.body.horaFim,
        dayRes: req.body.data,
        espaRes: req.body.space,
        descriRes: req.body.descri,
        estaRes: req.body.state,
        horSolicRes: time,
      })
      .then(async () => {
        const reservaa = await rese.findOne({
          where: {
            horaResDe: req.body.horaIni,
            horaResAte: req.body.horaFim,
            dayRes: req.body.data,
          },
        });
        const loop = horarios.length - 1;
        for (let index = 0; index < loop; index++) {
          const newRelacionamento = relacionamentoReserva.create({
            idHora: horarios[index],
            idRes: reservaa.idRes,
            espRes: req.body.space,
            dayRes: req.body.data,
            idUser: req.body.idUser,
          });
        }
        res.send({
          mensage: "Reserva adicionada!",
        });
      });
    const reserva = await rese.findAll();
  } else {
    res.send({
      mensage:
        "Não é possível reservar esse horário! Já há outra reserva com esse horário!",
    });
  }
});

// EDITAR RESERVA
app.post("/updateRes", async (req, res) => {
  await bd.sync();
  const { id, turma, materia, descri } = req.body;

  const thisRes = await rese.findOne({
    where: {
      idRes: id,
    },
  });

  thisRes.curRes = turma;
  thisRes.matRes = materia;
  thisRes.descriRes = descri;

  await thisRes
    .save()
    .then(() => {
      res.send({
        status: 200,
        mensage: "Reserva alterada com sucesso",
      });
    })
    .catch(() => {
      res.send({
        mensage: "erro",
      });
    });
});

// DELETAR RESERVA
app.post("/reservasdel", async (req, res) => {
  await bd.sync();
  const { id } = req.body;

  const delres = await rese.findOne({
    where: {
      idRes: id,
    },
  });
  const delRelacionamento = await relacionamentoReserva.findOne({
    where: {
      idRes: id,
    },
  });
  if (delres) {
    await delres.destroy();
    await delRelacionamento.destroy().then(
      res.send({
        mensage: "Reserva excluida com sucesso!",
      })
    );
  } else {
    res.send({
      mensage: "Nenhuma reserva encontrada",
    });
  }
});

//  TELA DE PERFIL DO USUÁRIO
app.get("/perfil/:rm", async (req, res) => {
  await bd.sync();

  const users = await Prof.findAll({
    where: {
      rm: req.params.rm,
    },
  });
  res.send(users);
});

// modificar dados

app.get("/perfildel/:id", async (req, res) => {
  await bd.sync();
  const user = await Prof.findOne({
    where: {
      idCad: req.params.id,
    },
  });

  user.stateCad = false;

  await user.save().then(() => {
    res.send({
      status: 200,
      mensage:
        "Usuário excluido com sucesso! Você ainda poderá restaurar esse usuário!",
    });
  });
});
app.get("/perfilreative/:id", async (req, res) => {
  await bd.sync();
  const user = await Prof.findOne({
    where: {
      idCad: req.params.id,
    },
  });

  user.stateCad = true;

  await user.save().then(() => {
    res.send({
      status: 200,
      mensage:
        "Usuário reativado com sucesso! Você ainda poderá restaurar esse usuário!",
    });
  });
});

app.post("/seachProfid", async (req, res) => {
  await bd.sync();

  const { id } = req.body;
  const user = await Prof.findOne({
    where: {
      idCad: id,
    },
  });
  res.send(user);
});
// ============================ TELA DE ADMIN ============================
app.get("/horario", async (req, res) => {
  await bd.sync();

  const reserva = await rese.findAll();
  res.send(reserva);
});
// =========================== ADICIONANDO CURSOS AO SISTEMA =======================
app.get("/cursos", async (req, res) => {
  await bd.sync();
  const cursos = await cursoSM.findAll();
  res.send(cursos);
});

app.post("/cursos", async (req, res) => {
  await bd.sync();

  const cur = req.body;

  const curso = await cursoSM.findOne({
    where: {
      curCurs: cur.curso,
    },
  });

  if (curso == null) {
    const newCurso = cursoSM
      .create({
        curCurs: cur.curso,
      })
      .then(() => {
        res.send({
          mensage: "Novo curso adicionado",
        });
      });
  } else {
    res.send({
      mensage: `Não é possivel adicionar curso, já há um curso cadastrado no sistema!`,
      curso: curso,
    });
  }
});

app.post("/modcurso", async (req, res) => {
  const { novoCurso, curso } = req.body;
  await bd.sync();
  const cursos = await cursoSM.findOne({
    where: {
      curCurs: curso,
    },
  });

  // res.send(cursos);

  if (cursos == null) {
    res.send({
      mensage: "Nenhum curso foi encontrado",
    });
  } else {
    cursos.curCurs = novoCurso;
    await cursos.save().then(function () {
      res.send({
        mensage: `Curso alterado com sucesso!`,
      });
    });
  }
});

app.post("/delcurso", async (req, res) => {
  //começa aqui
  await bd.sync();
  const cursos = await cursoSM.findOne({
    where: {
      curCurs: req.body.curso,
    },
  });
  await cursos.destroy().then(function () {
    res.send({
      mensage: "Curso excluido com sucesso!",
    });
  });
});

app.post("/delmat", async (req, res) => {
  await bd.sync();
  const materia = await Materia.findOne({
    where: {
      matsMat: req.body.materia,
    },
  });
  await materia.destroy().then(function () {
    res.send({
      mensage: "matéria excluida com sucesso!",
    });
  });
});

app.post("/delHora", async (req, res) => {
  await bd.sync();
  const { horario } = req.body;
  const hora = await smHora.findOne({
    where: {
      horsHora: horario,
    },
  });

  if (hora) {
    const seachRelacionamento = await relacionamentoReserva.findAll({
      where: {
        idHora: horario,
      },
    });

    if (seachRelacionamento.length != 0) {
      const ids = [];
      const idr = [];
      for (let index = 0; index < seachRelacionamento.length; index++) {
        ids.push(seachRelacionamento[index].idRes);
        idr.push(seachRelacionamento[index].idRel);
      }
      if (ids.length != 0) {
        for (let i = 0; i < ids.length; i++) {
          const deletReserva = await rese.findOne({
            where: {
              idRes: ids[i],
            },
          });
          await deletReserva.destroy().then(async () => {
            await hora.destroy().then(async () => {
              for (let index = 0; index < idr.length; index++) {
                const deletRelacionamento = await relacionamentoReserva.findOne(
                  {
                    where: {
                      idRel: idr[index],
                    },
                  }
                );
                if (deletRelacionamento != null) {
                  await deletRelacionamento.destroy();
                }
              }
              if (i == 1) {
                res.send({
                  mensage: `Horário excluido! Aviso: ${i} reserva foi excluida com sucesso!`,
                });
              } else {
                res.send({
                  mensage: `Horário excluido! Aviso: ${i} reservas foram excluidas com sucesso`,
                });
              }
            });
          });
        }
      }
    } else {
      await hora.destroy().then(async () => {
        const seachFromTableRese = await rese.findAll({
          where: {
            horaResAte: horario,
          },
        });
        const idss = [];
        if (seachFromTableRese.length > 0) {
          for (let index = 0; index < seachFromTableRese.length; index++) {
            const deletThis = await rese.findOne({
              where: {
                idRes: seachFromTableRese[index].idRes,
              },
            });
            await deletThis.destroy();
          }
          res.send({
            mensage: `Horário Excluido com sucesso e com exclusão de ${seachFromTableRese.length} reservas`,
          });
        } else {
          res.send({
            mensage:
              "Horário Excluido com sucesso e sem alterações nas reservas",
          });
        }
      });
    }
  }
});

app.post("/delSpace", async (req, res) => {
  await bd.sync();
  const space = await Space.findOne({
    where: {
      espEspa: req.body.space,
    },
  });
  if (space == null) {
    res.send({
      mensage: "nada encontrado",
    });
  } else {
    await space.destroy().then(function () {
      res.send({
        mensage: "Espaço excluido com sucesso!",
      });
    });
  }
});

app.post("/list", async (req, res) => {
  await bd.sync();
  const { room, date } = req.body;

  const reservaByRoom = await rese.findAll({
    where: {
      espaRes: room,
      dayRes: date,
    },
  });

  if (reservaByRoom.length === 0) {
    res.send({ mensage: "nenhuma sala encontrada" });
  } else {
    res.send(reservaByRoom);
  }
});

app.get("/materias", async (req, res) => {
  await bd.sync();
  const mat = await Materia.findAll();
  res.send(mat);
});

app.post("/materias", async (req, res) => {
  await bd.sync();

  const materia = req.body.materia;

  const matsMat = await Materia.findOne({
    where: {
      matsMat: materia,
    },
  });

  if (matsMat == null) {
    const newMat = Materia.create({
      matsMat: materia,
    }).then(() => {
      res.send({
        mensage: "Nova matéria adicionada",
      });
    });
  } else {
    res.send({
      mensage: `Não é possivel adicionar a matérias, pois já há cadastrada no sistema!`,
      Matéria: matsMat,
    });
  }
});

app.post("/modMat", async (req, res) => {
  const { novaMat, materia } = req.body;
  await bd.sync();
  const mat = await Materia.findOne({
    where: {
      matsMat: materia,
    },
  });

  // res.send(cursos);

  if (mat == null) {
    res.send({
      mensage: "Nenhuma matéria foi encontrado",
    });
  } else {
    mat.matsMat = novaMat;
    await mat.save().then(function () {
      res.send({
        mensage: `Matéria alterada com sucesso!`,
      });
    });
  }
});

// =========================== ADICIONANDO ESPAÇOS AO SISTEMA =======================

app.post("/seachHoraSpace", (req, res) => {
  const { hora, Espaço } = req.body;
});

app.get("/space", async (req, res) => {
  await bd.sync();
  const spa = await Space.findAll();
  res.send(spa);
});

app.post("/spaceSeach", async (req, res) => {
  await bd.sync();
  const hor = await smHora.findAll();
  const horarios = [];
  const horariosOcupado = [];

  for (let index = 0; index < hor.length; index++) {
    horarios.push(hor[index].horsHora);
  }

  const { room, day, idUser } = req.body;

  const verificarSala = await relacionamentoReserva.findAll({
    where: {
      espRes: room,
      dayRes: day,
    },
  });

  for (let i = 0; i < verificarSala.length; i++) {
    horariosOcupado.push(verificarSala[i].idHora);
  }

  const verificarProf = await relacionamentoReserva.findAll({
    where: {
      idUser: idUser,
      dayRes: day,
    },
  });


  for (let a = 0; a < verificarProf.length; a++) {
    horariosOcupado.push(verificarProf[a].idHora);
  }
  const ocupado = horariosOcupado.filter(
    (este, i) => horariosOcupado.indexOf(este) === i
  );
  var reservado = horarios;
  if (ocupado.length != 0) {
    for (let index = 0; index < ocupado.length; index++) {
      const i = horarios.indexOf(ocupado[index]);
      reservado[i] = "OCUPADO";
    }
    const livre = [];
    for (let index = 0; index < reservado.length; index++) {
      if (reservado[index] != "OCUPADO") {
        livre.push(reservado[index]);
      }
    }
    res.send({
      livre: livre,
      reservado: ocupado,
      allHoras: reservado,
    });
  } else {
    res.send({
      livre: horarios,
    });
  }
});

app.post("/space", async (req, res) => {
  await bd.sync();

  const space = req.body.espaco;

  const espEspa = await Space.findOne({
    where: {
      espEspa: space,
    },
  });

  if (espEspa == null) {
    const newSpace = Space.create({
      espEspa: space,
    }).then(() => {
      res.send({
        mensage: "Novo espaço adicionado",
      });
    });
  } else {
    res.send({
      mensage: `Não é possivel adicionar o espaço, pois já há um cadastrado no sistema!`,
      Espaço: espEspa,
    });
  }
});

app.post("/modSpace", async (req, res) => {
  const { novoSpace, espaco } = req.body;
  await bd.sync();
  const espa = await Space.findOne({
    where: {
      espEspa: espaco,
    },
  });

  // res.send(cursos);

  if (espa == null) {
    res.send({
      mensage: "Nenhum espaço foi encontrado",
    });
  } else {
    espa.espEspa = novoSpace;
    await espa.save().then(() => {
      res.send({
        mensage: `Espaço modificado com sucesso!`,
      });
    });
  }
});
// =========================== ADICIONANDO HORÁRIOS AO SISTEMA =======================
app.get("/hora", async (req, res) => {
  await bd.sync();
  const hor = await smHora.findAll();
  res.send(hor);
});

app.post("/hora", async (req, res) => {
  await bd.sync();

  const horario = req.body.horario;

  const horsHora = await smHora.findOne({
    where: {
      horsHora: horario,
    },
  });

  if (horsHora == null) {
    const newHor = smHora
      .create({
        horsHora: horario,
      })
      .then(() => {
        res.send({
          mensage: "Novo horário adicionado",
        });
      });
  } else {
    res.send({
      mensage: `Não é possivel adicionar o horário, pois já há um cadastrado no sistema!`,

      Horário: horsHora,
    });
  }
});

app.post("/modHora", async (req, res) => {
  const { novoHorario, horario } = req.body;
  await bd.sync();
  const hora = await smHora.findOne({
    where: {
      horsHora: horario,
    },
  });

  // res.send(cursos);

  if (hora == null) {
    res.send({
      mensage: "Nenhum horário foi encontrado",
    });
  } else {
    hora.horsHora = novoHorario;
    await hora.save().then(() => {
      res.send({
        mensage: `Espaço modificado com sucesso!`,
      });
    });
  }
});

// ============================= ADICIONANDO USUÁRIOS =============================

app.get("/prof", async (req, res) => {
  await bd.sync();

  const profile = await Prof.findAll();
  res.send(profile);
});
app.get("/prof/:id", async (req, res) => {
  await bd.sync();
  const profile = await Prof.findOne({
    where: {
      idCad: req.params.id,
    },
  });
  res.send(profile);
});

app.post("/cad", async (req, res) => {
  await bd.sync();

  const usuario = req.body;

  profileUser = await Prof.findOne({
    where: {
      rmCad: usuario.rm,
    },
  });
  // ENCRIPTOGRAFAR A SENHA
  bcrypt.hash(usuario.senha, 10, (errBcrypt, hash) => {
    if (errBcrypt) {
      return res.status(500).send({
        errpr: errBcrypt,
      });
    } else {
      if (profileUser === null) {
        const newUsers = Prof.create({
          rmCad: usuario.rm,
          namecCad: usuario.nome,
          emailCad: usuario.email,
          seCad: hash,
          teleCad: usuario.tel,
          stateCad: usuario.state,
          typeCad: usuario.type,
        }).then(function async() {
          const typeForUser = usuario.type;
          if (typeForUser === "prof") {
            createRelacionamento();
          }
          res.send({
            mensage: "Usuário Cadastrado com Sucesso!",
          });

          transport
            .sendMail({
              from: "Space Manager <spacemanagerGR@gmail.com>",
              to: usuario.email,
              subject: "Cadastro no sistema",
              html: `
            <h1>Olá ${usuario.nome}!</h1>
            <h3>Você acaba de ser cadastrado no sistema de gerenciador de espaços Space Manager!</h3>
              <h3>Aqui está o seu rm: ${usuario.rm}, e a sua senha: ${usuario.senha}.</h3>
              <h3>Faça seu login aqui! <a href="http://192.168.0.5/Space-Manager/">Space Manager</a></h3>
              `,
              text: `Olá ${usuario.nome}, você acaba de ser cadastrado no sistena de gerenciador de espaços Space Manager! \ Aqui está o seu rm: ${usuario.rm}, e a sua senha: ${usuario.senha}. E para fazer login, acesse: http://localhost/Space-Manager/`,
            })
            .then((response) => {
            })
            .catch((err) => {
            });
        });
      } else {
        return res.send({
          mensage:
            "Não é possível cadastrar o usuário, pois o mesmo ja consta o mesmo RM no sistema!",
        });
      }
    }
  });
  const createRelacionamento = async () => {
    await bd.sync();

    tableMaterias = await relacionamentoUserMat.findAll();

    const mats = usuario.materias;

    createdProfileUser = await Prof.findOne({
      where: {
        rmCad: usuario.rm,
      },
    });

    for (let index = 0; index < mats.length; index++) {
      const newRelacionamento = relacionamentoUserMat.create({
        idMat: mats[index],
        idUser: createdProfileUser.idCad,
      });
    }
  };
});

// https://www.youtube.com/watch?v=g5ij7NIPR2s
// https://www.youtube.com/watch?v=hx94qo26egk
// https://www.youtube.com/watch?v=SjtdH3dWLa8&t=2023s&ab_channel=ManualdoDev
// https://www.youtube.com/watch?v=RyH3qu3smVI&ab_channel=CoderDmitri
// https://www.youtube.com/watch?v=aVAl8GzS0d0&ab_channel=Maransatto - encriptografar a senha
// // https://stackoverflow.com/questions/40076638/compare-passwords-bcryptjs - sistema de login
// https://www.youtube.com/watch?v=D0gpL8-DVrc&ab_channel=LuizTools - GERAÇÃO DE TOKENS
