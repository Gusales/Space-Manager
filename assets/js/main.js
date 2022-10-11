// PÁGINA DE PERFIL DO USUÁRIO
// IMPLEMENTANDO API DO SPACE MANAGER
const authen = async () => {
  const token = localStorage.getItem("thistoken");
  console.log("This is Token" + token);
  const init = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "x-acess-token": token,
    },
  };
  const responseSM = await fetch("http://192.168.0.16:1313/", init);
  const data = await responseSM.json();
  console.log(data);

  if (data.mensage == 'Token válido') {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('user')

    const log = {
      "id": idParam,
    };
    const init = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      },
    body: JSON.stringify(log)
  };
  const searchFromID = await fetch("http://192.168.0.16:1313/getUser", init);
    const idData = await searchFromID.json();
    
    document.getElementById("exampleModalLabel").textContent = idData.namecCad
  }
  else {
    alert('Você não tem permissão para está aqui!')
    location.href = '../../index.html'
  }
};

document.querySelector(".controllers").style.display = "none";

document.querySelector("#saveButton").addEventListener("click", () => {
  document.querySelector(".controllers").style.display = "block";
  document.querySelector("#saveButton").style.display = "none";
  document.querySelector("input").disabled = "";
  document.querySelector("#emailProfile").disabled = "";
  document.querySelector("#rmProfile").disabled = "";
  document.querySelector("#matProfile").disabled = "";
  document.querySelector("#numProfile").disabled = "";
});

document.querySelector(".fa-floppy-disk").addEventListener("click", () => {
  document.querySelector("input").disabled = "disabled";
  document.querySelector("#emailProfile").disabled = "disabled";
  document.querySelector("#rmProfile").disabled = "disabled";
  document.querySelector("#matProfile").disabled = "disabled";
  document.querySelector("#numProfile").disabled = "disabled";
  document.querySelector(".controllers").style.display = "none";
  document.querySelector("#saveButton").style.display = "block";
});

document.querySelector(".fa-xmark").addEventListener("click", () => {
  document.getElementById("emailID").value = "";
  document.getElementById("numID").value = "";
});

// USANDO JQUERY PRA DEIXAR OS INPUTS BONITINHOS
$(document).ready(() => {
  $("#numProfile").inputmask("(99)99999-9999");
});
