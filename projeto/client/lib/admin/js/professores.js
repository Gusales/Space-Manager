const loadTable = async () => {
  document.querySelector(".list-group").innerHTML = "";
  const respProf = await fetch("http://localhost:1313/prof");
  const data = await respProf.json();
  for (let index = 1; index < data.length; index++) {
    if (data[index].stateCad == false) {
      document.querySelector(".list-group").innerHTML += `
            <li class="list-group-item excluido" onclick="loadProfile(${data[index].idCad})" data-bs-toggle="modal" data-bs-target="#profile"><b>RM: </b>${data[index].rmCad} - <b>Nome:</b> ${data[index].namecCad}</li>`;
    } else {
      document.querySelector(".list-group").innerHTML += `
            <li class="list-group-item" onclick="loadProfile(${data[index].idCad})" data-bs-toggle="modal" data-bs-target="#profile"><b>RM: </b>${data[index].rmCad} - <b>Nome:</b> ${data[index].namecCad}</li>
            `;
    }
  }
};

const loadProfile = async (id) => {
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

  const responseSM = await fetch("http://localhost:1313/seachProfid", init);
  const data = await responseSM.json();

  document.getElementById("userName").innerHTML = data.namecCad;
  document.getElementById("userRM").innerHTML = data.rmCad;
  document.getElementById("userTell").innerHTML = data.teleCad;
  document.getElementById("userEmail").innerHTML = data.emailCad;

  if (data.stateCad == true) {
    document.querySelector(
      ".delete"
    ).innerHTML = `<button class="changePass" onclick="deletUser(${id})">Deletar Usuário</button>`;
  } else {
    document.querySelector(
      ".delete"
    ).innerHTML = `<button class="changePass" onclick="reactivate(${id})">Reativar Usuário</button>`;
  }
};

const deletUser = async (index) => {
  const nomeDel = document.getElementById("userName").textContent;

  let confirmacao = confirm(`Deseja deletar o usuário ${nomeDel}?`);
  if (confirmacao == true) {
    const responseSM = await fetch(`http://localhost:1313/perfildel/${index}`);
    const data = await responseSM.json();

    if (data.status == 200) {
      alert("Usuário excluido com sucesso!");
      location.reload();
    }
  }
};

const reactivate = async (index) => {
  const nomeDel = document.getElementById("userName").textContent;

  let confirmacao = confirm(`Deseja reativar o usuário ${nomeDel}?`);
  if (confirmacao == true) {
    const responseSM = await fetch(
      `http://localhost:1313/perfilreative/${index}?`
    );
    const data = await responseSM.json();

    if (data.status == 200) {
      alert("Usuário reativado com sucesso!");
      location.reload();
    }
  }
};
