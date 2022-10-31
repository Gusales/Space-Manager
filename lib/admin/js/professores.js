const loadTable = async () => {
    document.getElementById("corpo").innerHTML = ""
    const respProf = await fetch("https://space-manager-api.herokuapp.com/prof");
    const data = await respProf.json();
    console.log(data.stateCad)
    for (let index = 1; index < data.length; index++) {

        if (data[index].stateCad == true) {
            document.getElementById("corpo").innerHTML += `
        <tr>
        <th scope="row" class="colTab colTabRM" id="colTab${index}">${data[index].rmCad}</th>
        <td><img src="../img/userPhoto.png" alt="Foto do usuário" class="tableIMG"></td>
        <td class="colTab${index} colTabName">${data[index].namecCad}</td>
        <td class="emailTab">${data[index].emailCad}</td>
        <td><i class="fa-solid fa-user-pen" onclick="seachProfRM(${data[index].rmCad})" ></i><i class="fa-solid fa-trash" onclick="deletUser(${index})"></i></td>
      </tr>
      `
        
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
        const responseSM = await fetch(`https://space-manager-api.herokuapp.com/perfildel/${usetDel}`);
        const data = await responseSM.json();

        if (data.status == 200) {
            alert("Usuário excluido com sucesso!")
            location.reload()
        }
    }
    
}