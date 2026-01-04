const taskInput = document.querySelector("#taskInput");
const dueDateInput = document.querySelector("#dueDate");
const addBtn = document.querySelector("#addBtn");
const list = document.querySelector("#list");

function updateCounter() {
  const tasks = list.querySelectorAll("li");
  const doneTasks = list.querySelectorAll("li.done");
  const remaining = tasks.length - doneTasks.length;

  const counter = document.querySelector("#counter");
  if (counter) counter.textContent = "Tâches restantes : " + remaining;
}

function saveTodos() {
  localStorage.setItem("todos", list.innerHTML);
}

function loadTodos() {
  const saved = localStorage.getItem("todos");
  if (saved) list.innerHTML = saved;

  updateCounter();
  markOverdue();
}

function markOverdue() {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  list.querySelectorAll("li").forEach((li) => {
    const dateSpan = li.querySelector(".task-date");
    const due = dateSpan?.dataset?.due || "";
    const isDone = li.classList.contains("done");

    if (due && due < today && !isDone) {
      li.classList.add("overdue");
    } else {
      li.classList.remove("overdue");
    }
  });
}

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;

  const due = dueDateInput ? dueDateInput.value : "";

  const li = document.createElement("li");

  // Texte
  const label = document.createElement("span");
  label.className = "task-label";
  label.textContent = text;

  // Mot "sport" en gras
  if (text.toLowerCase().includes("sport")) {
    label.style.fontWeight = "bold";
  }

  // Date
  const dateSpan = document.createElement("span");
  dateSpan.className = "task-date";
  dateSpan.dataset.due = due; // stocke la valeur brute
  dateSpan.textContent = due ? `📅 ${due}` : "";

  // Bouton supprimer
  const delBtn = document.createElement("button");
  delBtn.textContent = "Supprimer";
  delBtn.style.marginLeft = "10px";

  // On assemble
  li.appendChild(label);
  li.appendChild(dateSpan);
  li.appendChild(delBtn);

  list.appendChild(li);

  // Reset champs
  taskInput.value = "";
  taskInput.focus();
  if (dueDateInput) dueDateInput.value = "";

  updateCounter();
  markOverdue();
  saveTodos();
}

// Ajout via bouton
addBtn.addEventListener("click", addTask);

// Ajout via Entrée
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

// Gestion clics (event delegation)
list.addEventListener("click", (e) => {
  const target = e.target;

  // Supprimer
  if (target.tagName === "BUTTON") {
    const li = target.closest("li");
    if (!li) return;

    li.remove();
    updateCounter();
    markOverdue();
    saveTodos();
    return;
  }

  // Toggle done si clic dans une tâche
  const li = target.closest("li");
  if (!li) return;

  li.classList.toggle("done");

  updateCounter();
  markOverdue();
  saveTodos();
});

// Filtres
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

// Démarrage
loadTodos();
