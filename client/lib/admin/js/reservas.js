const loadDesRes = async (eventID) => {
    const eventIDNew = eventID.id.replace("eventId", "");
    const log = {
        id: eventIDNew
      };
      const init = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(log),
      };
  
      const responseSM = await fetch("http://localhost:1313/admget", init);
      const resp = await responseSM.json()    
      document.getElementById("descricaoReserva").innerHTML =
        "<b>Descrição:</b> <br>" + resp.descriRes;
      document.getElementById("salaReservada").innerHTML =
        "<b>Espaço reservado:</b> <br>" + resp.espaRes;
      document.getElementById("horarioReserva1").innerHTML =
        "Horário: <b>" + resp.horaResDe + " - " + resp.horaResAte + "</b>";
      document.getElementById("cursoReserva").innerHTML =
        "<b>Turma:</b> " + resp.curRes;
      document.getElementById("matReserva").innerHTML =
        "<b>Matéria:</b> " + resp.matRes;
      document.getElementById("professor").innerHTML =
        "<b>Professor:</b> " + resp.userRes;
    
      document.querySelector(".changeRes").innerHTML = `
      <button onclick="deleteReserva(${resp.idRes})" class="btn-remove-event" >Deletar Reserva</button>`
}    

const deleteReserva = async (id) => {
    const confirma = confirm("Deseja excluir essa reserva?");
    if (confirma == true) {
      const log = {
        id: id,
      };
  
      const init = {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(log),
      };
  
      const responseSM = await fetch("http://localhost:1313/reservasdel", init);
      const data = await responseSM.json();
  
      alert(data.mensage);
      location.reload();
    }
  };
  