import { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  done: boolean;
  createdAt: string;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number, done: boolean) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, text: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSubmit = () => {
    if (!editText.trim()) return;
    onUpdate(todo.id, editText);
    setIsEditing(false);
  };

  const handleBlur = () => {
    handleSubmit();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <li className="py-3 flex items-center">
      <button
        onClick={() => onToggle(todo.id, todo.done)}
        className="mr-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        aria-label={todo.done ? "标记为未完成" : "标记为已完成"}
      >
        {todo.done ? "✓" : "○"}
      </button>
      
      {isEditing ? (
        <div className="flex-1 flex">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-1 p-1 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </div>
      ) : (
        <span
          className={`flex-1 ${
            todo.done ? "line-through text-gray-400 dark:text-gray-500" : "text-gray-800 dark:text-gray-200"
          }`}
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.text}
        </span>
      )}
      
      <button
        onClick={() => onDelete(todo.id)}
        className="ml-2 text-red-500 hover:text-red-700"
        title="删除"
        aria-label="删除"
      >
        ×
      </button>
    </li>
  );
} 