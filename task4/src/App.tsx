import React, { useState } from "react";
import TodoItem from "./todo/TodoItem";
import TodoForm from "./todo/form";
import type { Todo } from "./type";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      isEditing: false,
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id: number, newText?: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              text: newText !== undefined ? newText : todo.text,
              isEditing: newText !== undefined ? false : !todo.isEditing,
            }
          : todo
      )
    );
  };
;

  return (
    <div className="App">
      <h1>📝 Todo List</h1>
      <TodoForm onAdd={addTodo} />
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={deleteTodo}
          onUpdate={updateTodo}
        />
      ))}
    </div>
  );
};

export default App;
