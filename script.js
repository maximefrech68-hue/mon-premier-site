const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const list = document.querySelector("#list");

function updateCounter() {
  const tasks = list.querySelectorAll("li");
  const doneTasks = list.querySelectorAll("li.done");
  const remaining = tasks.length - doneTasks.length;

  const counter = document.querySelector("#counter");
  if (counter) {
    counter.textContent = "Tâches restantes : " + remaining;
  }
}

function saveTodos() {
  localStorage.setItem("todos", list.innerHTML);
}

function loadTodos() {
  const saved = localStorage.getItem("todos");
  if (saved) {
    list.innerHTML = saved;
  }
  updateCounter();
}

// ✅ Ajout d’une tâche
function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;

  const li = document.createElement("li");
  li.textContent = text;

  if (text.toLowerCase().includes("sport")) {
    li.style.fontWeight = "bold";
  }

  const delBtn = document.createElement("button");
  delBtn.textContent = "Supprimer";
  delBtn.style.marginLeft = "10px";
  li.appendChild(delBtn);

  list.appendChild(li);

  taskInput.value = "";
  taskInput.focus();

  updateCounter();
  saveTodos();
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

// ✅ Event delegation : gère clic sur LI et clic sur bouton supprimer (même après load)
list.addEventListener("click", (e) => {
  const target = e.target;

  // Si on clique sur un bouton supprimer
  if (target.tagName === "BUTTON") {
    const li = target.closest("li");
    if (!li) return;

    li.remove();
    updateCounter();
    saveTodos();
    return;
  }

  // Sinon, si on clique sur un LI (ou dedans), on toggle done
  const li = target.closest("li");
  if (!li) return;

  li.classList.toggle("done");
  updateCounter();
  saveTodos();
});

// ✅ Filtres
const filterButtons = document.querySelectorAll("#filters button");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    applyFilter(filter);
  });
});

function applyFilter(filter) {
  const tasks = list.querySelectorAll("li");

  tasks.forEach((task) => {
    const isDone = task.classList.contains("done");

    if (filter === "all") task.style.display = "list-item";
    if (filter === "active") task.style.display = isDone ? "none" : "list-item";
    if (filter === "done") task.style.display = isDone ? "list-item" : "none";
  });
}

// ✅ Charger les tâches au démarrage
loadTodos();
