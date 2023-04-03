const token = localStorage.getItem("token");
const mensages = "Você não tem permissão para estar aqui!";
const auth = async () => {
    if (token == "null") {
        alert("Você não tem permissão para estar aqui");
    }
    else {
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

        if (data.mensage != 'Token válido') {
            alert('Você não tem permissão para está aqui!')
            location.href = '../../index.html'
        }
        else {
        }
    }
};

const validation = async () => {
  const senha = document.getElementById("senha1").value;
  const pass = document.getElementById("senha2").value;
  if (senha == '' || pass == '') {
    alert('Preencha ambos os campos com uma senha!')
  }
  else {
    if (pass != senha) {
      alert("As senhas digitadas são diferentes!");
    } else {
      const urlParams = new URLSearchParams(window.location.search);
      const idParam = urlParams.get('user')  
      const log = {
          id: idParam,
          pass: pass
        }
        const init = {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "x-acess-token": token,
          },
          body: JSON.stringify(log),
        };
        const responseSM = await fetch("http://localhost:1313/change", init);
      const data = await responseSM.json();
      
      if (data.mensage == 'Senha modificada com sucesso!') {
        alert(data.mensage)
        const src = "http://127.0.0.1:5500/client"
        location.href = src
      }
    }
  }
}