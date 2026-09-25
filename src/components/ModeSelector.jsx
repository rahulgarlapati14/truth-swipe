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
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 ${
              isActive 
                ? 'bg-gradient-to-r from-indigo-600 to-emerald-500 text-white shadow-lg shadow-indigo-500/25 scale-105' 
                : 'glass-pill text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
