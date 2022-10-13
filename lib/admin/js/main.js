const authen = async () => {
  const token = sessionStorage.getItem("thistoken");
  const user = sessionStorage.getItem("Usuário");
  const init = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "x-acess-token": token,
    },
  };
  const responseSM = await fetch("http://192.168.0.16:1313/authen", init);
  const data = await responseSM.json();

  if (data.mensage == 'Token válido') {

    if (data.userID != user) {
      alert("Usuário não autorizado")
      location.href = 'http://192.168.0.16/Space-Manager/index.html'
    }
  }
  else {
    alert('Você não tem permissão para está aqui!')
    location.href = 'http://192.168.0.16/Space-Manager/index.html'
  }
};
authen();


function openM() {
  let dropMenu = document.querySelector(".dropdownMenu")
  let dropProf = document.querySelector(".dropdownMenuProf")
  dropMenu.classList.add('show')
  dropProf.classList.add('show')
}

function quitDrop() {
  let dropMenu = document.querySelector(".dropdownMenu")
  let dropProf = document.querySelector(".dropdownMenuProf")
  dropMenu.classList.remove('show')
  dropProf.classList.remove('show')
}