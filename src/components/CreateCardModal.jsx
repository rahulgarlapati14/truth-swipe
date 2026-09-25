import React, { useState } from 'react';
import { X, Plus, Sparkles, Image, Newspaper } from 'lucide-react';
import { CATEGORIES } from '../data/newsCards';

export default function CreateCardModal({ onClose, onCreateCard }) {
  const [headline, setHeadline] = useState('');
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState('Tech & AI');
  const [source, setSource] = useState('Community News Post');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=1000&auto=format&fit=crop');
  const [isTrue, setIsTrue] = useState(true);
  const [explanation, setExplanation] = useState('');
  const [redFlag, setRedFlag] = useState('');
  const [redFlags, setRedFlags] = useState(['✅ Verified by official sources']);

  const handleAddFlag = () => {
    if (redFlag.trim()) {
      setRedFlags([...redFlags, redFlag.trim()]);
      setRedFlag('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!headline || !summary || !explanation) return;

    const newCard = {
      id: `custom-${Date.now()}`,
      headline,
      summary,
      category,
      source,
      image: image || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=1000&auto=format&fit=crop',
      publishDate: new Date().toISOString().split('T')[0],
      readTime: '2 min read',
      isTrue,
      verdict: isTrue ? 'Verified Real Story' : 'Fabricated Fake Claim',
      trustScore: isTrue ? 95 : 12,
      redFlags: redFlags.length > 0 ? redFlags : [isTrue ? '✅ Verified sources' : '🚨 Unverified claim'],
      explanation,
      consensusFake: isTrue ? 15 : 85,
      fullArticleUrl: '#'
    };

    onCreateCard(newCard);
    onClose();
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

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-indigo-600 p-0.5 shadow-lg shadow-emerald-500/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">Create Custom News Card</h2>
            <p className="text-xs text-slate-400">Test your friends or generate news scenarios</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Headline *
            </label>
            <input 
              type="text" 
              required 
              placeholder="e.g. Breakthrough Battery Technology Allows 1000 Mile EV Charge in 5 Minutes"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                {CATEGORIES.filter(c => c !== 'All').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Source Name
              </label>
              <input 
                type="text" 
                placeholder="e.g. MIT Tech Review"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Article Teaser Summary *
            </label>
            <textarea 
              required
              rows={2}
              placeholder="Brief news article summary preview shown on card..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Is True / Is Fake Radio Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Is This News Real or Fake? *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIsTrue(true)}
                className={`py-3 rounded-xl border text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  isTrue ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-500/20' : 'bg-slate-900 border-white/10 text-slate-400'
                }`}
              >
                ✅ REAL NEWS
              </button>

              <button
                type="button"
                onClick={() => setIsTrue(false)}
                className={`py-3 rounded-xl border text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  !isTrue ? 'bg-red-500/20 border-red-500 text-red-400 shadow-lg shadow-red-500/20' : 'bg-slate-900 border-white/10 text-slate-400'
                }`}
              >
                🚨 FAKE NEWS / HOAX
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Detailed Fact Check Explanation *
            </label>
            <textarea 
              required
              rows={3}
              placeholder="Explain why this story is real or fake so readers learn..."
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Image URL (Optional)
            </label>
            <input 
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-emerald-500 hover:from-indigo-500 hover:to-emerald-400 text-white font-bold text-xs shadow-lg shadow-indigo-500/30"
            >
              Add Card to Deck
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
