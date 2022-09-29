let iptLog = document.getElementById("rm");
let iptPass = document.getElementById("senha");
let iptCap = document.getElementById("captchaI");
var captchaV = "";

let dicio = {
  admin: 00000,
  dev: 00004
}

// CAPTCHA SYSTEM!!
var allV = [
    "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
    "0","1","2","3","4","5","6","7","8","9",
  ];
const loadCap = async () => {
  var cVAl1 = allV[Math.floor(Math.random() * allV.length)];
  var cVAl2 = allV[Math.floor(Math.random() * allV.length)];
  var cVAl3 = allV[Math.floor(Math.random() * allV.length)];
  var cVAl4 = allV[Math.floor(Math.random() * allV.length)];
  var cVAl5 = allV[Math.floor(Math.random() * allV.length)];

  captchaV = cVAl1 + cVAl2 + cVAl3 + cVAl4 + cVAl5;
  document.getElementById("captchaV").innerHTML = captchaV;
}

const redirecionar = async () => {
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
  else {
  const responseSM = await fetch(`http://192.168.0.17:1313/login/${iptLog.value}/${iptPass.value}`);
  const data = await responseSM.json()
  // console.log(data);
    alert(data.mensage)
  }
}
function redirectLogin() {
  location.href = "../index.html";
}
