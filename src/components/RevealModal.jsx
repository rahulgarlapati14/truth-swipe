import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, ArrowRight, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RevealModal({ 
  card, 
  userSwipedRight, 
  isCorrect, 
  onNext, 
  currentStreak 
}) {
  useEffect(() => {
    if (isCorrect && currentStreak >= 2) {
      confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
    }
  }, [isCorrect, currentStreak]);

  if (!card) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content-clean p-6 sm:p-7 relative">
        <button 
          onClick={onNext}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Clear Outcome Header */}
        <div className={`p-4 rounded-2xl mb-5 flex items-center gap-3 border ${
          isCorrect ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-rose-500/20 border-rose-500/40 text-rose-300'
        }`}>
          {isCorrect ? (
            <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0 stroke-[2.5]" />
          ) : (
            <AlertTriangle className="w-8 h-8 text-rose-400 shrink-0 stroke-[2.5]" />
          )}
          <div>
            <h3 className="text-lg font-extrabold leading-tight">
              {isCorrect ? 'Spot On! Correct Guess' : 'Misleading News Story'}
            </h3>
            <p className="text-xs font-semibold opacity-90">
              This news story is <span className="underline uppercase font-bold">{card.isTrue ? 'REAL' : 'FAKE'}</span>.
            </p>
          </div>
        </div>

        {/* Headline Header */}
        <h2 className="text-base font-extrabold text-white mb-4 leading-snug">
          "{card.headline}"
        </h2>

        {/* Trust Score Progress */}
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 mb-4">
          <div className="flex items-center justify-between text-xs font-bold mb-2">
            <span className="text-slate-400 uppercase tracking-wide">Trust Score</span>
            <span className={card.isTrue ? 'text-emerald-400' : 'text-rose-400'}>
              {card.trustScore}% Verified
            </span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className={`h-full ${card.isTrue ? 'bg-emerald-500' : 'bg-rose-500'}`}
              style={{ width: `${card.trustScore}%` }}
            />
          </div>
        </div>

        {/* Explanation Paragraph */}
        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 mb-5 text-sm text-slate-200 leading-relaxed font-medium">
          {card.explanation}
        </div>

        {/* Next Action */}
        <button
          onClick={onNext}
          className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all"
        >
          <span>Next Story</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
}
