import React from 'react';
import { Flame, BarChart2, Plus, Settings } from 'lucide-react';

export default function Header({ 
  streak, 
  score, 
  onOpenStats, 
  onOpenCreate, 
  onOpenSettings 
}) {
  return (
    <header className="w-full max-w-[380px] mx-auto px-2 py-4 flex items-center justify-between z-30">
      {/* Brand Title */}
      <div className="flex items-center gap-1.5">
        <h1 className="text-xl font-black text-white tracking-tight">
          Truth<span className="text-emerald-400">Swipe</span>
        </h1>
      </div>

      {/* Streak & Points Pill */}
      <div className="flex items-center gap-2 bg-slate-900/90 px-3.5 py-1.5 rounded-full border border-white/10 text-xs font-black shadow-md">
        <div className="flex items-center gap-1 text-amber-400">
          <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span>{streak}</span>
        </div>
        <span className="text-slate-600">|</span>
        <span className="text-indigo-400">{score} Pts</span>
      </div>

      {/* Utility Actions */}
      <div className="flex items-center gap-0.5">
        <button 
          onClick={onOpenCreate}
          className="p-1.5 text-slate-300 hover:text-white rounded-lg transition-colors"
          title="Create Card"
        >
          <Plus className="w-5 h-5 stroke-[2.5]" />
        </button>

        <button 
          onClick={onOpenStats}
          className="p-1.5 text-slate-300 hover:text-white rounded-lg transition-colors"
          title="Stats Profile"
        >
          <BarChart2 className="w-5 h-5 stroke-[2.5]" />
        </button>

        <button 
          onClick={onOpenSettings}
          className="p-1.5 text-slate-300 hover:text-white rounded-lg transition-colors"
          title="Settings"
        >
          <Settings className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>
    </header>
  );
}
