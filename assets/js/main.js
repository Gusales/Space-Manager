const authen = async () => {
  const token = sessionStorage.getItem("thistoken");
  const init = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "x-acess-token": token,
    },
  };
  const responseSM = await fetch("https://space-manager-api.herokuapp.com/authen", init);
  const data = await responseSM.json();

  if (data.mensage == 'Token válido') {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('user')

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
  
      const responseSMProf = await fetch("https://space-manager-api.herokuapp.com/getUser", init);
      const dataProf = await responseSMProf.json();

      console.log(dataProf)

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
    if (data.userID != idParam) {
      console.log("Usuário não autorizado")
    }
    else { 

      const next = async() => {
        const respSM = await fetch("https://space-manager-api.herokuapp.com/space");
        const data = await respSM.json();
        console.log(data.length)
        for (let index = 0; index < data.length; index++) {
          document.getElementById("space").innerHTML += `
          <option value="${data[index].espEspa}">${data[index].espEspa}</option>
          `
        }
      }
      next();
    }
  }
  else {
    alert('Você não tem permissão para está aqui!')
    location.href = 'http://localhost/Space-Manager/'
  }
  montagemMat()
  montagemCurso()
  loadRese()
};
const montagemMat = async () => {
  const responseSMMAT = await fetch('https://space-manager-api.herokuapp.com/materias');
    const dataMat = await responseSMMAT.json()
    console.log(dataMat.length);

    for (let index = 0; index < dataMat.length; index++) {
      console.log(dataMat[index].matsMat)

      document.querySelector('.forDropMat').innerHTML += `
      <a class="dropdown-item matSM${index}" href="#" id="materia${index}" onclick="modMS(${index})" >${dataMat[index].matsMat}</a>
      `
    }
}
const montagemCurso = async () => {
  const responseSMMAT = await fetch('https://space-manager-api.herokuapp.com/cursos');
    const data = await responseSMMAT.json()
    console.log(data.length);

    for (let index = 0; index < data.length; index++) {
      console.log(data[index].curCurs)

      document.getElementById('turma').innerHTML += `
      <option value="${data[index].curCurs}">${data[index].curCurs}</option>
      `
    }
}

const carregar1 = async() => {
  const respSM = await fetch("https://space-manager-api.herokuapp.com/hora");
  const data = await respSM.json();
  console.log(data.length)
  document.querySelector(".horario1").style.display = 'block';
  const space = {
    "selectSala": document.getElementById("space").value
}

const init = {
    method: 'POST',
    headers: {
        "content-Type": "application/json"
    },
    body: JSON.stringify(space)
}
  const resSM = await fetch(`https://space-manager-api.herokuapp.com/getreservas`, init)
  const getSpaceSM = await resSM.json()

  if (getSpaceSM.mensage == "Não há nenhuma reserva para essa sala ;)") {
    console.log(getSpaceSM.mensage)
    const loadHora = async () => {
      // console.log(arrayEspecifico)
      
      for (let index = 0; index < data.length; index++) {
        document.querySelector(".forDropHora").innerHTML += `
        <a class="dropdown-item hItemSM${index}" href="#" id="horario${index}" onclick="modHS(${index})">${data[index].horsHora}</a>
        `
      }
    }
    loadHora()
  }
  else {
    const arrayEspecifico = (getSpaceSM.espaRes).prototype.find("Quadra")
    if (arrayEspecifico === undefined) {
      for (let index = 0; index < data.length; index++) {
        if (getSpaceSM[index].horaResDe != data[index].horsHora) {
        const loadHora = async () => {
          const respSM = await fetch("https://space-manager-api.herokuapp.com/hora");
          const data = await respSM.json();
          console.log(data.length)
      
          for (let index = 0; index < data.length; index++) {
            document.querySelector(".forDropHora").innerHTML += `
            <a class="dropdown-item hItemSM${index}" href="#" id="horario${index}" onclick="modHS(${index})">${data[index].horsHora}</a>
            `
          }
        }
        loadHora()
      }
      
     }
    }
  }

}
function carregar2() {

  const loadHora2 = async () => {
    const respSM = await fetch("https://space-manager-api.herokuapp.com/hora");
    const data = await respSM.json();
    console.log(data.length)

    for (let index = 0; index < data.length; index++) {
      // console.table({
      //   hora: data[index].horsHora,
      //   tamanho: (data[index].horsHora).length
      // })
      document.querySelector(".forDropHora2").innerHTML += `
      <a class="dropdown-item hItemSM${index}" href="#" id="horario${index}" onclick="modHS(${index})">${data[index].horsHora}</a>
      `
    }
  }
  loadHora2().then(() => {
    const loadMat = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const idParam = urlParams.get('user')
      console.log(idParam)
  
      // const respSM = await fetch(`http://192.168.0.16:1313/prof/${idParam}`);
      // const data = await respSM.json();
      // console.log(data)
  
      //Conversar sobre isso aqui com Valdir
  
      
      
    }
    loadMat()
  });
}function carregar4() {
  document.querySelector("#turma").style.display = 'block'
  document.querySelector(".materia").style.display = 'block'

}
// function modHS(hM) {
//   document.querySelector(".horarioSM").innerHTML = document.querySelector(`.hItemSM${hM}`).textContent
//   carregar3()
// }


// USANDO JQUERY PRA DEIXAR OS INPUTS BONITINHOS
// $(document).ready(() => {
//   $("#numProfile").inputmask("(99)99999-9999");
// });
