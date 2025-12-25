const gerarPass = async () => {
  const charset = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "#",
    "@",
    "&",
    "%",
    "$",
  ];
  var password = "";
  for (let index = 0; index < 8; index++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }

  cadUser(password);
};

const cadUser = async (pass) => {
  var nome = String(document.getElementById("nomeProfile").value);
  var email = document.getElementById("emailProfile").value;
  var rm = document.getElementById("rmProfile").value;
  var num = String(document.getElementById("numProfile").value);
  var type = document.getElementById("mtProfile").value;

  if (type === "Selecionar o Tipo de Usuário") {
    const infoUser = [nome, email, rm, num, ""];
    cadmat(infoUser);
  } else if (type === "coord") {
    const user = {
      rm: rm,
      nome: nome,
      email: email,
      senha: pass,
      tel: num,
      type: type,
      materias: "all",
      state: true,
    };

    const init = {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    const responseSM = await fetch("http://localhost:1313/cad", init);
    const data = await responseSM.json();
    if (data.mensage == "Usuário Cadastrado com Sucesso!") {
      alert(data.mensage);
      location.href = "professores.html";
    } else {
      alert(data.mensage);
    }
  } else if (type === "admin") {
    const user = {
      rm: rm,
      nome: nome,
      email: email,
      senha: pass,
      tel: num,
      type: type,
      materias: "none",
      state: true,
    };

    const init = {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    const responseSM = await fetch("http://localhost:1313/cad", init);
    const data = await responseSM.json();
    if (data.mensage == "Usuário Cadastrado com Sucesso!") {
      alert(data.mensage);
      location.href = "professores.html";
    } else {
      alert(data.mensage);
    }
  } else if (type === "prof") {
    localStorage.setItem("nome", nome);
    localStorage.setItem("rm", rm);
    localStorage.setItem("email", email);
    localStorage.setItem("num", num);
    localStorage.setItem("type", type);
    localStorage.setItem("pass", pass);
    const infoUser = [nome, email, rm, num, type, pass];
    cadmat(infoUser);
  }
};

const cadmat = async (infoUser) => {
  const infoForUser = ["nome", "email", "rm", "num", "tipo", "senha"];
  const falta = [];
  for (let index = 0; index < infoUser.length; index++) {
    if (infoUser[index] === "") {
      falta.push(infoForUser[index]);
    } else {
    }
  }
  if (falta.length == 0) {
    const infoItemSelect = await fetch(`http://localhost:1313/materias`);
    const resp = await infoItemSelect.json();
    document.querySelector(
      ".mainContainer"
    ).innerHTML = `<h2 class="titleProfile">Cadastrar Matérias</h2><br> <div class="list"><ul class="list-group"></ul></div> <div class="controllers">
    <button type="submit" id="saveButton" class="saveBtn" onclick="cadastrar()"><i class="fa-solid fa-floppy-disk"></i></button>
    <button id="cancelButton" onclick="location.reload()"><i class="fa-solid fa-xmark"></i></button>
  </div>`;

    for (let index = 0; index < resp.length; index++) {
      document.querySelector(".list-group").innerHTML += `
       <div class="input-group mb-3">
       <div class="input-group-text">
         <input id="mat${index}" class="form-check-input mt-0 checkIpt" type="checkbox" value="${resp[index].idMat}" aria-label="Checkbox for following text input">
       </div>
       <input type="text" class="form-control" aria-label="Text input with checkbox" value="${resp[index].matsMat}" disabled>
     </div>    
    `;
    }
  } else {
    alert(`Falta as seguintes informações para serem preenchidas! ${falta}`);
  }
};
// document.querySelector('.saveBtn').addEventListener('click', cadastrar())

const cadastrar = async () => {
  const nome = localStorage.getItem("nome");
  const email = localStorage.getItem("email");
  const num = localStorage.getItem("num");
  const type = localStorage.getItem("type");
  const pass = localStorage.getItem("pass");
  const rm = localStorage.getItem("rm");

  const matProf = [];

  const infoItemSelect = await fetch(`http://localhost:1313/materias`);
  const resp = await infoItemSelect.json();
  for (let index = 0; index < resp.length; index++) {
    if (document.getElementById(`mat${index}`).checked === true) {
      matProf.push(document.getElementById(`mat${index}`).value);
    }
  }
  const user = {
    rm: String(rm),
    nome: nome,
    email: email,
    senha: pass,
    tel: num,
    type: type,
    materias: matProf,
    state: true,
  };

  const init = {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  const responseSM = await fetch("http://localhost:1313/cad", init);
  const data = await responseSM.json();
  if (data.mensage == "Usuário Cadastrado com Sucesso!") {
    alert(data.mensage);
    location.href = "professores.html";
  } else {
    alert(data.mensage);
  } 
};
