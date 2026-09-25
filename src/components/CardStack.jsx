import React from 'react';
import { AnimatePresence } from 'framer-motion';
import NewsCard from './NewsCard';
import { RefreshCw, CheckCircle2 } from 'lucide-react';

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
      <div className="w-full h-[560px] max-w-[380px] mx-auto tinder-full-card p-8 flex flex-col items-center justify-center text-center relative bg-[#121215]">
        <CheckCircle2 className="w-16 h-16 text-emerald-400 mb-4 stroke-[2]" />

        <h2 className="text-2xl font-black text-white mb-2">Deck Completed! 🎉</h2>
        <p className="text-sm text-slate-300 max-w-xs leading-relaxed mb-6 font-medium">
          You have successfully fact-checked all available news stories in this stack!
        </p>

        <button
          onClick={onResetDeck}
          className="px-6 py-3.5 rounded-full bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-sm shadow-xl flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4 stroke-[3]" />
          <span>Reshuffle Deck</span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[560px] max-w-[380px] mx-auto flex items-center justify-center">
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
