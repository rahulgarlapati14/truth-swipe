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
    <div className="swipe-controls-bar">
      {/* Rewind */}
      <button
        onClick={onUndo}
        disabled={!canUndo}
        className={`btn-glass-circle small ${!canUndo ? 'opacity-30 cursor-not-allowed hover:transform-none' : ''}`}
        title="Undo Previous Swipe (Backspace)"
      >
        <RotateCcw className="w-5 h-5 stroke-[2]" />
      </button>

      {/* Swipe Left (Mark as Fake) */}
      <button
        onClick={onSwipeLeft}
        className="btn-glass-circle fake"
        title="Mark as Fake News (Left Arrow)"
      >
        <X className="w-8 h-8 stroke-[3]" />
      </button>

      {/* Info / Fact Check Details */}
      <button
        onClick={onOpenDetails}
        className="btn-glass-circle small"
        title="Fact-Check Clues (Spacebar)"
      >
        <Info className="w-5 h-5 stroke-[2]" />
      </button>

      {/* Swipe Right (Mark as Real) */}
      <button
        onClick={onSwipeRight}
        className="btn-glass-circle real"
        title="Mark as Real News (Right Arrow)"
      >
        <Check className="w-8 h-8 stroke-[3]" />
      </button>
    </div>
  );
}
