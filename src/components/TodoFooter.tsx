type Filter = 'all' | 'active' | 'completed';

interface TodoFooterProps {
  activeCount: number;
  hasCompletedTodos: boolean;
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
  onClearCompleted: () => Promise<boolean>;
}

export default function TodoFooter({
  activeCount,
  hasCompletedTodos,
  filter,
  onFilterChange,
  onClearCompleted
}: TodoFooterProps) {
  return (
    <div className="mt-4 flex flex-col sm:flex-row sm:justify-between text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4">
      <div className="mb-2 sm:mb-0">
        <span>{activeCount} 项待完成</span>
      </div>
      
      <div className="flex gap-2 mb-2 sm:mb-0 justify-center">
        <button
          onClick={() => onFilterChange('all')}
          className={`px-2 py-1 rounded ${
            filter === 'all' 
              ? 'bg-blue-500 text-white' 
              : 'hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          全部
        </button>
        <button
          onClick={() => onFilterChange('active')}
          className={`px-2 py-1 rounded ${
            filter === 'active' 
              ? 'bg-blue-500 text-white' 
              : 'hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          未完成
        </button>
        <button
          onClick={() => onFilterChange('completed')}
          className={`px-2 py-1 rounded ${
            filter === 'completed' 
              ? 'bg-blue-500 text-white' 
              : 'hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          已完成
        </button>
      </div>
      
      {hasCompletedTodos && (
        <div className="flex justify-center">
          <button
            onClick={onClearCompleted}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:underline"
          >
            清除已完成
          </button>
        </div>
      )}
    </div>
  );
} 