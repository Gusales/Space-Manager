const modal = document.querySelector('.modal-container')


function openMenuModal() {
    modal.classList.add('active')
}
function quitMenuModal() {
    modal.classList.remove('active')
}
// PÁGINA DE PERFIL DO USUÁRIO
document.querySelector('.editConfigOff').style.display = "none";

document.querySelector('.fa-user-pen').addEventListener('click', () => {
    document.querySelector('.editConfigOff').style.display = "block";
    document.querySelector('.editConfigOn').style.display = "none";
    document.querySelector('#emailID').disabled = '';
    document.querySelector('#numID').disabled = '';
})

document.querySelector('.fa-check').addEventListener('click', () => {
    document.querySelector('#emailID').disabled = "disabled";
    document.querySelector('#numID').disabled = "disabled";
    document.querySelector('.editConfigOff').style.display = "none";
    document.querySelector('.editConfigOn').style.display = "block";
})

document.querySelector('.fa-trash').addEventListener('click', () => {
    document.getElementById('emailID').value = "";
    document.getElementById('numID').value = "";
})

// USANDO JQUERY PRA DEIXAR OS INPUTS BONITINHOS
$(document).ready(() => {
    $('#numID').inputmask('(99)99999-9999')
});
