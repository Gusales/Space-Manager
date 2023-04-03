const iptLog = document.getElementById("rm");
const iptPass = document.getElementById("senha");
const iptCap = document.getElementById("captchaI");
var captchaV = "";

//Caracteres inválidos para o rmInput
var inputBox = document.getElementById("rm");
var invalidChars = ["-", "+", "e", ".", ","]; //OS CARACTERES ~, ^ E AFINS TBM APARECEM, MAS NÃO CONSEGUI REMOVER ELES.

inputBox.addEventListener("keydown", function (e) {
  if (invalidChars.includes(e.key)) {
    e.preventDefault();
  }
});


// CAPTCHA SYSTEM!!
var allV = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9"];
const loadCap = async () => {
  sessionStorage.removeItem("thistoken");
  sessionStorage.removeItem("Usuário");
  iptLog.value = "";
  iptPass.value = "";
  var cVAl1 = allV[Math.floor(Math.random() * allV.length)];
  var cVAl2 = allV[Math.floor(Math.random() * allV.length)];
  var cVAl3 = allV[Math.floor(Math.random() * allV.length)];
  var cVAl4 = allV[Math.floor(Math.random() * allV.length)];
  var cVAl5 = allV[Math.floor(Math.random() * allV.length)];
  
  captchaV = cVAl1 + cVAl2 + cVAl3 + cVAl4 + cVAl5;
  document.getElementById("captchaV").innerHTML = captchaV;
};

const login = async () => {
  const infos = ['RM', 'SENHA'] 
  const ipts = []
  ipts.push(iptLog.value, iptPass.value)

  for (let index = 0; index < ipts.length; index++) {
    if (ipts[index] == '') {
      alert(`info ${infos[index]} não preenchida`)
    }
  }
  if (iptCap.value.toUpperCase() == "") {
    alert("Captcha Não preenchido!");
    captchaV = "";
    loadCap();
  } else if (iptCap.value.toUpperCase() != captchaV) {
    alert("Captcha Errado!");
    iptCap.value = "";
    captchaV = "";
    loadCap();
  }
  else if (iptLog.value == null || iptPass.value == null) {
    alert("Preencha as informações que faltam");
    iptCap.value = "";
    captchaV = "";
    loadCap();
  }
  else {
    iptCap.value = "";
    const loading = document.querySelector("button");
    loading.innerHTML = `<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>`;

    const log = {
      rm: iptLog.value,
      senha: iptPass.value,
    };
    const init = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(log),
    };

    const responseSM = await fetch("http://localhost:1313/login", init);
    const data = await responseSM.json();

    if (data.mensage == "Acesso autorizado") {
      if (data.status == false) {
        alert(
          "Você não tem permissão para acessar o sistema! Entre em contato com a coordenação da sua escola para poder ter acesso novamente."
        );
      } else {
        sessionStorage.setItem("thistoken", data.token);
        sessionStorage.setItem("Usuário", data.idUser);
        if (data.type === "admin") {
          location.href = "./lib/admin/";
        } else {
          location.href = `./assets/html/calendar.html?user=${data.idUser}`;
        }
      }
    } else {
      alert(data.mensage);
    }
    loading.innerHTML = `Login`;
  }
};
