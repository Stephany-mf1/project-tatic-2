'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () =>{
    document.getElementById('modal')
    .classList.remove('active')
    clearFields()

} 

 const tempTutorial = {
    title: "Curso python",
    description: "Aprenda java e suas funcionalidades",
    published: false,
    createdAt: "2022-11-05T04:41:58.821Z",
    updatedAt: "2022-12,-05T04:41:58.821Z",
    id: "62c3c1161c3fff0016b8c6b"
 }  

 const getLocalStorage =() => JSON.parse(localStorage.getItem('db_tutorial')) ?? []
 const setLocalStorage = (dbTutorial) => localStorage.setItem('db_tutorial', JSON.stringify(dbTutorial))

 //deletando meu usuário
 const deleteTutorial = (index) =>{
    const dbTutorial  =readTutorial()
    dbTutorial.splice(index,1)
    setLocalStorage(dbTutorial)

 }

 //Editando Tutorial
 const updateTutorial= (index, tutorial) =>{
    const dbTutorial = readTutorial ()
    dbTutorial[index] = tutorial
    setLocalStorage(dbTutorial)
 }
//Mostrando os meus tutoriais
 const readTutorial = () => getLocalStorage();

//CRUD CRIAR UM NOVO TUTORIAL
const createTutorial = (tutorial) => {
    const dbTutorial = getLocalStorage ()
    dbTutorial.push(tutorial)
    setLocalStorage(dbTutorial)
}

const validadefields = () => {
    return document.getElementById('form').reportValidity() //essa função retorna verdadeiro se todas a regras forem cumpridas
}
const clearFields = () =>{
    const fields = document.querySelectorAll ('.modal-field')
    fields.forEach(field => field.value = "")
}
//interação com o layout
const saveTutorial = () =>{
    if(validadefields()){
        const tutorial = {
            title: document.getElementById('title').value,
            description : document.getElementById('description').value,
            published: document. getElementById ('published').value
        }
        const index = document.getElementById('title').dataset.index
        if(index == 'new'){
        createTutorial(tutorial)
        updateTable()
        closeModal()
        }else
        updateTutorial(index, tutorial)
        updateTable()
        closeModal()
    }
}
const createRow = (tutorial, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
    <td>${tutorial.title}</td>
    <td>${tutorial.description}</td>
    <td>${tutorial.published}</td>
    <td>${tutorial.createdAt}</td>
    <td>${tutorial.updatedAt}</td>  

    <td>
        <button type="button" class="button green" id="edit-${index}">editar</button>
        <button type="button" class="button red"id="delete-${index}">excluir</button>
    </td>
    `
    document.querySelector('#tbTutorial>tbody').appendChild(newRow)
}

const clearTable =() =>{
    const rows = document.querySelectorAll('#tbTutorial>tbody tr')
    rows.forEach(row =>row.parentNode.removeChild(row))
}
const updateTable =() =>{
    const dbTutorial= readTutorial ()
    clearTable()
    dbTutorial.forEach(createRow)

}
const fillFilds=(tutorial)=>{
    document.getElementById('title').value = tutorial.title
    document.getElementById('description').value = tutorial.description
    document.getElementById('published').value = tutorial.published
    document.getElementById('title').dataset.index = tutorial.index
}
const editTutorial = (index) =>{
    const tutorial = readTutorial()[index]
    tutorial.index = index
    fillFilds(tutorial)
    openModal()
}
const editDelete = (event) =>{
    if(event.target.type == 'button'){
    const [action, index] = event.target.id.split('-')
    if(action == 'edit'){
        editTutorial(index)
    }else{
        const tutorial = readTutorial()[index]
        const response = confirm(`Deseja realmente excluir tutorial? ${tutorial.title}`)
        if(response){
            deleteTutorial(index)
            updateTable()
        }
    }
    }
    
}
updateTable()
//Eventos
document.getElementById('cadastrarTutorial')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
.addEventListener('click', saveTutorial)
 
document.querySelector('#tbTutorial>tbody')
.addEventListener('click', editDelete)
// document.getElementById('voltar')
//     .addEventListener('click', window.location.href = "index.html")