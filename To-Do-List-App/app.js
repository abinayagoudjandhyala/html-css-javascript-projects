// app.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const input = form.querySelector('input[type="text"]');
  const taskList = document.querySelector(".task-list");
  const progressBar = document.getElementById("progress");
  const numbers = document.getElementById("numbers");

  // All tasks will be stored here
  let tasks = [];

  // ---- Helpers ----
  function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;

    // Update numbers text (e.g. "2 / 3")
    numbers.textContent = total === 0 ? "0 / 0" : `${completed} / ${total}`;

    // Update progress bar width
    const percent = total === 0 ? 0 : (completed / total) * 100;
    progressBar.style.width = `${percent}%`;
  }

  function createTaskElement(task) {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    // Container for checkbox + text
    const content = document.createElement("div");
    content.className = "task-content";

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    // Task text
    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.text;

    content.appendChild(checkbox);
    content.appendChild(span);

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = "✕";

    li.appendChild(content);
    li.appendChild(deleteBtn);
    
    // --- Events ---

    // Toggle complete
    checkbox.addEventListener("change", () => {
      // Update task state
      task.completed = checkbox.checked;

      // Toggle completed class for styling
      if (task.completed) {
        li.classList.add("completed");
      } else {
        li.classList.remove("completed");
      }

      // Recalculate progress
      updateStats();
    });

    // Delete task
    deleteBtn.addEventListener("click", () => {
      // Remove from array
      tasks = tasks.filter(t => t.id !== task.id);
      // Re-render list + stats
      renderTasks();
    });

    return li;
  }

  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach(task => {
      const li = createTaskElement(task);
      taskList.appendChild(li);
    });
    updateStats();
  }

  // ---- Add new task ----
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    const newTask = {
      id: Date.now(),
      text,
      completed: false
    };

    tasks.push(newTask);
    renderTasks();
    input.value = "";
  });

  // Initial state
  renderTasks();
});
