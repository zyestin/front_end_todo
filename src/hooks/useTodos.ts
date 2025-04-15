import { useState, useEffect, useCallback } from 'react';

export interface Todo {
  id: number;
  text: string;
  done: boolean;
  createdAt: string;
}

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 获取所有待办事项
  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch('/api/todos');
      
      if (!response.ok) {
        throw new Error(`获取失败: ${response.status}`);
      }
      
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      console.error('获取待办事项失败:', err);
      setError('获取待办事项失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  }, []);

  // 添加新待办事项
  const addTodo = useCallback(async (text: string) => {
    if (!text.trim()) return null;

    try {
      setError('');
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.trim() }),
      });

      if (!response.ok) {
        throw new Error(`添加失败: ${response.status}`);
      }

      const addedTodo = await response.json();
      setTodos(prevTodos => [addedTodo, ...prevTodos]);
      return addedTodo;
    } catch (err) {
      console.error('添加待办事项失败:', err);
      setError('添加待办事项失败，请稍后重试');
      return null;
    }
  }, []);

  // 切换待办事项状态
  const toggleTodo = useCallback(async (id: number, done: boolean) => {
    try {
      setError('');
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done: !done }),
      });

      if (!response.ok) {
        throw new Error(`更新失败: ${response.status}`);
      }

      const updatedTodo = await response.json();
      setTodos(prevTodos => 
        prevTodos.map(todo => (todo.id === id ? updatedTodo : todo))
      );
      return updatedTodo;
    } catch (err) {
      console.error('更新待办事项失败:', err);
      setError('更新待办事项状态失败，请稍后重试');
      return null;
    }
  }, []);

  // 更新待办事项文本
  const updateTodoText = useCallback(async (id: number, text: string) => {
    if (!text.trim()) return null;

    try {
      setError('');
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.trim() }),
      });

      if (!response.ok) {
        throw new Error(`更新失败: ${response.status}`);
      }

      const updatedTodo = await response.json();
      setTodos(prevTodos => 
        prevTodos.map(todo => (todo.id === id ? updatedTodo : todo))
      );
      return updatedTodo;
    } catch (err) {
      console.error('更新待办事项失败:', err);
      setError('更新待办事项失败，请稍后重试');
      return null;
    }
  }, []);

  // 删除待办事项
  const deleteTodo = useCallback(async (id: number) => {
    try {
      setError('');
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`删除失败: ${response.status}`);
      }

      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
      return true;
    } catch (err) {
      console.error('删除待办事项失败:', err);
      setError('删除待办事项失败，请稍后重试');
      return false;
    }
  }, []);

  // 清除已完成的待办事项
  const clearCompleted = useCallback(async () => {
    try {
      setError('');
      const response = await fetch('/api/todos/clear-completed', {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`清除失败: ${response.status}`);
      }

      setTodos(prevTodos => prevTodos.filter(todo => !todo.done));
      return true;
    } catch (err) {
      console.error('清除已完成待办事项失败:', err);
      setError('清除已完成待办事项失败，请稍后重试');
      return false;
    }
  }, []);

  // 全部标记为完成或未完成
  const toggleAll = useCallback(async (done: boolean) => {
    try {
      setError('');
      const response = await fetch('/api/todos/toggle-all', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done }),
      });

      if (!response.ok) {
        throw new Error(`批量更新失败: ${response.status}`);
      }

      setTodos(prevTodos => prevTodos.map(todo => ({ ...todo, done })));
      return true;
    } catch (err) {
      console.error('批量更新待办事项失败:', err);
      setError('批量更新待办事项状态失败，请稍后重试');
      return false;
    }
  }, []);

  // 页面加载时获取待办事项
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return {
    todos,
    loading,
    error,
    setError,
    fetchTodos,
    addTodo,
    toggleTodo,
    updateTodoText,
    deleteTodo,
    clearCompleted,
    toggleAll,
    activeTodoCount: todos.filter(todo => !todo.done).length,
    hasCompletedTodos: todos.some(todo => todo.done),
    allCompleted: todos.length > 0 && todos.every(todo => todo.done),
  };
}; 