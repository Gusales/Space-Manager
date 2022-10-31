const getSpace = async () => {
  const resp = await fetch(`https://space-manager-api.herokuapp.com/space`);
  const data = await resp.json();
  console.log(data);

  for (let index = 0; index < data.length; index++) {
    document.getElementById("espaco").innerHTML += `
    <option value="${data[index].espEspa}">${data[index].espEspa}</option>
    `
  }
};

document.getElementById("espaco").addEventListener("change", async () => {
  const theList = document.getElementById("list")
  theList.innerHTML = ''
  const thisSpace = document.getElementById("espaco").value
  const log = {
    room: thisSpace
  };

  const init = {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(log),
  };
  const resp = await fetch(`https://space-manager-api.herokuapp.com/list`, init);
  const respSM = await resp.json();
  console.log(respSM);


  if (respSM.mensage) {
    alert("Não há nenhuma reserva para essa sala!")
  }
  else {
    for (let index = 0; index < respSM.length; index++) {
      theList.innerHTML += `
      <li class="list-group-item"><b>${respSM[index].horaResDe} até ${respSM[index].horaResAte}</b> - ${respSM[index].userRes}</li>
      `
    }
  }
})