const urlParams = new URLSearchParams(window.location.search);
const idParam = urlParams.get('user')
    

const saveRes = async () => {
    const resProfSM = await fetch(`https://space-manager-api.herokuapp.com/prof/${idParam}`)
    const profSM = await resProfSM.json()

    var space = document.getElementById("space").value
    var horaIni = document.querySelector('.horarioSM').textContent
    var horaFim = document.querySelector('.horarioSM2').textContent
    var mat = document.querySelector('.materiaSM').textContent
    var turma = document.getElementById('turma').value
    var descri = document.getElementById('descri').value
    const dateRes = document.querySelector('.event-header').textContent


  const log = {
    user: profSM.namecCad,
    curso: turma,
    materia: mat,
    horaIni: horaIni,
    horaFim: horaFim,
    data: dateRes,
    space: space,
    descri: descri,
    state: "yellow",
    };

    const init = {
        method: 'POST',
        headers: {
            "content-Type": "application/json"
        },
        body: JSON.stringify(log)
    }

    const responseSM = await fetch('https://space-manager-api.herokuapp.com/reservas', init);
    const data = await responseSM.json()
    alert(data.mensage)
    location.reload()
};