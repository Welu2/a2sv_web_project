import React, { useState } from "react";

interface Props {
  onAdd: (text: string) => void;
}

const TodoForm: React.FC<Props> = ({ onAdd }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Enter a task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">➕ Add</button>
    </form>
  );
};

export default TodoForm;
