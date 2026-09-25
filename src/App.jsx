import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import ModeSelector from './components/ModeSelector';
import CardStack from './components/CardStack';
import SwipeControls from './components/SwipeControls';
import RevealModal from './components/RevealModal';
import StatsModal from './components/StatsModal';
import CreateCardModal from './components/CreateCardModal';
import SettingsModal from './components/SettingsModal';
import { INITIAL_NEWS_CARDS } from './data/newsCards';
import { fetchLiveNewsCards } from './services/newsApi';
import { 
  playSwipeSound, 
  playCorrectSound, 
  playWrongSound, 
  playStreakSound,
  setSoundMuted,
  isSoundMuted
} from './utils/soundEffects';

const LOCAL_STORAGE_STATS_KEY = 'truthswipe_user_stats_v1';

export default function App() {
  const [cards, setCards] = useState(INITIAL_NEWS_CARDS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState([]);
  
  // Game Modes
  const [mode, setMode] = useState('blitz'); // 'blitz' | 'survival'
  const [lives, setLives] = useState(3);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Stats State
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_STATS_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      totalSwiped: 0,
      totalCorrect: 0,
      currentStreak: 0,
      bestStreak: 0,
      score: 0
    };
  });

  // Sound State
  const [soundMutedState, setSoundMutedState] = useState(isSoundMuted());

  // Modals
  const [revealedCardState, setRevealedCardState] = useState(null); // { card, userSwipedRight, isCorrect }
  const [detailsCard, setDetailsCard] = useState(null);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Save stats to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_STATS_KEY, JSON.stringify(stats));
  }, [stats]);

  // Filter cards by category
  const filteredCards = cards.filter(card => {
    if (selectedCategory === 'All') return true;
    return card.category === selectedCategory;
  });

  // Handle Swipe Action
  const handleSwipe = useCallback((direction) => {
    if (currentIndex >= filteredCards.length || revealedCardState) return;

    const card = filteredCards[currentIndex];
    const swipedRight = direction === 'right'; // Right = REAL, Left = FAKE
    const isCorrect = swipedRight === card.isTrue;

    playSwipeSound(direction);

    if (isCorrect) {
      playCorrectSound();
    } else {
      playWrongSound();
    }

    // Update Stats & Streaks
    setStats(prev => {
      const newStreak = isCorrect ? prev.currentStreak + 1 : 0;
      const newBest = Math.max(prev.bestStreak, newStreak);
      const newCorrect = isCorrect ? prev.totalCorrect + 1 : prev.totalCorrect;
      const newScore = isCorrect ? prev.score + 100 + (newStreak * 10) : prev.score;

      if (isCorrect && newStreak > 0 && newStreak % 3 === 0) {
        setTimeout(playStreakSound, 300);
      }

      return {
        totalSwiped: prev.totalSwiped + 1,
        totalCorrect: newCorrect,
        currentStreak: newStreak,
        bestStreak: newBest,
        score: newScore
      };
    });

    // Survival Mode Lives Penalty
    if (mode === 'survival' && !isCorrect) {
      setLives(l => Math.max(0, l - 1));
    }

    // Track History for Undo
    setHistory(prev => [...prev, { card, index: currentIndex }]);

    // Show Fact Check Reveal Modal
    setRevealedCardState({
      card,
      userSwipedRight: swipedRight,
      isCorrect
    });
  }, [currentIndex, filteredCards, mode, revealedCardState]);

  // Move to Next Card after viewing Reveal Modal
  const handleNextCard = () => {
    setRevealedCardState(null);
    setCurrentIndex(prev => prev + 1);
  };

  // Undo Last Swipe
  const handleUndo = () => {
    if (history.length === 0 || currentIndex === 0) return;
    const lastItem = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));
    setCurrentIndex(lastItem.index);
    setRevealedCardState(null);
  };

  // Reset Deck
  const handleResetDeck = () => {
    setCurrentIndex(0);
    setHistory([]);
    setRevealedCardState(null);
    if (mode === 'survival') setLives(3);
  };

  // Create Custom Card
  const handleCreateCard = (newCard) => {
    setCards(prev => [newCard, ...prev]);
    setCurrentIndex(0);
  };

  // Fetch Live News from NewsAPI
  const handleFetchLiveNews = async (key) => {
    try {
      const liveCards = await fetchLiveNewsCards(key);
      setCards(liveCards);
      setCurrentIndex(0);
      setShowSettingsModal(false);
    } catch (err) {
      alert(`Error fetching live news: ${err.message}`);
    }
  };

  // Toggle Sound FX
  const handleToggleSound = () => {
    const nextMuted = !soundMutedState;
    setSoundMutedState(nextMuted);
    setSoundMuted(nextMuted);
  };

  // Keyboard Navigation Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showStatsModal || showCreateModal || showSettingsModal) return;

      if (revealedCardState) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleNextCard();
        }
        return;
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleSwipe('right');
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleSwipe('left');
      } else if (e.key === ' ') {
        e.preventDefault();
        if (filteredCards[currentIndex]) {
          setDetailsCard(filteredCards[currentIndex]);
        }
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleUndo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    handleSwipe, 
    revealedCardState, 
    currentIndex, 
    filteredCards, 
    showStatsModal, 
    showCreateModal, 
    showSettingsModal
  ]);

  const accuracyRate = stats.totalSwiped > 0 
    ? Math.round((stats.totalCorrect / stats.totalSwiped) * 100) 
    : 0;

  return (
    <div className="min-h-screen flex flex-col justify-between pb-8 select-none">
      {/* Top Navbar */}
      <Header
        streak={stats.currentStreak}
        score={stats.score}
        accuracy={accuracyRate}
        soundMuted={soundMutedState}
        onToggleSound={handleToggleSound}
        onOpenStats={() => setShowStatsModal(true)}
        onOpenCreate={() => setShowCreateModal(true)}
        onOpenSettings={() => setShowSettingsModal(true)}
        mode={mode}
        lives={lives}
      />

      {/* Main Playing Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-2">
        <ModeSelector
          mode={mode}
          onSelectMode={(m) => { setMode(m); handleResetDeck(); }}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => { setSelectedCategory(cat); setCurrentIndex(0); }}
        />

        <CardStack
          cards={filteredCards}
          currentIndex={currentIndex}
          onSwipe={handleSwipe}
          onOpenDetails={(card) => setDetailsCard(card)}
          onResetDeck={handleResetDeck}
        />

        <SwipeControls
          onSwipeLeft={() => handleSwipe('left')}
          onSwipeRight={() => handleSwipe('right')}
          onUndo={handleUndo}
          onOpenDetails={() => {
            if (filteredCards[currentIndex]) setDetailsCard(filteredCards[currentIndex]);
          }}
          canUndo={history.length > 0 && currentIndex > 0}
        />
      </main>

      {/* Modals & Overlays */}
      {revealedCardState && (
        <RevealModal
          card={revealedCardState.card}
          userSwipedRight={revealedCardState.userSwipedRight}
          isCorrect={revealedCardState.isCorrect}
          onNext={handleNextCard}
          currentStreak={stats.currentStreak}
        />
      )}

      {detailsCard && (
        <RevealModal
          card={detailsCard}
          userSwipedRight={detailsCard.isTrue}
          isCorrect={true}
          onNext={() => setDetailsCard(null)}
          currentStreak={0}
        />
      )}

      {showStatsModal && (
        <StatsModal
          stats={stats}
          onClose={() => setShowStatsModal(false)}
          onResetStats={() => {
            setStats({ totalSwiped: 0, totalCorrect: 0, currentStreak: 0, bestStreak: 0, score: 0 });
            localStorage.removeItem(LOCAL_STORAGE_STATS_KEY);
          }}
        />
      )}

      {showCreateModal && (
        <CreateCardModal
          onClose={() => setShowCreateModal(false)}
          onCreateCard={handleCreateCard}
        />
      )}

      {showSettingsModal && (
        <SettingsModal
          onClose={() => setShowSettingsModal(false)}
          soundMuted={soundMutedState}
          onToggleSound={handleToggleSound}
          onFetchLiveNews={handleFetchLiveNews}
          onResetDeck={handleResetDeck}
        />
      )}
    </div>
  );
}
