import React, { useState } from "react";
import type { Todo } from "../type";

interface Props {
  todo: Todo;
  onDelete: (id: number) => void;
  onUpdate: (id: number, newText?: string) => void;
}

const TodoItem: React.FC<Props> = ({ todo, onDelete, onUpdate }) => {
  const [editText, setEditText] = useState(todo.text);

  return (
    <div className="todo-item">
      {todo.isEditing ? (
        <>
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <div className="actions">
            <button onClick={() => onUpdate(todo.id, editText)}>✅</button>
            <button onClick={() => onDelete(todo.id)}>🗑️</button>
          </div>
        </>
      ) : (
        <>
          <span>{todo.text}</span>
          <div className="actions">
            <button onClick={() => onUpdate(todo.id)}>✏️</button>
            <button onClick={() => onDelete(todo.id)}>🗑️</button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;
