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
      <div className="modal-content-simple p-6 relative">
        <button 
          onClick={onNext}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 text-lg font-bold"
        >
          ✕
        </button>

        {/* Status Header */}
        <div className={`p-4 rounded-xl mb-4 flex items-center gap-3 border ${
          isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'
        }`}>
          <span className="text-3xl">{isCorrect ? '🎉' : '⚠️'}</span>
          <div>
            <h3 className="text-lg font-extrabold leading-tight">
              {isCorrect ? 'Correct Answer!' : 'Misleading News Story'}
            </h3>
            <p className="text-xs font-bold">
              This news story is actually <span className="underline uppercase font-extrabold">{card.isTrue ? 'REAL' : 'FAKE'}</span>.
            </p>
          </div>
        </div>

        {/* Headline */}
        <h2 className="text-base font-extrabold text-slate-900 mb-3 leading-snug">
          "{card.headline}"
        </h2>

        {/* Trust Score */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 mb-4">
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            <span className="text-slate-500 uppercase">Fact Check Score</span>
            <span className={card.isTrue ? 'text-emerald-600' : 'text-rose-600'}>
              {card.trustScore}% Verified
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className={`h-full ${card.isTrue ? 'bg-emerald-500' : 'bg-rose-500'}`}
              style={{ width: `${card.trustScore}%` }}
            />
          </div>
        </div>

        {/* Breakdown Paragraph */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-5 text-sm text-slate-700 leading-relaxed font-medium">
          {card.explanation}
        </div>

        {/* Next Action */}
        <button
          onClick={onNext}
          className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
        >
          <span>Next Story ➔</span>
        </button>
      </div>
    </div>
  );
}
