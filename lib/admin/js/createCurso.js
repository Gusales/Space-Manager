const url = "https://space-manager-api.herokuapp.com";
let counter = 0;
const addCurso = async () => {
  const curso = {
    curso: document.getElementById("addCurso").value,
  };
  const init = {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(curso),
  };

  const responseSM = await fetch(`${url}/cursos`, init);
  const data = await responseSM.json();
  console.log(data);
  alert(data.mensage);

  clear();
};

const addMat = async () => {
  const materia = {
    materia: document.getElementById("addMateria").value,
  };
  const init = {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(materia),
  };

  const responseSM = await fetch(`${url}/materias`, init);
  const data = await responseSM.json();
  console.log(data);
  alert(data.mensage);

  clear();
};

const addHora = async () => {
  const horario = {
    horario: document.getElementById("addHora").value,
  };
  const init = {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(horario),
  };

  const responseSM = await fetch(`${url}/hora`, init);
  const data = await responseSM.json();
  console.log(data);
  alert(data.mensage);

  clear();
};

const addSpace = async () => {
  const space = {
    espaco: document.getElementById("addSpace").value,
  };
  const init = {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(space),
  };

  const responseSM = await fetch(`${url}/space`, init);
  const data = await responseSM.json();
  console.log(data);
  alert(data.mensage);

  clear();
};

function clear() {
  document.getElementById("addMateria").value = "";
  document.getElementById("addHora").value = "";
  document.getElementById("addCurso").value = "";
  document.getElementById("addSpace").value = "";
}

function addNCurso() {
  counter++;
  document.querySelector(
    ".inputCurso"
  ).innerHTML += `<input type="text" style="margin-bottom: 5px;" name="cursos" id="addCurso${counter}">`;
}
function addNMat() {
  counter++;
  document.querySelector(
    ".inputMat"
  ).innerHTML += `<input type="text" style="margin-bottom: 5px;" name="cursos" id="addMat${counter}">`;
}
function addNHora() {
  counter++;
  document.querySelector(
    ".inputHora"
  ).innerHTML += `<input type="text" style="margin-bottom: 5px;" name="cursos" id="addHora${counter}">`;
}
function addNSpace() {
  counter++;
  document.querySelector(
    ".inputSpace"
  ).innerHTML += `<input type="text" style="margin-bottom: 5px;" name="cursos" id="addSpace${counter}">`;
}
