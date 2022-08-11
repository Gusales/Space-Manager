let modal = document.getElementById("myModal");
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
  modal.style.display = "block";
}
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



function check() {
  var bloco1 = document.querySelector('.bloco1')
  var bloco2 = document.querySelector('.bloco2')
  bloco1.style.display = "none"
  bloco2.style.display = "block"
}


function description() {
  document.querySelector('.containerr').style.display = "block";
  document.querySelector('.mainContainer').style.height = "1050px"
  window.scrollTo(0, 100);
}
function fecharDescription() {
  document.querySelector('.containerr').style.display = "none";
  document.querySelector('.mainContainer').style.height = "950px"
  window.scrollTo(0, -100);
}

// SISTEMA DE LOGIN