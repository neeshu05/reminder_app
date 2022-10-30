
let toDoInput; //miejsce, gdzie użytkownik wpisuje treść zadania
let errorInfo; //info o braku zadań / konieczności wpisania tekstu
let addBtn; //przycisk ADD - dodaje nowe elementy do listy
let ulList; //lista zadań, taki UL
let newToDo; //nowo dodane li, nowe zadanie

let popup; //popup
let popupInfo; //test w popupie, jak sie doda pisty teskst
let todoToEdit; //edytowany Todo
let popupInput; //input w popupie
let popupAddBtn; //przycisk 'zatwierdz' w popupie
let popupCloseBtn; //przycisk 'anuluj' w popupie

const main = () => {
    
    prepareDOMElements();
    prepareDOMEvents();
}

const prepareDOMElements = () => {
    toDoInput = document.querySelector('.todo-input');
    errorInfo = document.querySelector('.error-info');
    addBtn = document.querySelector('.btn-add');
    ulList = document.querySelector('.todolist ul');

    popup = document.querySelector('.popup');
    popupInfo = document.querySelector('.popup-info');
    popupInput = document.querySelector('.popup-input');
    popupAddBtn = document.querySelector('.accept');
    popupCloseBtn = document.querySelector('.cancel');
}

const prepareDOMEvents = () => {
    
    addBtn.addEventListener('click',addNewToDo);
    ulList.addEventListener('click', checkClick);
    popupCloseBtn.addEventListener('click', closePopup);
    popupAddBtn.addEventListener('click', changeTodoText);
    toDoInput.addEventListener('keyup', enterKeyCheck);
}





const addNewToDo = () => {
    if (toDoInput.value != ''){

        localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), { task: toDoInput.value, completed: false }]));
        newToDo = document.createElement('li');
        
        
        let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
        tasks.forEach(task => {
        newToDo.textContent = task.task;
        createToolAreal();
        ulList.append(newToDo);
    });
        
        
        toDoInput.value = '';
        errorInfo.textContent = '';
    } else {
        errorInfo.textContent = 'Successfully added the item to the list';
    }
}

const createToolAreal = () => {
 
    const div = document.createElement('div');
    div.classList.add('tools');
    newToDo.append(div);

    const buttonDone = document.createElement('button');
    buttonDone.classList.add('complete');
    buttonDone.innerHTML = '<i class="fas fa-check"></i>'

    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add('edit');
    buttonEdit.textContent = 'EDIT';

    const buttonCancel = document.createElement('button');
    buttonCancel.classList.add('delete');
    buttonCancel.innerHTML = '<i class="fas fa-times"></i>'

    div.append(buttonDone, buttonEdit, buttonCancel);
}

const checkClick = (e) => {
    if(e.target.matches('.complete')){
        e.target.closest('li').classList.toggle('completed'); 
        e.target.classList.toggle('completed');

    } else if (e.target.matches('.edit')) {
        editToDo(e);

    } else if (e.target.matches('.delete')) { 
        deleteToDo(e);
    }
}

const editToDo = (e) => { 
    todoToEdit = e.target.closest('li'); 
    popupInput.value = todoToEdit.firstChild.textContent;  
    popup.style.display = 'flex';
}

const closePopup = () => {
    popup.style.display = 'none';
    popupInfo.textContent = '';
}

const changeTodoText = () => {
    if (popupInput.value != '') {
        todoToEdit.firstChild.textContent = popupInput.value;

        popup.style.display = 'none';
        popupInfo.textContent = '';
    } else {
        popupInfo.textContent = 'successfully added the item to the list';
    }
}

const deleteToDo = (e) => {
    e.target.closest('li').remove(); //style.display = 'none' 

    const allToDos = ulList.querySelectorAll('li');
    if (allToDos.length == 0) {
        errorInfo.textContent = 'List is empty'
    }
}

const enterKeyCheck = (e) => {
    if(e.key == 'Enter'){
        addNewToDo();
    }
}




document.addEventListener('DOMContentLoaded', main);


let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
tasks.forEach(task => {
    console.log(task.task);
})
