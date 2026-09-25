import React, { useEffect } from 'react';
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
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
    }
  }, [isCorrect, currentStreak]);

  if (!card) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-worldclass p-6 sm:p-8 relative max-w-md w-full">
        {/* Close Button */}
        <button 
          onClick={onNext}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 text-lg font-bold transition-colors"
        >
          ✕
        </button>

        {/* Status Header */}
        <div className={`p-4 rounded-2xl mb-5 flex items-center gap-3 border ${
          isCorrect 
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
            : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
        }`}>
          <span className="text-3xl shrink-0">{isCorrect ? '🎉' : '⚠️'}</span>
          <div>
            <h3 className="text-lg font-extrabold leading-tight">
              {isCorrect ? 'Correct Guess!' : 'Misleading News'}
            </h3>
            <p className="text-xs font-semibold text-slate-300 mt-0.5">
              You swiped {userSwipedRight ? 'REAL' : 'FAKE'}. Story is <span className="underline font-black uppercase text-white">{card.isTrue ? 'REAL' : 'FAKE'}</span>.
            </p>
          </div>
        </div>

        {/* Headline */}
        <h2 className="text-base font-extrabold text-white mb-4 leading-snug">
          "{card.headline}"
        </h2>

        {/* Verdict Badge */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-white/10 mb-5">
          <div className="flex items-center justify-between text-xs font-bold mb-2">
            <span className="text-slate-400 uppercase tracking-wide">Journalistic Trust</span>
            <span className={card.isTrue ? 'text-emerald-400' : 'text-rose-400'}>
              {card.trustScore}% Score
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
        <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5 mb-6 text-xs text-slate-300 leading-relaxed font-medium">
          {card.explanation}
        </div>

        {/* Clean Standalone Full-Width Next Button */}
        <button
          onClick={onNext}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-emerald-500 hover:from-indigo-500 hover:to-emerald-400 text-white font-extrabold text-sm shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Next Story</span>
          <span className="text-base">➔</span>
        </button>
      </div>
    </div>
  );
}
