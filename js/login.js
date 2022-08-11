let iptLog = document.getElementById("rm");
let iptPass = document.getElementById("senha");


function redirecionar() {
    if(iptLog.value == '0000'){
        if(iptPass.value == '1234'){
            location.href = "admin/home.html";
        }
        else{
            alert('Sua senha está errada Admin!')
        }
    }
    else if(iptLog.value == '' && iptPass.value == ''){
        alert('Por favor, preencha os campos')
    }
    else{
        location.href = "pags/calendar.html";
    }
}

function redirectLogin(){
    location.href = "../index.html";
}