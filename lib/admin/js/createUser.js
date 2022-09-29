// gerar senha automática com js  https://www.instagram.com/p/CiZvFVDjnBw/
function gerarPass() {
  const charset = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9",",",";",":","!","?",".","/","§","~","#","{","[","`","^","@","]","}","&","]",];
  var password = "";
    var passv1 = charset[Math.floor(Math.random() * charset.length)];
    var passv2 = charset[Math.floor(Math.random() * charset.length)];
    var passv3 = charset[Math.floor(Math.random() * charset.length)];
    var passv4 = charset[Math.floor(Math.random() * charset.length)];
    var passv5 = charset[Math.floor(Math.random() * charset.length)];
    var passv6 = charset[Math.floor(Math.random() * charset.length)];
    var passv7 = charset[Math.floor(Math.random() * charset.length)];
    var passv8 = charset[Math.floor(Math.random() * charset.length)];
      
    password = passv1 + passv2 + passv3 + passv4 + passv5 + passv6 + passv7 + passv8;
    document.getElementById("passGen").value = password
}


const cadUser = async () => {
    var nome = document.getElementById("nomeProfile").value
    var email = document.getElementById("emailProfile").value
    var rm = document.getElementById("rmProfile").value
    var num = document.getElementById("numProfile").value
    var pass = document.getElementById("passGen").value

    var foto = 'img1';
    var materia = 'teste1';

    const responseSM = await fetch(`http://192.168.0.17:1313/cad/${rm}/${nome}/${email}/${foto}/${materia}/`);
    const data = await responseSM.json()
    console.log(data);

    if (data.mensage == 'Usuário Cadastrado com Sucesso!') {
        alert(data.mensage)
        location.href = "professores.html"
    }
    else {
        alert(data.mensage)
    }
}