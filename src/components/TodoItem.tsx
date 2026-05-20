import { CheckCircle2, Circle, Trash2, Clock } from 'lucide-react';
import { Todo } from '@/types';
import { clsx } from 'clsx';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const priorityColors = {
    low: 'bg-emerald-100 text-emerald-700',
    medium: 'bg-amber-100 text-amber-700',
    high: 'bg-rose-100 text-rose-700',
  };

  return (
    <div className="group flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-neutral-100 hover:border-neutral-200 transition-all">
      <button
        onClick={() => onToggle(todo.id)}
        className="text-neutral-300 hover:text-primary transition-colors focus:outline-none"
      >
        {todo.completed ? (
          <CheckCircle2 className="text-emerald-500" size={24} />
        ) : (
          <Circle size={24} />
        )}
      </button>

      <div className="flex-1 flex flex-col gap-1">
        <p className={clsx(
          "text-lg transition-all",
          todo.completed ? "text-neutral-400 line-through" : "text-neutral-800 font-medium"
        )}>
          {todo.text}
        </p>
        <div className="flex items-center gap-3">
          <span className={clsx(
            "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
            priorityColors[todo.priority]
          )}>
            {todo.priority}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-neutral-400 font-medium">
            <Clock size={12} />
            {new Date(todo.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 p-2 text-neutral-400 hover:text-rose-500 transition-all hover:bg-rose-50 rounded-lg"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
}