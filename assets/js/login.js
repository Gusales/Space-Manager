let iptLog = document.getElementById("rm");
let iptPass = document.getElementById("senha");
let iptCap = document.getElementById("captchaI");
var captchaV = "";

let dicio = {
  admin: 00000,
  dev: 99999,
};

// CAPTCHA SYSTEM!!
var allV = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9",
];
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
  if (iptCap.value.toUpperCase() == "") {
    alert("Captcha Não preenchido!");
    captchaV = "";
    loadCap();
  } else if (iptCap.value.toUpperCase() != captchaV) {
    alert("Captcha Errado!");
    iptCap.value = "";
    captchaV = "";
    loadCap();
  } else {
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

    const responseSM = await fetch("http://192.168.0.16:1313/login", init);
    const data = await responseSM.json();
    console.log(data);

    if (data.mensage == "Acesso autorizado") {
      sessionStorage.setItem("thistoken", data.token);
      sessionStorage.setItem("Usuário", data.idUser);
      if (iptLog.value == dicio.admin || iptLog.value == dicio.dev) {
        location.href = "./lib/admin/home.html";
      } else {
        location.href = `./assets/html/calendar.html?user=${data.idUser}`;
      }
    } else {
    }
  }
};
function redirectLogin() {
  location.href = "../index.html";
}
