// ------------------- ISSO AQUI É PROS INPUTS MUDAREM!! -------------------
const modalBtn = document.querySelector('.modal-containerSM');
let sM = 0;
let hM = 0;
let mM = 0;
function modES(sM) {
    console.log(sM)
    document.querySelector(".spaceSM").innerHTML = document.querySelector(`.space${sM}`).textContent
}
function modMS(mM) {
    document.querySelector(".materiaSM").innerHTML = document.querySelector(`.matSM${mM}`).textContent
}   
function modCS(cM) {
    document.querySelector(".curSM").innerHTML = document.querySelector(`.cursoSM${cM}`).textContent
}   
function modHS(hM) {
    document.querySelector(".horarioSM").innerHTML = document.querySelector(`.hItemSM${hM}`).textContent
    var horaini = document.querySelector(`.horarioSM`).textContent

    document.querySelector('.horarioSM2').innerHTML = 'Horário'
    document.querySelector('.forDropHora2').innerHTML = ''
    console.log(horaini)
    carregar3(horaini)
}
  
function carregar3() {
    document.querySelector(".horario2").style.display = 'block'
    document.querySelector(".horarios").style = 'justify-content: space-around;'

    const loadHora2 = async (horaini) => {
        const respSM = await fetch("https://space-manager-api.herokuapp.com/hora");
        const data = await respSM.json();
        // const ini = document.getElementById("horarioSM").value
        var ini = document.querySelector(`.horarioSM`).textContent

        if (ini.length === 4) {
            ini = '0' + ini 
        }
        const newIni = ini.replace(/:/, ''); 

        console.log(newIni)
        console.log(ini)
        // console.log(data.length)
        
        for (let index = 0; index < data.length; index++) {
            if ((data[index].horsHora).length === 4) {
                (data[index].horsHora) = '0' + (data[index].horsHora)
            }
        const newData = (data[index].horsHora).replace(/:/, ''); 
        console.log(newData)
            if (newData > newIni) {
            document.querySelector(".forDropHora2").innerHTML += `
            <a class="dropdown-item hItemSM2${index}" href="#" id="horario${index}" onclick="modHS1(${index}), carregar4()">${data[index].horsHora}</a>
            `
        }
        }
        
    }
    loadHora2()
}


function modHS1(i) {
    document.querySelector(".horarioSM2").innerHTML = document.querySelector(`.hItemSM2${i}`).textContent
    carregar4()
}
// ------------------- APARECER O MODAL! -------------------
function openModal() {
    document.querySelector(".modal-containerSM").classList.add('animationModal')
}

function closeModal() {
    document.querySelector(".modal-containerSM").classList.remove('animationModal')
}

const form = document.getElementById("uploadImage")
form.addEventListener("submit", (e) => {
    e.preventDefault()
    const imageFile = document.getElementById("image-input")
    const data = new FormData()
    console.log(file.files[0])
})