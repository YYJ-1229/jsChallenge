//todo
const todoForm = document.getElementById("todo-form");
const todoInput = todoForm.querySelector("input");
const todoList = document.getElementById("todo-list");

let todos = [];
const TODO_KEY = "todos";

function saveToDos() {
  localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}

function deleteToDo(event) {
  const tr = event.target.parentElement.parentElement.parentElement;
  if (tr.id !== "todo-list") {
    console.log(tr);
    tr.remove();
    todos = todos.filter((item) => item.id !== Number(tr.id));
    saveToDos();
  }
}

function statusTodo(event) {
  let tr = event.target.parentElement.parentElement.parentElement;
  let button = event.target.parentElement;
  let img = event.target;

  if (button.name === "done") {
    button.name = "yet";
    img.src = "/src/asset/yet.svg";
  } else {
    img.src = "src/asset/done.svg";
    button.name = "done";
  }
  button.appendChild(img);

  todos = todos.map((item, index) => {
    if (item.id === Number(tr.id)) {
      item.status = button.name;
    }
    return item;
  });
  saveToDos();
}

function paintToDo(newTodoObj) {
  const tr = document.createElement("tr");
  tr.id = newTodoObj.id;

  const tdStatus = document.createElement("td");
  const stateButton = document.createElement("button");
  stateButton.name = newTodoObj.status;
  const stateImage = document.createElement("img");
  stateImage.src = `/src/asset/${newTodoObj.status}.svg`;
  stateButton.appendChild(stateImage);
  stateButton.classList.add("checkbox");
  tdStatus.appendChild(stateButton);
  tdStatus.classList.add("box");

  stateButton.addEventListener("click", statusTodo);

  const tdToDo = document.createElement("td");
  tdToDo.innerText = newTodoObj.text;
  tdToDo.classList.add("todo");

  const tdDelete = document.createElement("td");
  const deleteButton = document.createElement("button");
  const deleteImage = document.createElement("img");
  deleteImage.src = "/src/asset/shovel.svg";
  deleteImage.classList.add("img");
  deleteButton.appendChild(deleteImage);
  deleteButton.classList.add("checkbox");
  tdDelete.appendChild(deleteButton);
  tdDelete.classList.add("box");

  deleteButton.addEventListener("click", deleteToDo);

  tr.appendChild(tdStatus);
  tr.appendChild(tdToDo);
  tr.appendChild(tdDelete);
  todoList.appendChild(tr);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newToDo = todoInput.value;
  todoInput.value = "";

  const newTodoObj = {
    id: Date.now(),
    text: newToDo,
    status: "yet"
  };
  paintToDo(newTodoObj);
  todos.push(newTodoObj);
  saveToDos();
}

todoForm.addEventListener("submit", handleToDoSubmit);

const savedTodos = localStorage.getItem(TODO_KEY);

function printTodos(item) {
  paintToDo(item);
}

if (savedTodos !== null) {
  const parsedToDos = JSON.parse(savedTodos);
  todos = parsedToDos;
  parsedToDos.forEach(printTodos);
}
