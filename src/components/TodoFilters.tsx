import { FilterType } from '@/types';
import { clsx } from 'clsx';

type TodoFiltersProps = {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  completedCount: number;
  onClearCompleted: () => void;
};

export default function TodoFilters({
  activeFilter,
  onFilterChange,
  completedCount,
  onClearCompleted,
}: TodoFiltersProps) {
  const filters: FilterType[] = ['all', 'active', 'completed'];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm bg-white p-4 rounded-xl border border-neutral-200">
      <div className="flex bg-neutral-100 p-1 rounded-lg w-full sm:w-auto">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={clsx(
              "flex-1 sm:flex-none px-4 py-1.5 rounded-md capitalize transition-all",
              activeFilter === filter
                ? "bg-white text-primary shadow-sm font-semibold"
                : "text-neutral-500 hover:text-neutral-700 hover:bg-white/50 font-medium"
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      {completedCount > 0 && (
        <button
          onClick={onClearCompleted}
          className="text-neutral-400 hover:text-rose-500 font-medium transition-colors"
        >
          Clear {completedCount} completed
        </button>
      )}
    </div>
  );
}