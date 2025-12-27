const url = 'http://localhost:1313'
document.getElementById('itemSelect').addEventListener("change", async () => {
  const itemSelect = document.getElementById('itemSelect').value 


  const infoItemSelect = await fetch(`${url}/${itemSelect}`)
  const resp = await infoItemSelect.json()

  document.querySelector('.list-group').innerHTML = ''
  if (itemSelect == 'materias') {
    for (let index = 0; index < resp.length; index++) {
      document.querySelector('.list-group').innerHTML += `<li class="list-group-item">${resp[index].matsMat} <i class="fa-solid fa-trash" onclick="deletMat('${resp[index].matsMat}')"></i></li>`
    }
  }
  else if (itemSelect == 'hora') {
    for (let index = 0; index < resp.length; index++) {
      document.querySelector('.list-group').innerHTML += `<li class="list-group-item">${resp[index].horsHora} <i class="fa-solid fa-trash" onclick="deletHor('${resp[index].horsHora}')"></i></li>`
    }
  }
  else if (itemSelect == 'space') {
    for (let index = 0; index < resp.length; index++) {
      document.querySelector('.list-group').innerHTML += `<li class="list-group-item">${resp[index].espEspa} <i class="fa-solid fa-trash" onclick="deletSpa('${resp[index].espEspa}')"></i></li>`
    }
  }
  else if (itemSelect == 'cursos') {
    for (let index = 0; index < resp.length; index++) {
      document.querySelector('.list-group').innerHTML += `<li class="list-group-item">${resp[index].curCurs} <i class="fa-solid fa-trash" onclick="deletCur('${resp[index].curCurs}')"></i></li>`
    }
  }
})


const deletMat = async (param) => {
  const confirmacao = confirm(`Deseja excluir a matéria ${param}?`)

  if (confirmacao == true) {
    const log = {
      materia: param
    }
    const init = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(log),
    };
    const responseSM = await fetch(`${url}/delmat`, init);
    const data = await responseSM.json();

    alert(data.mensage)
    location.reload()
  }
}  
const deletHor = async (param) => {
  const confirmacao = confirm(`Deseja excluir o horário ${param}? Aviso: Caso haja alguma reserva nesse horário, a mesma será excluida!`)

  if (confirmacao == true) {
    const log = {
      horario: param
    }
    const init = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(log),
    };
    const responseSM = await fetch(`${url}/delHora`, init);
    const data = await responseSM.json();

    alert(data.mensage)
    location.reload()
  }
}  
const deletSpa = async (param) => {
  const confirmacao = confirm(`Deseja excluir o espaço ${param}?`)

  if (confirmacao == true) {
    const log = {
      space: param
    }
    const init = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(log),
    };
    const responseSM = await fetch(`${url}/delSpace`, init);
    const data = await responseSM.json();

    alert(data.mensage)
    location.reload()
  }
}  
const deletCur = async (param) => {
  const confirmacao = confirm(`Deseja excluir a matéria ${param}?`)

  if (confirmacao == true) {
    const log = {
      curso: param
    }
    const init = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(log),
    };
    const responseSM = await fetch(`${url}/delcurso`, init);
    const data = await responseSM.json();

    alert(data.mensage)
    location.reload()
  }
}  