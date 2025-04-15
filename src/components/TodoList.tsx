import { useMemo } from 'react';
import TodoItem from './TodoItem';
import { Todo } from '../hooks/useTodos';

type Filter = 'all' | 'active' | 'completed';

interface TodoListProps {
  todos: Todo[];
  filter: Filter;
  onToggle: (id: number, done: boolean) => Promise<Todo | null>;
  onDelete: (id: number) => Promise<boolean>;
  onUpdate: (id: number, text: string) => Promise<Todo | null>;
}

export default function TodoList({ todos, filter, onToggle, onDelete, onUpdate }: TodoListProps) {
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.done);
      case 'completed':
        return todos.filter(todo => todo.done);
      default:
        return todos;
    }
  }, [todos, filter]);

  if (filteredTodos.length === 0) {
    return (
      <div className="py-4 text-center text-gray-500 dark:text-gray-400">
        {todos.length === 0 
          ? "暂无待办事项，请添加" 
          : filter === 'active' 
            ? "没有未完成的待办事项" 
            : "没有已完成的待办事项"}
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
} 