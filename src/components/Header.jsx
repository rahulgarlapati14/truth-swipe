import React from 'react';

export default function Header({ 
  streak, 
  score, 
  onOpenStats, 
  onOpenCreate, 
  onOpenSettings 
}) {
  return (
    <header className="w-full max-w-lg mx-auto px-4 py-4 flex items-center justify-between border-b border-slate-200 bg-white shadow-sm rounded-b-2xl mb-4">
      {/* Brand Title */}
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Truth<span className="text-emerald-600">Swipe</span>
        </h1>
      </div>

      {/* Streak & Points Pill */}
      <div className="flex items-center gap-2 bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-bold text-slate-800">
        <span className="text-amber-500 font-extrabold">🔥 {streak} Streak</span>
        <span className="text-slate-300">|</span>
        <span className="text-indigo-600 font-extrabold">{score} Pts</span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1">
        <button 
          onClick={onOpenCreate}
          className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg text-xs font-bold transition-colors"
          title="Create Card"
        >
          ➕ <span className="hidden sm:inline">Add</span>
        </button>

        <button 
          onClick={onOpenStats}
          className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg text-xs font-bold transition-colors"
          title="Stats Profile"
        >
          📊 <span className="hidden sm:inline">Stats</span>
        </button>

        <button 
          onClick={onOpenSettings}
          className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg text-xs font-bold transition-colors"
          title="Settings"
        >
          ⚙️
        </button>
      </div>
    </header>
  );
}
