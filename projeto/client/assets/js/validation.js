const validation = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get('user')
  var rm = ""
  var email = ""

  if (idParam) {
    rm = document.getElementById("userRM").textContent;
    rm = rm.replace("RM: ", "")
    email = document.getElementById("userEmail").textContent;
  }
  else {
    rm = document.getElementById("rm").value;
    email = document.getElementById("emailUser").value;
  }

  const info = [];
  const Info = ["RM", "E-mail"];
  let auth = 0;
  info.push(rm, email);
  for (let index = 0; index < info.length; index++) {
    if (info[index] === "") {
      alert(`Falta preencher uma informação: ${Info[index]}`);
      auth = 0;
    } else {
      auth++;
    }
  }
  if (auth == 2) {
    const log = {
      rm: rm,
      email: email,
    };
    const init = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(log),
    };

    const responseSM = await fetch(
      "http://localhost:1313/validationUser",
      init
    );
    const data = await responseSM.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("idUser", data.id)
    alert(data.mensage);
  }
};
