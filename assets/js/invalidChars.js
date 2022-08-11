var inputBox = document.getElementById("rm");
var invalidChars = ["-", "+", "e", "."]; //OS CARACTERES ~, ^ E AFINS TBM APARECEM, MAS NÃO CONSEGUI REMOVER ELES.

inputBox.addEventListener("keydown", function (e) {
  if (invalidChars.includes(e.key)) {
    e.preventDefault();
  }
});