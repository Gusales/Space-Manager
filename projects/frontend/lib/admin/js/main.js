const authen = async () => {
  const token = sessionStorage.getItem("thistoken");
  const user = sessionStorage.getItem("Usuário");
  
  const log = {
    idUser: user
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

  if (data.mensage == 'Token válido') {
    if (data.type != 'admin') {
      alert('Você não tem permissão para está aqui!')
      location.href = 'http://127.0.0.1:5500/client'
    }

    loadCalendar()
    loadTable()
  }
  else {
    alert('Você não tem permissão para está aqui!')
    location.href = 'http://127.0.0.1:5500/client'
  }
};

function logout() {
  const confirma = confirm('Clique em "ok" para desconectar da sua conta.')
  if (confirma == true) {
    sessionStorage.setItem("thistoken", "")
  sessionStorage.setItem("Usuário", "")
  location.href = 'http://127.0.0.1:5500/client'
  }
}