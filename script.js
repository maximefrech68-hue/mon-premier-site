const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const list = document.querySelector("#list");

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;

  const li = document.createElement("li");
  li.textContent = text;

  if (text.toLowerCase().includes("sport")) {
    li.style.fontWeight = "bold";
  }

  li.addEventListener("click", () => {
    li.classList.toggle("done");
    updateCounter(); // 👈 quand on coche / décoche
  });

  const delBtn = document.createElement("button");
  delBtn.textContent = "Supprimer";
  delBtn.style.marginLeft = "10px";

  delBtn.addEventListener("click", () => {
    li.remove();
    updateCounter(); // 👈 quand on supprime
  });

  li.appendChild(delBtn);
  list.appendChild(li);

  taskInput.value = "";
  taskInput.focus();

  updateCounter(); // 👈 quand on ajoute une tâche
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

function updateCounter() {
  const tasks = document.querySelectorAll("li");
  const doneTasks = document.querySelectorAll("li.done");
  const remaining = tasks.length - doneTasks.length;

  document.querySelector("#counter").textContent =
    "Tâches restantes : " + remaining;
}
const filterButtons = document.querySelectorAll("#filters button");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    applyFilter(filter);
  });
});

function applyFilter(filter) {
  const tasks = document.querySelectorAll("li");

  tasks.forEach((task) => {
    const isDone = task.classList.contains("done");

    if (filter === "all") {
      task.style.display = "list-item";
    }

    if (filter === "active") {
      task.style.display = isDone ? "none" : "list-item";
    }

    if (filter === "done") {
      task.style.display = isDone ? "list-item" : "none";
    }
  });
}
