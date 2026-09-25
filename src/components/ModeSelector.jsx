import React from 'react';
import { CATEGORIES } from '../data/newsCards';

export default function ModeSelector({ 
  selectedCategory, 
  onSelectCategory 
}) {
  return (
    <div className="category-bar">
      {CATEGORIES.map(cat => {
        const isActive = selectedCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={isActive ? 'active' : ''}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
