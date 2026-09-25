import React from 'react';
import { CATEGORIES } from '../data/newsCards';

export default function ModeSelector({ 
  selectedCategory, 
  onSelectCategory 
}) {
  return (
    <div className="w-full max-w-md mx-auto px-4 mb-4 flex items-center justify-center gap-1.5 overflow-x-auto no-scrollbar py-1">
      {CATEGORIES.map(cat => {
        const isActive = selectedCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              isActive 
                ? 'bg-slate-900 text-white shadow-md' 
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
