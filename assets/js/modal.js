// ------------------- ISSO AQUI É PROS INPUTS MUDAREM!! -------------------
const modalBtn = document.querySelector('.modal-containerSM');
let sM = 0;
let hM = 0;
let mM = 0;
function modES(sM) {
    console.log(sM)
    document.querySelector(".spaceSM").innerHTML = document.querySelector(`.space${sM}`).textContent
}
function modHS(hM) {
    document.querySelector(".horarioSM").innerHTML = document.querySelector(`.hItemSM${hM}`).textContent
}
function modMS(mM) {
    document.querySelector(".materiaSM").innerHTML = document.querySelector(`.matSM${mM}`).textContent
}   


// ------------------- APARECER O MODAL! -------------------
function openModal() {
    document.querySelector(".modal-containerSM").classList.add('animationModal')
}

modalBtn.addEventListener('click', event => {
  console.log(`${event.target.className}`);
    if(event.target.classList == 'modal-containerSM animationModal'){
        document.querySelector(".modal-containerSM").classList.remove('animationModal');
        console.log('Piah') 
    }
    else{
        console.log("Bah")
    }

});

function closeModal() {
    document.querySelector(".modal-containerSM").classList.remove('animationModal')
}