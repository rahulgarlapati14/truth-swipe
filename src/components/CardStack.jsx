import React from 'react';
import { AnimatePresence } from 'framer-motion';
import NewsCard from './NewsCard';

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
      <div className="w-full h-[520px] max-w-sm mx-auto simple-card p-8 flex flex-col items-center justify-center text-center relative bg-white">
        <span className="text-5xl mb-4">🎉</span>

        <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Deck Completed!</h2>
        <p className="text-sm text-slate-600 max-w-xs leading-relaxed mb-6 font-medium">
          You have successfully fact-checked all available news stories in this deck!
        </p>

        <button
          onClick={onResetDeck}
          className="px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md flex items-center gap-2"
        >
          <span>🔄 Play Again</span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[520px] max-w-sm mx-auto flex items-center justify-center">
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
