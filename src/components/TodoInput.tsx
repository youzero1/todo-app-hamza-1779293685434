import React, { useState } from 'react';
import { Plus, Flag } from 'lucide-react';
import { Priority } from '@/types';
import { clsx } from 'clsx';

type TodoInputProps = {
  onAdd: (text: string, priority: Priority) => void;
};

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text, priority);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-4 rounded-xl shadow-sm border border-neutral-200">
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e: any) => setText(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 bg-neutral-50 px-4 py-2 rounded-lg border border-transparent focus:border-primary focus:outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          <Plus size={18} />
          Add
        </button>
      </div>
      
      <div className="flex items-center gap-3 text-sm text-neutral-600">
        <span className="flex items-center gap-1 font-medium"><Flag size={14} /> Priority:</span>
        <div className="flex gap-2">
          {(['low', 'medium', 'high'] as Priority[]).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPriority(p)}
              className={clsx(
                "px-3 py-1 rounded-full capitalize transition-all border",
                priority === p 
                  ? "bg-primary/10 border-primary text-primary font-semibold"
                  : "bg-transparent border-neutral-200 hover:border-neutral-300 text-neutral-500"
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </form>
  );
}