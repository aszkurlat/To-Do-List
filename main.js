const form = document.querySelector('form');
const ul = document.querySelector('ul');
let taskNumber = document.querySelector('span');
const tasksList = document.getElementsByClassName('task');
const input = document.querySelector('input');
const searchInput = document.querySelector('input.search');
let toDoList = [];

const removeTask = (e) => {
    const index = e.target.parentNode.dataset.key;
    toDoList.splice(index, 1);
    taskNumber.textContent = toDoList.length;
    renderList();
}

const addTask = (e) => {
    e.preventDefault();
    const taskTitle = input.value;
    if (taskTitle === "") return;
    let task = document.createElement('li');
    task.className = "task";
    task.innerHTML = taskTitle + " <button>Delete</button>"
    toDoList.push(task);
    renderList();
    ul.appendChild(task);
    input.value = "";
    taskNumber.textContent = tasksList.length;
    task.querySelector("button").addEventListener('click', removeTask);
}
const renderList = () => {
    ul.textContent = "";
    toDoList.forEach((task, key) => {
        task.dataset.key = key;
        ul.appendChild(task);
    })
}
const searchTask = (e) => {
    const searchText = e.target.value.toLowerCase();
    let tasks = toDoList;
    tasks = tasks.filter(li => li.textContent.toLowerCase().includes(searchText));
    ul.textContent = "";
    tasks.forEach(li => ul.appendChild(li));
}
searchInput.addEventListener('input', searchTask)
form.addEventListener('submit', addTask);
