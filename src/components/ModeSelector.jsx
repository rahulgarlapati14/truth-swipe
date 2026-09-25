import React from 'react';
import { CATEGORIES } from '../data/newsCards';

export default function ModeSelector({ 
  selectedCategory, 
  onSelectCategory 
}) {
  return (
    <div className="w-full max-w-md mx-auto px-4 mb-3 flex items-center justify-center gap-1.5 overflow-x-auto no-scrollbar py-1">
      {CATEGORIES.map(cat => {
        const isActive = selectedCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              isActive 
                ? 'bg-emerald-500 text-slate-950 shadow-lg scale-105' 
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
