import React from 'react';
import { X, Target, CheckCircle2, Flame, Award, RotateCcw } from 'lucide-react';

export default function StatsModal({ stats, onClose, onResetStats }) {
  const { totalSwiped, totalCorrect, currentStreak, bestStreak } = stats;
  const accuracy = totalSwiped > 0 ? Math.round((totalCorrect / totalSwiped) * 100) : 0;

  return (
    <div className="modal-overlay">
      <div className="modal-card p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/5"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-base font-bold text-white mb-5">Your Fact-Checking Profile</h2>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-slate-900 p-4 rounded-xl border border-white/5 text-center">
            <div className="text-2xl font-extrabold text-white mb-0.5">{totalSwiped}</div>
            <div className="text-[11px] text-slate-400 font-medium">Total Swiped</div>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-white/5 text-center">
            <div className="text-2xl font-extrabold text-emerald-400 mb-0.5">{accuracy}%</div>
            <div className="text-[11px] text-slate-400 font-medium">Accuracy Rate</div>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-white/5 text-center">
            <div className="text-2xl font-extrabold text-amber-400 mb-0.5">{currentStreak}</div>
            <div className="text-[11px] text-slate-400 font-medium">Current Streak</div>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-white/5 text-center">
            <div className="text-2xl font-extrabold text-indigo-400 mb-0.5">{bestStreak}</div>
            <div className="text-[11px] text-slate-400 font-medium">Best Streak</div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <button
            onClick={onResetStats}
            className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Stats
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white text-slate-950 font-bold text-xs hover:bg-slate-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
