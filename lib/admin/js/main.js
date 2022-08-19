function openM() {
  let dropMenu = document.querySelector(".dropdownMenu")
  dropMenu.classList.add('show')
}

function quitDrop() {
  let dropMenu = document.querySelector(".dropdownMenu")
  dropMenu.classList.remove('show')
}

// USANDO JQUERY PRA DEIXAR OS INPUTS BONITINHOS
// $(document).ready(() => {
//   $('#numProfile').inputmask('(99)99999-9999')
// });
