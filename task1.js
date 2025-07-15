(function () {
  const taskInput = document.getElementById("taskInput");
  const addBtn = document.getElementById("addBtn");
  const taskList = document.getElementById("taskList");

  addBtn.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") addTask();
  });

  /**
   * Create a new task <li> element with text, edit & delete buttons.
   */
  function createTaskElement(text) {
    const li = document.createElement("li");

    // Task text span
    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = text;
    li.appendChild(span);

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", function () {
      const currentText = span.textContent;
      const updated = prompt("Edit task:", currentText);
      if (updated !== null) {
        const trimmed = updated.trim();
        if (trimmed) span.textContent = trimmed;
      }
    });
    li.appendChild(editBtn);

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Remove";
    deleteBtn.addEventListener("click", function () {
      taskList.removeChild(li);
    });
    li.appendChild(deleteBtn);

    return li;
  }

  /**
   * Adds a task to the list, ignoring empty/whitespace input.
   */
  function addTask() {
    const text = taskInput.value.trim();
    if (!text) return; // Ignore empty input

    const li = createTaskElement(text);
    taskList.appendChild(li);

    taskInput.value = "";
    taskInput.focus();
  }
})();

addTodo("Buy groceries");
addTodo("Walk the dog");
