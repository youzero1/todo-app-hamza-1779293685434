import { useState } from 'react';
import { LayoutList, Trophy } from 'lucide-react';
import TodoInput from '@/components/TodoInput';
import TodoItem from '@/components/TodoItem';
import TodoFilters from '@/components/TodoFilters';
import { useTodos } from '@/hooks/useTodos';
import { FilterType } from '@/types';

export default function Dashboard() {
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompleted } = useTodos();
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const completedCount = todos.filter((t) => t.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <header className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-white mb-4 shadow-lg shadow-primary/20">
            <LayoutList size={32} />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900">
            My Tasks
          </h1>
          <p className="text-neutral-500">
            You have <span className="text-primary font-bold">{activeCount}</span> tasks remaining today
          </p>
        </header>

        <TodoInput onAdd={addTodo} />

        {todos.length > 0 && (
          <TodoFilters
            activeFilter={filter}
            onFilterChange={setFilter}
            completedCount={completedCount}
            onClearCompleted={clearCompleted}
          />
        )}

        <div className="space-y-3">
          {filteredTodos.length > 0 ? (
            filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-neutral-200">
              <Trophy size={48} className="mx-auto text-neutral-200 mb-4" />
              <h3 className="text-lg font-medium text-neutral-900">
                {filter === 'completed' ? 'No completed tasks yet' : filter === 'active' ? 'All caught up!' : 'Your list is empty'}
              </h3>
              <p className="text-neutral-500">Time to focus on what matters.</p>
            </div>
          )}
        </div>

        <footer className="text-center text-xs text-neutral-400 font-medium">
          Designed with React 19 & Tailwind CSS v4
        </footer>
      </div>
    </div>
  );
}