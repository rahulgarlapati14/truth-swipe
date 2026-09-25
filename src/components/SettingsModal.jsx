import React, { useState } from 'react';
import { X, Key, Volume2, VolumeX, Keyboard, RefreshCw, Check, Sparkles } from 'lucide-react';
import { getSavedApiKey, saveApiKey } from '../services/newsApi';

export default function SettingsModal({ 
  onClose, 
  soundMuted, 
  onToggleSound, 
  onFetchLiveNews,
  onResetDeck 
}) {
  const [apiKey, setApiKey] = useState(getSavedApiKey());
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveKey = (e) => {
    e.preventDefault();
    saveApiKey(apiKey);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content p-6 sm:p-8 relative">
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-extrabold text-white mb-6 flex items-center gap-2">
          <span>App Settings & News API</span>
        </h2>

        {/* NewsAPI Integration Section */}
        <div className="glass-panel p-5 mb-6">
          <div className="flex items-center gap-2 mb-2 text-sm font-bold text-indigo-400">
            <Key className="w-4 h-4" />
            <span>NewsAPI.org Live Feed Configuration</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            Enter your free <strong>NewsAPI.org</strong> developer API key below to pull live breaking news headlines into your TruthSwipe deck! If left empty, TruthSwipe uses its curated real & debunked fake news deck.
          </p>

          <form onSubmit={handleSaveKey} className="flex gap-2 mb-3">
            <input 
              type="text" 
              placeholder="Paste your NewsAPI Key here..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shrink-0"
            >
              {savedSuccess ? <Check className="w-4 h-4 text-emerald-400" /> : 'Save Key'}
            </button>
          </form>

          {apiKey && (
            <button
              onClick={() => onFetchLiveNews(apiKey)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <Sparkles className="w-4 h-4" />
              Fetch Live News Stack Now
            </button>
          )}
        </div>

        {/* Audio Preferences */}
        <div className="glass-panel p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {soundMuted ? <VolumeX className="w-5 h-5 text-slate-500" /> : <Volume2 className="w-5 h-5 text-cyan-400" />}
            <div>
              <div className="text-sm font-bold text-white">Sound Effects (Web Audio FX)</div>
              <div className="text-xs text-slate-400">Audio chimes on card swipes, wins, and streaks</div>
            </div>
          </div>
          <button
            onClick={onToggleSound}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              soundMuted ? 'bg-slate-800 text-slate-400' : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
            }`}
          >
            {soundMuted ? 'OFF' : 'ON'}
          </button>
        </div>

        {/* Keyboard Shortcuts Guide */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Keyboard className="w-4 h-4 text-slate-400" />
            Keyboard Controls
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
            <div className="bg-slate-900/60 p-2.5 rounded-xl border border-white/5 flex items-center justify-between">
              <span>Mark as Fake News</span>
              <kbd className="px-2 py-0.5 bg-slate-800 rounded text-[11px] font-mono border border-slate-700">← Left</kbd>
            </div>
            <div className="bg-slate-900/60 p-2.5 rounded-xl border border-white/5 flex items-center justify-between">
              <span>Mark as Real News</span>
              <kbd className="px-2 py-0.5 bg-slate-800 rounded text-[11px] font-mono border border-slate-700">Right →</kbd>
            </div>
            <div className="bg-slate-900/60 p-2.5 rounded-xl border border-white/5 flex items-center justify-between">
              <span>Fact Check Clues</span>
              <kbd className="px-2 py-0.5 bg-slate-800 rounded text-[11px] font-mono border border-slate-700">Space</kbd>
            </div>
            <div className="bg-slate-900/60 p-2.5 rounded-xl border border-white/5 flex items-center justify-between">
              <span>Undo Last Swipe</span>
              <kbd className="px-2 py-0.5 bg-slate-800 rounded text-[11px] font-mono border border-slate-700">Backspace</kbd>
            </div>
          </div>
        </div>

        {/* Deck Reset */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={onResetDeck}
            className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset News Card Stack
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
          >
            Close Settings
          </button>
        </div>
      </div>
    </div>
  );
}
