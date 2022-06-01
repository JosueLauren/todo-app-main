let header = document.querySelector('.header')
let imgTitle = document.querySelector('.container-todoList-title img')
let containerInputTodo = document.querySelector('.container-input-todo')
let inputTodoCircle = document.querySelector('.input-todo-circle')
let inputTodo = document.querySelector('.input-todo')
let todoItems = document.querySelectorAll('.todoItem')
let checkmark = document.querySelectorAll('.checkmark')
let footerTodoList = document.querySelector('.footer-todoList')
let divBtns = document.querySelector('.div-btns ')
let body = document.querySelector('body')
let todos = document.querySelector('.todos')
let qtdItems = document.querySelector('.qtdItems')

let List = JSON.parse(window.localStorage.getItem('todoList')) || []

renderTodoList(List)
atualizarThemeItens() 
setQtdItems() 

function alterTheme(){
    
    if(containerInputTodo.classList.contains('lightMode')){

        containerInputTodo.classList.remove('lightMode')
        inputTodoCircle.classList.remove('lightMode')
        inputTodo.classList.remove('lightMode')
        footerTodoList.classList.remove('lightMode')
        divBtns.classList.remove('lightMode')

        containerInputTodo.classList.add('darkMode')
        inputTodoCircle.classList.add('darkMode')
        inputTodo.classList.add('darkMode')
        footerTodoList.classList.add('darkMode')
        divBtns.classList.add('darkMode')

        todoItems.forEach(item => {
            item.classList.remove('lightMode')
            item.classList.add('darkMode')
        })

        checkmark.forEach(item => {
            item.classList.remove('lightMode')
            item.classList.add('darkMode')
        })

        header.classList.remove('headerLight')
        header.classList.add('headerDark')

        body.classList.remove('bodyLight')
        body.classList.add('bodyDark')

        imgTitle.src = './images/icon-sun.svg'


    } else {
        
        containerInputTodo.classList.add('lightMode')
        inputTodoCircle.classList.add('lightMode')
        inputTodo.classList.add('lightMode')
        footerTodoList.classList.add('lightMode')
        divBtns.classList.add('lightMode')

        containerInputTodo.classList.remove('darkMode')
        inputTodoCircle.classList.remove('darkMode')
        inputTodo.classList.remove('darkMode')
        footerTodoList.classList.remove('darkMode')
        divBtns.classList.remove('darkMode')

        todoItems.forEach(item => {
            item.classList.add('lightMode')
            item.classList.remove('darkMode')
        })

        checkmark.forEach(item => {
            item.classList.add('lightMode')
            item.classList.remove('darkMode')
        })

        header.classList.add('headerLight')
        header.classList.remove('headerDark')

        body.classList.add('bodyLight')
        body.classList.remove('bodyDark')

        imgTitle.src = './images/icon-moon.svg'
    }
}


function newTodo(event){
    if(event.key == 'Enter'){
       if(event.target.value.trim() == '') alert('Digite um valor')

       let todo = {
           id: List.length,
           completed: false,
           description: event.target.value
       }

       event.target.value = ''
       List.push(todo)
       renderTodoList(List)
       atualizarThemeItens() 
       setQtdItems() 
       window.localStorage.setItem('todoList', JSON.stringify(List))

    }
}

function renderTodoList(List){

  let = stringTodo = List.reduce((acc, elem) => {
     acc += `
        <div class="todoItem style-default lightMode" draggable='true' 
        ondragstart='handleDragStart(event)' 
        ondragend='handleDragEnd(event)' ondrop="drop(event)" ondragover="allowDrop(event)">
            <label class="container-checkbox">
                <input class="checkbox 
                ${elem.completed ? 'CompletedTodo' : ''}" 
                type="checkbox" 
                ${elem.completed ? 'checked' : ''} 
                onchange='marcarDesmarcarItem(event)'
                data-id='${elem.id}'>
                <span class="checkmark lightMode "></span>
            </label>
            <p class="description-todoItem ${elem.completed ? 'CompletedTodo' : ''} ">${elem.description}</p>
            <button class="btn-excluirTodo" data-id='${elem.id}' onclick='excluirTodo(event)'></button>
        </div>
    `
    return acc

    }, '')

    todos.innerHTML = stringTodo
}


function handleDragStart(event){
    event.target.style.opacity = '0.4'

    draScrEl = event.target

    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text', event.target.innerHTML)
}

function handleDragEnd(event){
    event.target.style.opacity = '1'
}

function allowDrop(event){
    event.preventDefault();
}

function drop(event){
    event.preventDefault()

    if(draScrEl !== event.target && event.target.getAttribute('draggable')) {
    draScrEl.innerHTML = event.target.innerHTML
     event.target.innerHTML = event.dataTransfer.getData('text')

    todoItems.forEach((todo, indice) => {
        let todoObj = {
            id: indice,
            completed: todo.children[0].children[0].checked ? true : false,
            description: todo.children[1].innerHTML
        }

        List[indice] = todoObj
    })

    renderTodoList(List)
    atualizarThemeItens() 
    setQtdItems()
}

    return false 
}

function excluirTodo(event){
    let idItem = Number(event.target.getAttribute('data-id'))
    console.log(List)
    List = List.filter(item => {
        return item.id !== idItem
    })

    renderTodoList(List)
    atualizarThemeItens()
    setQtdItems()
    window.localStorage.setItem('todoList', JSON.stringify(List))

}

function marcarDesmarcarItem(event){
    let idItem = event.target.getAttribute('data-id')

    List.forEach(item => {
        if(item.id == idItem) {
            item.completed = !item.completed
        }
    })
    renderTodoList(List)
    atualizarThemeItens()
    setQtdItems()
    window.localStorage.setItem('todoList', JSON.stringify(List))
    
}

function atualizarThemeItens(){
    todoItems = document.querySelectorAll('.todoItem')
    checkmark =  document.querySelectorAll('.checkmark')

    if(containerInputTodo.classList.contains('lightMode')){
         todoItems.forEach(item => {
         item.classList.add('lightMode')
         item.classList.remove('darkMode')
      })

         checkmark.forEach(item => {
         item.classList.add('lightMode')
         item.classList.remove('darkMode')
      })

    } else {
         todoItems.forEach(item => {
         item.classList.remove('lightMode')
         item.classList.add('darkMode')
      })

         checkmark.forEach(item => {
         item.classList.remove('lightMode')
         item.classList.add('darkMode')
      })
    }
}

function clearCompleted(){

    List = List.filter(item => !item.completed)

    renderTodoList(List)
    atualizarThemeItens()
    setQtdItems()
    window.localStorage.setItem('todoList', JSON.stringify(List))
}

function activeTodos(){

    let activeTodos = List.filter(item => !item.completed)

    renderTodoList(activeTodos)
    atualizarThemeItens()
    setQtdItems()
}

function allTodos(){

    renderTodoList(List)
    atualizarThemeItens()
    setQtdItems()
}

function completedTodos(){
    let CompletedTodos = List.filter(item => item.completed)

    renderTodoList(CompletedTodos)
    atualizarThemeItens()
    setQtdItems()
}

function setQtdItems(){
    qtdItems.textContent = `${List.length} items left`
}
