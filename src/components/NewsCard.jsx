import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ExternalLink, Calendar, Newspaper, Sparkles } from 'lucide-react';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=1000&auto=format&fit=crop';

export default function NewsCard({ 
  card, 
  isTop, 
  onSwipe, 
  onOpenDetails 
}) {
  const [imgSrc, setImgSrc] = useState(card.image || FALLBACK_IMAGE);
  const x = useMotionValue(0);
  
  const rotate = useTransform(x, [-200, 200], [-12, 12]);
  const realOpacity = useTransform(x, [15, 90], [0, 1]);
  const fakeOpacity = useTransform(x, [-15, -90], [0, 1]);

  const handleDragEnd = (e, info) => {
    const threshold = 100;
    const velocity = 350;

    if (info.offset.x > threshold || info.velocity.x > velocity) {
      onSwipe('right');
    } else if (info.offset.x < -threshold || info.velocity.x < -velocity) {
      onSwipe('left');
    }
  };

  if (!isTop) {
    return (
      <div className="absolute top-0 left-0 right-0 w-full h-[530px] max-w-sm mx-auto worldclass-card pointer-events-none scale-[0.95] translate-y-3 opacity-50 transition-all duration-300">
        <div className="w-full h-64 bg-slate-900 overflow-hidden">
          <img src={imgSrc} alt="" className="w-full h-full object-cover filter brightness-75" />
        </div>
        <div className="p-6">
          <span className="badge-category-glow inline-block mb-2">{card.category}</span>
          <h2 className="text-xl font-extrabold text-slate-200 line-clamp-2">{card.headline}</h2>
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
      className="absolute top-0 left-0 right-0 w-full h-[530px] max-w-sm mx-auto worldclass-card cursor-grab z-10"
    >
      {/* Dynamic Glowing Stamps */}
      <motion.div style={{ opacity: realOpacity }} className="stamp-glow stamp-glow-real">
        REAL
      </motion.div>
      <motion.div style={{ opacity: fakeOpacity }} className="stamp-glow stamp-glow-fake">
        FAKE
      </motion.div>

      {/* Card Photo Header */}
      <div className="relative w-full h-64 bg-slate-900 overflow-hidden">
        <img 
          src={imgSrc} 
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          alt={card.headline} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141c2d] via-[#141c2d]/40 to-transparent" />
        
        {/* Floating Category & Source Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <span className="badge-category-glow">{card.category}</span>
          <span className="glass-pill px-3 py-1 text-[11px] font-semibold text-slate-200 flex items-center gap-1.5 shadow-md">
            <Newspaper className="w-3.5 h-3.5 text-cyan-400" />
            {card.source}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-6 flex flex-col justify-between h-[274px] bg-[#141c2d]/90 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>{card.publishDate}</span>
            <span>•</span>
            <span>{card.readTime}</span>
          </div>

          <h2 className="text-xl font-extrabold text-white leading-snug mb-2 line-clamp-3">
            {card.headline}
          </h2>

          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
            {card.summary}
          </p>
        </div>

        {/* Bottom Card Footer */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={() => onOpenDetails(card)}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Fact-Check Clues & Deep Dive</span>
            <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
          
          <span className="text-[11px] text-slate-400 italic">Right: Real | Left: Fake</span>
        </div>
      </div>
    </motion.div>
  );
}
