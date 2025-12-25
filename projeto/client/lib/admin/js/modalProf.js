function openM() {
    let dropMenu = document.querySelector(".dropdownMenu")
    let dropProf = document.querySelector(".dropdownMenuProf")
    dropMenu.classList.add('show')
    dropProf.classList.add('show')
  }
  
  function quitDrop() {
    let dropMenu = document.querySelector(".dropdownMenu")
    let dropProf = document.querySelector(".dropdownMenuProf")
    dropMenu.classList.remove('show')
    dropProf.classList.remove('show')
  }
  