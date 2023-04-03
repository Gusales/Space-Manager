const authen = async () => {
  const token = sessionStorage.getItem("thistoken");
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get('user')
  
  const log = {
    idUser: idParam
  }
  const init = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-acess-token": token,
    },
    body: JSON.stringify(log),
  };
  const responseSM = await fetch("http://localhost:1313/authen", init);
  const data = await responseSM.json();

  if (data.mensage === 'Token válido') {
      loadRese();

    const profile = async () => {
      const log = {
        id: idParam,
      };
      const init = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(log),
      };
  
      const responseSMProf = await fetch("http://localhost:1313/getUser", init);
      const dataProf = await responseSMProf.json();

      document.getElementById("userName").innerHTML = ""
      document.getElementById("userRM").innerHTML = ""
      document.getElementById("userTell").innerHTML = ""
      document.getElementById("userEmail").innerHTML = ""

      document.getElementById("userName").innerHTML = dataProf.namecCad
      document.getElementById("userRM").innerHTML = "RM: " +  dataProf.rmCad
      document.getElementById("userTell").innerHTML = "Telefone: " + dataProf.teleCad
      document.getElementById("userEmail").innerHTML = dataProf.emailCad
    }
    profile()
    
  }
  else {
    alert('Você não tem permissão para está aqui!')
    location.href = '../../index.html'
  }

};

const openListModal = async () => {
  console.log(document.querySelector('.event-header').textContent)
  const day = document.querySelector('.event-header').textContent
  const mesesIngles = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const mesesPortugues = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  var formatData = "";

  for (let index = 0; index < mesesIngles.length; index++) {
    if (day.includes(mesesPortugues[index]) == true) {
      formatData = day.replace(mesesPortugues[index], mesesIngles[index]);
    }
  }

  console.log(formatData)

  const log = {
    day: formatData
  };

  const init = {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(log),
  };

  const responseSM = await fetch("http://localhost:1313/modalist", init);
  const data = await responseSM.json();

  console.log(data)

  if (data.mensage) {
    document.querySelector('.reservas-list-group').innerHTML = ''
    document.querySelector('.reservas-list-group').innerHTML = `
    <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">${data.mensage}</h5>
    </div>
    <p class="mb-1"></p>
  </a>
    `
  }
  else {
    const reservas = data.reservas
    console.log(reservas)
    document.querySelector('.reservas-list-group').innerHTML = ''
    for (let index = 0; index < reservas.length; index++) {
      console.log(data[index])
      document.querySelector('.reservas-list-group').innerHTML += `
    <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1"><b>${reservas[index].horaResDe} - ${reservas[index].horaResAte}</b></h5>
    </div>
    <p class="mb-1"><b>Espaço: </b>${reservas[index].espaRes} <br> <b>Professor:</b> ${reservas[index].userRes}</p>
  </a>
    `
    }
  }
}

function logout() {
  const confirma = confirm('Clique em "ok" para desconectar da sua conta.')
  if (confirma == true) {
    sessionStorage.setItem("thistoken", "")
  sessionStorage.setItem("Usuário", "")
  location.href = '../../'
  }
}