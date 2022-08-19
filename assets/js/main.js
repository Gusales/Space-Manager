// PÁGINA DE PERFIL DO USUÁRIO
document.querySelector('.controllers').style.display = "none";

document.querySelector('#saveButton').addEventListener('click', () => {
    document.querySelector('.controllers').style.display = "block";
    document.querySelector('#saveButton').style.display = "none";
    document.querySelector('input').disabled = '';
    document.querySelector('#emailProfile').disabled = '';
    document.querySelector('#rmProfile').disabled = '';
    document.querySelector('#matProfile').disabled = '';
    document.querySelector('#numProfile').disabled = '';
})

document.querySelector('.fa-floppy-disk').addEventListener('click', () => {
    document.querySelector('input').disabled = "disabled";
    document.querySelector('#emailProfile').disabled = "disabled";
    document.querySelector('#rmProfile').disabled = "disabled";
    document.querySelector('#matProfile').disabled = "disabled";
    document.querySelector('#numProfile').disabled = "disabled";
    document.querySelector('.controllers').style.display = "none";
    document.querySelector('#saveButton').style.display = "block";
})

document.querySelector('.fa-xmark').addEventListener('click', () => {
    document.getElementById('emailID').value = "";
    document.getElementById('numID').value = "";
})

// USANDO JQUERY PRA DEIXAR OS INPUTS BONITINHOS
$(document).ready(() => {
    $('#numProfile').inputmask('(99)99999-9999')
});
