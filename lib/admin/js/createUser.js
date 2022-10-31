
// gerar senha automática com js  https://www.instagram.com/p/CiZvFVDjnBw/
const gerarPass = async() => {
  const charset = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9","#","@","&","%","$",];
  var password = "";
  for (let index = 0; index < 8; index++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }

  cadUser(password);
}

const cadUser = async (pass) => {
  var nome = document.getElementById("nomeProfile").value;
  var email = document.getElementById("emailProfile").value;
  var rm = document.getElementById("rmProfile").value;
  var num = document.getElementById("numProfile").value;

  const user = {
    rm: rm,
    nome: nome,
    email: email,
    senha: pass,
    tel: num,
    state: true,
  };

  const init = {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  // const responseSM = await fetch('https://space-manager-api.herokuapp.com/cad', init);
  const responseSM = await fetch("http://localhost:1313/cad", init);
  const data = await responseSM.json()
    if (data.mensage == "Usuário Cadastrado com Sucesso!") {
      alert(data.mensage);
      location.href = "professores.html";
    } else {
      alert(data.mensage);
    }
};

// rm: rm,
// nome: nome,
// email: email,
// senha: pass,
// foto: foto,
// materia: materia,
// state: true,
// tel: num
