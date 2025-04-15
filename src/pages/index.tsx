import { useState } from "react";
import TodoList from "@/components/TodoList";
import TodoFooter from "@/components/TodoFooter";
import { useTodos } from "@/hooks/useTodos";


type Filter = 'all' | 'active' | 'completed';

export default function Home() {
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState<Filter>('all');
  const {
    todos,
    loading,
    error,
    setError,
    addTodo,
    toggleTodo,
    updateTodoText,
    deleteTodo,
    clearCompleted,
    toggleAll,
    activeTodoCount,
    hasCompletedTodos,
    allCompleted,
  } = useTodos();

  // 添加新待办事项
  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const result = await addTodo(newTodo);
    if (result) {
      setNewTodo("");
    }
  };

  return (
    <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 py-8`}>
      <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">待办事项</h1>
        
        {/* 错误提示 */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex justify-between">
            <span>{error}</span>
            <button onClick={() => setError("")} className="font-bold">×</button>
          </div>
        )}

        {/* 添加新待办事项 */}
        <form onSubmit={handleAddTodo} className="mb-6 flex">
          {todos.length > 0 && (
            <button
              type="button"
              onClick={() => toggleAll(!allCompleted)}
              className="p-2 mr-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              title={allCompleted ? "标记所有为未完成" : "标记所有为已完成"}
            >
              {allCompleted ? "☑" : "☐"}
            </button>
          )}
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="添加新待办事项..."
            className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
          >
            添加
          </button>
        </form>

        {/* 加载状态 */}
        {loading ? (
          <div className="py-4 text-center text-gray-500 dark:text-gray-400">加载中...</div>
        ) : (
          <>
            {/* 待办事项列表 */}
            <TodoList
              todos={todos}
              filter={filter}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onUpdate={updateTodoText}
            />
            
            {/* 底部导航和统计 */}
            {todos.length > 0 && (
              <TodoFooter
                activeCount={activeTodoCount}
                hasCompletedTodos={hasCompletedTodos}
                filter={filter}
                onFilterChange={setFilter}
                onClearCompleted={clearCompleted}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
