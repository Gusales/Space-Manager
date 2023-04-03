const loadSpace = async () => {
    const getSpace = await fetch("http://localhost:1313/space");
    const respSpace = await getSpace.json();
    
    for (let index = 0; index < respSpace.length; index++) {
        document.getElementById('space').innerHTML += `<option value="${respSpace[index].espEspa}">${respSpace[index].espEspa}</option>`   
    }
}


const loadTurma = async () => {
    const getCursos = await fetch("http://localhost:1313/cursos");
    const respCursos = await getCursos.json();


    for (let index = 0; index < respCursos.length; index++) {
        document.getElementById('turma').innerHTML += `<option value="${respCursos[index].curCurs}">${respCursos[index].curCurs}</option>`
    }
}
const loadMat = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("user");
    const resProfSM = await fetch(`http://localhost:1313/prof/${idParam}`);
    const profSM = await resProfSM.json();

  
    if (profSM.typeCad === 'prof') {
        const getMat = await fetch(`http://localhost:1313/loadMat/${idParam}`);
        const respMat = await getMat.json();


        for (let index = 0; index < respMat.length; index++) {
            document.getElementById('materia').innerHTML += `<option value="${respMat[index]}">${respMat[index]}</option>`
        }
    }
    else {
        const getMat = await fetch("http://localhost:1313/materias");
        const respMat = await getMat.json();


        for (let index = 0; index < respMat.length; index++) {
            document.getElementById('materia').innerHTML += `<option value="${respMat[index].matsMat}">${respMat[index].matsMat}</option>`
        }
    }
}