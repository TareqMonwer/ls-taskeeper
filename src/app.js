// UI Variables
const form = document.getElementById("task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners
loadEventListeners();

// load all event listeners
function loadEventListeners() {
  // DOM Load event
  document.addEventListener("DOMContentLoaded", getTasks);
  // add task event
  form.addEventListener("submit", addTask);
  // remove task event
  taskList.addEventListener("click", removeTask);
  // clear tasks event
  clearBtn.addEventListener("click", clearTasks);
  // filter tasks event
  filter.addEventListener("keyup", filterTask);
}

// Get Tasks from localstorage
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function(task) {
    // create li element
    const li = document.createElement("li");
    li.className = "collection-item";
    // create text and append to li
    li.appendChild(document.createTextNode(task));
    // create new link element
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = "X";
    // append link to li
    li.appendChild(link);
    // append li to ul
    taskList.appendChild(li);
  });
}

// Add task input
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a Task");
  }

  // create li element
  const li = document.createElement("li");
  li.className = "collection-item";
  // create text and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // create new link element
  const link = document.createElement("a");
  link.className = "delete-item secondary-content";
  link.innerHTML = "X";
  // append link to li
  li.appendChild(link);

  // append li to ul
  taskList.appendChild(li);
  // store task in localstorage
  storeTaskInLocalStorage(taskInput.value);
  // clear input
  taskInput.value = "";
  e.preventDefault();
}

// Add task to localstorage
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove a task
function removeTask(e) {
  if (e.target.classList.contains("delete-item")) {
    e.target.parentElement.remove();
    // remove from ls
    removeTaskFromLocalStorage(e.target.parentElement);
  }
}

// Remove from ls
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task, index) {
    if (task === taskItem.firstChild.textContent) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks(e) {
  if (confirm("Are you sure?")) {
    // taskList.innerHTML = "";
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }

    localStorage.clear();
  }
}

// Filter Task
function filterTask(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
