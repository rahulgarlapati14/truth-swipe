import React from 'react';
import { AnimatePresence } from 'framer-motion';
import NewsCard from './NewsCard';
import { RefreshCw, Award } from 'lucide-react';

export default function CardStack({ 
  cards, 
  currentIndex, 
  onSwipe, 
  onOpenDetails, 
  onResetDeck 
}) {
  const currentCard = cards[currentIndex];
  const nextCard = cards[currentIndex + 1];

  if (!currentCard || currentIndex >= cards.length) {
    return (
      <div className="w-full h-[530px] max-w-sm mx-auto worldclass-card p-8 flex flex-col items-center justify-center text-center relative">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-500 via-emerald-500 to-cyan-400 p-0.5 mb-6 animate-bounce shadow-xl">
          <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
            <Award className="w-10 h-10 text-emerald-400" />
          </div>
        </div>

        <h2 className="text-2xl font-extrabold text-white mb-2">Deck Completed! 🎉</h2>
        <p className="text-xs text-slate-300 max-w-xs leading-relaxed mb-6 font-medium">
          You've fact-checked all stories in this news deck! Your truth-seeking instincts are sharper than ever.
        </p>

        <button
          onClick={onResetDeck}
          className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-emerald-500 hover:from-indigo-500 hover:to-emerald-400 text-white font-extrabold text-xs shadow-lg shadow-indigo-500/30 flex items-center gap-2 transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Reshuffle & Play Again</span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[530px] max-w-sm mx-auto flex items-center justify-center">
      <AnimatePresence>
        {nextCard && (
          <NewsCard 
            key={nextCard.id} 
            card={nextCard} 
            isTop={false} 
          />
        )}

        <NewsCard
          key={currentCard.id}
          card={currentCard}
          isTop={true}
          onSwipe={onSwipe}
          onOpenDetails={onOpenDetails}
        />
      </AnimatePresence>
    </div>
  );
}
