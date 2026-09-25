import React from 'react';

export default function SwipeControls({ 
  onSwipeLeft, 
  onSwipeRight, 
  onUndo, 
  onOpenDetails,
  canUndo 
}) {
  return (
    <div className="flex items-center justify-center gap-3 my-5 z-20">
      {/* Rewind */}
      <button
        onClick={onUndo}
        disabled={!canUndo}
        className={`btn-simple-sub ${!canUndo ? 'opacity-40 cursor-not-allowed' : ''}`}
        title="Undo Swipe"
      >
        🔄 Undo
      </button>

      {/* Swipe Left - Mark as Fake */}
      <button
        onClick={onSwipeLeft}
        className="btn-simple-fake"
        title="Mark as Fake News (Left Arrow)"
      >
        ❌ FAKE
      </button>

      {/* Swipe Right - Mark as Real */}
      <button
        onClick={onSwipeRight}
        className="btn-simple-real"
        title="Mark as Real News (Right Arrow)"
      >
        ✅ REAL
      </button>

      {/* Fact Check Info */}
      <button
        onClick={onOpenDetails}
        className="btn-simple-sub"
        title="Fact-Check Analysis"
      >
        ℹ️ Clues
      </button>
    </div>
  );
}
