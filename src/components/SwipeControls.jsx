import React from 'react';
import { X, Check, RotateCcw, Info } from 'lucide-react';

export default function SwipeControls({ 
  onSwipeLeft, 
  onSwipeRight, 
  onUndo, 
  onOpenDetails,
  canUndo 
}) {
  return (
    <div className="flex items-center justify-center gap-6 my-6 z-20">
      {/* Rewind */}
      <button
        onClick={onUndo}
        disabled={!canUndo}
        className={`tinder-action-btn small ${!canUndo ? 'opacity-30 cursor-not-allowed hover:transform-none' : ''}`}
        title="Undo Swipe (Backspace)"
      >
        <RotateCcw className="w-5 h-5 stroke-[2.5]" />
      </button>

      {/* Swipe Left - Mark as Fake */}
      <button
        onClick={onSwipeLeft}
        className="tinder-action-btn fake"
        title="Mark as Fake News (Left Arrow)"
      >
        <X className="w-9 h-9 stroke-[3]" />
      </button>

      {/* Fact Check Info */}
      <button
        onClick={onOpenDetails}
        className="tinder-action-btn small"
        title="Fact-Check Analysis (Spacebar)"
      >
        <Info className="w-5 h-5 stroke-[2.5]" />
      </button>

      {/* Swipe Right - Mark as Real */}
      <button
        onClick={onSwipeRight}
        className="tinder-action-btn real"
        title="Mark as Real News (Right Arrow)"
      >
        <Check className="w-9 h-9 stroke-[3]" />
      </button>
    </div>
  );
}
