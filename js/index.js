
var todoInputType = document.getElementById("todoInputType");
var todoInputDo = document.getElementById("todoInputDo");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");

var toDoList = [];

if (localStorage.getItem("todos") !== null) {
  toDoList = JSON.parse(localStorage.getItem("todos"));
  displayData();
}

function addTask() {
  if (validationName() == true && validationWhatDo() == true) {
    var task = {
      typeOfToDo: todoInputType.value,
      whatDo: todoInputDo.value,
    };

    toDoList.push(task);
    displayData();
    clearForm();
    localStorage.setItem("todos", JSON.stringify(toDoList));
  } else {
    console.log("ay 7aga");
  }
}

function displayData() {
  var cartona = "";

  for (var i = 0; i < toDoList.length; i++) {
    cartona += `
    <div class="card my-3">
    <div class="card-body d-flex justify-content-between align-items-center">
    <div class="card-content">
      <h4 class="card-title">${toDoList[i].typeOfToDo}</h4>
      <p class="card-text">${toDoList[i].whatDo}</p>
    </div>
      <div class="icon-group fs-3">
        <i onclick="deleteToDo(${i})" class="fa-regular fa-trash-can pe-3 text-danger"   ></i>
        <i onclick="setUpdataData(${i})" class="fa-solid fa-pen-to-square text-success"  ></i>
      </div>
    </div>
  </div>
    `;
  }
  document.getElementById("toDoListData").innerHTML = cartona;
}

function clearForm() {
  todoInputType.value = "";
  todoInputDo.value = "";

  todoInputType.classList.remove("is-valid");
  todoInputDo.classList.remove("is-valid");
}

function deleteToDo(index) {
  toDoList.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(toDoList));
  displayData();
}

function SearchByType(term) {
 

  var cartona = "";

  for (var i = 0; i < toDoList.length; i++) {
    if (toDoList[i].typeOfToDo.toLowerCase().includes(term.toLowerCase())) {
      cartona += `
      <div class="card my-3">
      <div class="card-body d-flex justify-content-between align-items-center">
      <div class="card-content">
        <h4 class="card-title">${toDoList[i].typeOfToDo}</h4>
        <p class="card-text">${toDoList[i].whatDo}</p>
      </div>
        <div class="icon-group fs-3">
          <i onclick="deleteToDo(${i})" class="fa-regular fa-trash-can pe-3 text-danger"   ></i>
          <i onclick="setUpdataData(${i})" class="fa-solid fa-pen-to-square text-success"  ></i>
        </div>
      </div>
    </div>
      `;
    }
  }
  document.getElementById("toDoListData").innerHTML = cartona;
}

var updatedIndex = 0;
function setUpdataData(index) {
  updatedIndex = index;
  todoInputType.value = toDoList[index].typeOfToDo;
  todoInputDo.value = toDoList[index].whatDo;

  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
}

function updateTask() {
  if (validationName() == true && validationWhatDo() == true) {
    var taskUpdated = {
      typeOfToDo: todoInputType.value,
      whatDo: todoInputDo.value,
    };

    toDoList.splice(updatedIndex, 1, taskUpdated);
    localStorage.setItem("todos", JSON.stringify(toDoList));
    displayData();
    clearForm();

    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
  } else {
    console.log("ay 7aga");
  }
}

function validationName() {
  var toDoTypeMsg = document.getElementById("toDoTypeMsg");
  var regex = /^[A-Z][a-z]{3,8}$/;
  var text = todoInputType.value;

  if (regex.test(text) == true) {
    todoInputType.classList.add("is-valid");
    todoInputType.classList.remove("is-invalid");
    toDoTypeMsg.classList.add("d-none");
    return true;
  } else {
    todoInputType.classList.add("is-invalid");
    todoInputType.classList.remove("is-valid");
    toDoTypeMsg.classList.remove("d-none");
    return false;
  }
}
function validationWhatDo() {
  var toDoWhatDoMsg = document.getElementById("toDoWhatDoMsg");
  var regex = /^.{3,25}$/;
  var text = todoInputDo.value;

  if (regex.test(text) == true) {
    todoInputDo.classList.add("is-valid");
    todoInputDo.classList.remove("is-invalid");
    toDoWhatDoMsg.classList.add("d-none");
    return true;
  } else {
    todoInputDo.classList.add("is-invalid");
    todoInputDo.classList.remove("is-valid");
    toDoWhatDoMsg.classList.remove("d-none");
    return false;
  }
}


