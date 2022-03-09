const taskInput = document.querySelector(".task-input");
const addTaskBtn = document.querySelector(".add-task-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

const deleteTask = (e) => {
  const task = e.target.parentElement;
  if (e.target.classList.contains("trash-btn")) {
    task.classList.add("fall-down");
    task.addEventListener("transitionend", () => {
      task.remove();
    });
  }
};

const editTask = (e) => {
  const task = e.target;
  const input = e.target.parentElement;
  if (
    task.innerHTML == `<i class="fas fa-edit"></i>` &&
    !e.target.parentElement.classList.contains("completed")
  ) {
    task.innerHTML = `<i class="fas fa-solid fa-thumbs-up"></i>`;
    input.firstChild.removeAttribute("readOnly");
    input.firstChild.focus();
    console.log(input);
  } else {
    task.innerHTML = `<i class="fas fa-edit"></i>`;
    input.firstChild.setAttribute("readOnly", true);
  }
};

const completeTask = (e) => {
  if (e.target.classList.contains("complete-btn")) {
    e.target.parentElement.classList.toggle("completed");
  }
};

const addTask = (e) => {
  e.preventDefault();
  const text = taskInput.value;
  if (text == "") alert("Please fill out the task");
  else {
    const div = document.createElement("div");
    div.className = "todo-task";

    const taskTitle = document.createElement("input");
    taskTitle.setAttribute("readonly", true);
    taskTitle.className = "todo-item";
    taskTitle.value = text;
    div.appendChild(taskTitle);

    const completeBtn = document.createElement("button");
    completeBtn.className = "complete-btn";
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';
    div.appendChild(completeBtn);

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    div.appendChild(editBtn);

    const trashBtn = document.createElement("button");
    trashBtn.className = "trash-btn";
    trashBtn.innerHTML = `<i class="fas fa-trash"></i>`;
    div.appendChild(trashBtn);

    todoList.appendChild(div);

    completeBtn.addEventListener("click", completeTask);
    editBtn.addEventListener("click", editTask);
    trashBtn.addEventListener("click", deleteTask);

    taskInput.value = "";
  }
};
const filterTodo = (e) => {
  let toDoList = todoList.childNodes;
  toDoList.forEach((task) => {
    switch (e.target.value) {
      case "all":
        task.style.display = "flex";
        break;
      case "completed":
        if (task.classList.contains("completed")) {
          task.style.display = "flex";
        } else {
          task.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!task.classList.contains("completed")) {
          task.style.display = "flex";
        } else {
          task.style.display = "none";
        }
        break;
    }
  });
};

addTaskBtn.addEventListener("click", addTask);
filterOption.addEventListener("click", filterTodo);
