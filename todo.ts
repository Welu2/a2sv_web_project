export {}; // ensures module scope and avoids redeclaration errors

interface TodoItem {
  id: number;
  text: string;
}

let todos: TodoItem[] = [];
let nextId = 1;

function addTodo(text: string): void {
  const newTodo: TodoItem = { id: nextId++, text };
  todos.push(newTodo);
  displayTodos();
}

function removeTodo(id: number): void {
  todos = todos.filter((todo) => todo.id !== id);
  displayTodos();
}

function editTodo(id: number, newText: string): void {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.text = newText;
    console.log(`Edited task [${id}] to: ${newText}`);
  } else {
    console.log(`Todo with id ${id} not found.`);
  }
  displayTodos();
}

function displayTodos(): void {
  console.clear();
  if (todos.length === 0) {
    console.log("No tasks available.");
  } else {
    console.log("Todo List:");
    todos.forEach((todo) => {
      console.log(`[${todo.id}] ${todo.text}`);
    });
  }
}

// --- Test code ---
addTodo("read react");
addTodo("go for a walk");

editTodo(1, "read React and Redux");

removeTodo(2);
