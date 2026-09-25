import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, ShieldCheck, Users, ExternalLink, ArrowRight, Flame } from 'lucide-react';
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
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    }
  }, [isCorrect, currentStreak]);

  if (!card) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-worldclass p-6 sm:p-7 relative">
        {/* Outcome Header Banner */}
        <div className={`p-4 rounded-2xl mb-5 flex items-center justify-between ${
          isCorrect 
            ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400' 
            : 'bg-rose-500/15 border border-rose-500/30 text-rose-400'
        }`}>
          <div className="flex items-center gap-3">
            {isCorrect ? (
              <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0 stroke-[2.5]" />
            ) : (
              <AlertTriangle className="w-8 h-8 text-rose-400 shrink-0 stroke-[2.5]" />
            )}
            <div>
              <h3 className="text-base font-extrabold tracking-wide">
                {isCorrect ? 'Spot On! Excellent Fact-Checking' : 'Oops! You Were Misled'}
              </h3>
              <p className="text-xs text-slate-300">
                You swiped {userSwipedRight ? 'REAL' : 'FAKE'}. Story is <span className="font-bold underline uppercase">{card.isTrue ? 'REAL' : 'FAKE'}</span>.
              </p>
            </div>
          </div>

          {isCorrect && (
            <div className="flex items-center gap-1 bg-emerald-500/20 px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-300 shrink-0">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
              +100 Pts
            </div>
          )}
        </div>

        {/* Article Headline */}
        <div className="mb-5">
          <span className="badge-category-glow inline-block mb-2">{card.category}</span>
          <h2 className="text-lg font-extrabold text-white leading-snug mb-2">
            {card.headline}
          </h2>
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span>Source: <strong className="text-slate-200">{card.source}</strong></span>
            <span>•</span>
            <span>Published: <strong className="text-slate-200">{card.publishDate}</strong></span>
          </div>
        </div>

        {/* Trust Score Progress Gauge */}
        <div className="worldclass-card p-4 mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Fact-Check Verdict
            </span>
            <span className={`text-xs font-extrabold px-2.5 py-1 rounded-lg ${
              card.isTrue ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
            }`}>
              {card.verdict} ({card.trustScore}% Score)
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ${
                card.isTrue ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-gradient-to-r from-rose-600 to-amber-500'
              }`}
              style={{ width: `${card.trustScore}%` }}
            />
          </div>
        </div>

        {/* Key Verification Signals */}
        {card.redFlags && card.redFlags.length > 0 && (
          <div className="mb-5">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Key Verification Signals
            </h4>
            <div className="space-y-2">
              {card.redFlags.map((flag, idx) => (
                <div key={idx} className="text-xs text-slate-200 bg-white/5 p-2.5 rounded-xl border border-white/5">
                  {flag}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Explanation Paragraph */}
        <div className="mb-5">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
            Detailed Breakdown
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/80 p-3.5 rounded-xl border border-white/5">
            {card.explanation}
          </p>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-2">
          {card.fullArticleUrl && card.fullArticleUrl !== '#' && (
            <a 
              href={card.fullArticleUrl} 
              target="_blank" 
              rel="noreferrer"
              className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1"
            >
              <span>Verify source</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          <button
            onClick={onNext}
            className="ml-auto px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-emerald-500 hover:from-indigo-500 hover:to-emerald-400 text-white font-extrabold text-xs shadow-lg shadow-indigo-500/25 flex items-center gap-2 transition-all"
          >
            <span>Next News Story</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
