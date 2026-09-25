import React from 'react';
import { ShieldCheck, Flame, Award, BarChart2, PlusCircle, Settings, Volume2, VolumeX } from 'lucide-react';

export default function Header({ 
  streak, 
  score, 
  accuracy, 
  soundMuted, 
  onToggleSound, 
  onOpenStats, 
  onOpenCreate, 
  onOpenSettings 
}) {
  return (
    <header className="w-full max-w-md mx-auto px-4 py-4 flex items-center justify-between z-30">
      {/* Brand Logo */}
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-emerald-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/30 flex items-center justify-center">
          <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
        </div>
        <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent leading-none">
          Truth<span className="text-emerald-400">Swipe</span>
        </h1>
      </div>

      {/* Gamification Stats */}
      <div className="flex items-center gap-2">
        <div className="glass-pill px-3 py-1.5 flex items-center gap-1.5 text-xs font-bold text-amber-400">
          <Flame className="w-4 h-4 fill-amber-400 text-amber-400 animate-pulse" />
          <span>{streak}</span>
        </div>

        <div className="glass-pill px-3 py-1.5 flex items-center gap-1.5 text-xs font-bold text-indigo-400">
          <Award className="w-4 h-4 text-indigo-400" />
          <span>{score} <span className="font-normal text-slate-400">Pts</span></span>
        </div>
      </div>

      {/* Action Utilities */}
      <div className="flex items-center gap-0.5">
        <button 
          onClick={onOpenCreate}
          className="p-1.5 text-slate-300 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
          title="Create Custom Card"
        >
          <PlusCircle className="w-5 h-5 stroke-[2]" />
        </button>

        <button 
          onClick={onOpenStats}
          className="p-1.5 text-slate-300 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
          title="Stats Profile"
        >
          <BarChart2 className="w-5 h-5 stroke-[2]" />
        </button>

        <button 
          onClick={onToggleSound}
          className="p-1.5 text-slate-300 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
          title={soundMuted ? "Unmute Sound" : "Mute Sound"}
        >
          {soundMuted ? <VolumeX className="w-5 h-5 text-slate-500" /> : <Volume2 className="w-5 h-5 text-cyan-400" />}
        </button>

        <button 
          onClick={onOpenSettings}
          className="p-1.5 text-slate-300 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
          title="Settings"
        >
          <Settings className="w-5 h-5 stroke-[2]" />
        </button>
      </div>
    </header>
  );
}
