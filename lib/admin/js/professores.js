const loadTable = async () => {
    const responseSM = await fetch("http://192.168.0.16:1313/prof");
    const data = await responseSM.json();
    console.log(data.stateCad)
    for (let index = 0; index < data.length; index++) {

        if (data[index].stateCad == true) {
            document.getElementById("corpo").innerHTML += `
        <tr>
        <th scope="row" class="colTab" id="colTab${index}">${data[index].rmCad}</th>
        <td><img src="../img/userPhoto.png" alt="Foto do usuário" class="tableIMG"></td>
        <td class="colTab${index}">${data[index].namecCad}</td>
        <td>${data[index].emailCad}</td>
        <td><i class="fa-solid fa-user-pen"></i><i class="fa-solid fa-trash" onclick="deletUser(${index})"></i></td>
      </tr>`
        
        document.querySelector(".list-group").innerHTML += `<li class="list-group-item">${data[index].namecCad}</li>`
        }
    }
}

const deletUser = async (index) => {
    const idUser = "colTab" + index
    const usetDel = document.getElementById(idUser).textContent
    const nomeDel = document.querySelector(`.${idUser}`).textContent

    let confirmacao = confirm(`Deseja deletar o usuário ${nomeDel}`)
    if (confirmacao == true) {
        const responseSM = await fetch(`http://192.168.0.16:1313/perfildel/${usetDel}`);
        const data = await responseSM.json();

        if (data.status == 200) {
            alert("Usuário excluido com sucesso!")
            location.reload()
        }
    }
    
}