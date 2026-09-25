import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=1000&auto=format&fit=crop';

export default function NewsCard({ 
  card, 
  isTop, 
  onSwipe, 
  onOpenDetails 
}) {
  const [imgSrc, setImgSrc] = useState(card.image || FALLBACK_IMAGE);
  const x = useMotionValue(0);
  
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const realOpacity = useTransform(x, [15, 90], [0, 1]);
  const fakeOpacity = useTransform(x, [-15, -90], [0, 1]);

  const handleDragEnd = (e, info) => {
    const threshold = 90;
    const velocity = 300;

    if (info.offset.x > threshold || info.velocity.x > velocity) {
      onSwipe('right');
    } else if (info.offset.x < -threshold || info.velocity.x < -velocity) {
      onSwipe('left');
    }
  };

  if (!isTop) {
    return (
      <div className="absolute top-0 left-0 right-0 w-full h-[520px] max-w-sm mx-auto simple-card pointer-events-none scale-[0.95] translate-y-3 opacity-40 transition-all duration-300">
        <div className="w-full h-48 bg-slate-200 overflow-hidden">
          <img src={imgSrc} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="p-6">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">{card.category}</span>
          <h2 className="text-xl font-extrabold text-slate-900 mt-1 line-clamp-2">{card.headline}</h2>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileGrab={{ cursor: 'grabbing' }}
      className="absolute top-0 left-0 right-0 w-full h-[520px] max-w-sm mx-auto simple-card cursor-grab z-10"
    >
      {/* Clear Stamps */}
      <motion.div style={{ opacity: realOpacity }} className="stamp-simple stamp-simple-real">
        REAL
      </motion.div>
      <motion.div style={{ opacity: fakeOpacity }} className="stamp-simple stamp-simple-fake">
        FAKE
      </motion.div>

      {/* Photo Banner */}
      <div className="relative w-full h-48 bg-slate-100 overflow-hidden">
        <img 
          src={imgSrc} 
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          alt={card.headline} 
          className="w-full h-full object-cover"
        />
        
        {/* Category & Source Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-wide shadow">
            {card.category}
          </span>
          <span className="bg-slate-900/80 text-white px-3 py-1 rounded-full text-xs font-bold border border-white/20">
            {card.source}
          </span>
        </div>
      </div>

      {/* Card Body - 100% Readable Story */}
      <div className="p-5 flex flex-col justify-between h-[328px] bg-white">
        <div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
            {card.publishDate} • {card.readTime}
          </div>
          
          <h2 className="text-xl font-extrabold text-slate-900 leading-snug mb-3">
            {card.headline}
          </h2>

          <p className="text-sm text-slate-600 leading-relaxed font-medium line-clamp-4">
            {card.summary}
          </p>
        </div>

        {/* Fact-Check Details Trigger */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(card);
            }}
            className="text-indigo-600 hover:text-indigo-800 font-extrabold text-xs flex items-center gap-1"
          >
            ℹ️ Read Fact-Check Clues
          </button>
          
          <span className="text-[11px] font-bold text-slate-400">Right: Real | Left: Fake</span>
        </div>
      </div>
    </motion.div>
  );
}
