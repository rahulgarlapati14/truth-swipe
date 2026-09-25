import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ExternalLink, Calendar, Newspaper, Sparkles } from 'lucide-react';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1000&auto=format&fit=crop';

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

  return (
    <motion.div
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileGrab={{ cursor: 'grabbing' }}
      className="worldclass-card cursor-grab z-10"
    >
      {/* Dynamic Glowing Stamps */}
      <motion.div style={{ opacity: realOpacity }} className="stamp-glow stamp-glow-real">
        REAL
      </motion.div>
      <motion.div style={{ opacity: fakeOpacity }} className="stamp-glow stamp-glow-fake">
        FAKE
      </motion.div>

      {/* Card Photo Banner */}
      <div className="relative w-full h-[250px] bg-slate-900 overflow-hidden shrink-0">
        <img 
          src={imgSrc} 
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          alt={card.headline} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141c2d] via-[#141c2d]/30 to-transparent" />
        
        {/* Floating Category & Source Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <span className="badge-category-glow">{card.category}</span>
          <span className="glass-pill px-3 py-1 text-[11px] font-semibold text-slate-200 flex items-center gap-1.5 shadow-md">
            <Newspaper className="w-3.5 h-3.5 text-cyan-400" />
            {card.source}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex flex-col justify-between flex-1 bg-[#141c2d]/95 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1.5 font-semibold">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>{card.publishDate}</span>
            <span>•</span>
            <span>{card.readTime}</span>
          </div>

          <h2 className="text-lg font-extrabold text-white leading-snug mb-2 line-clamp-3">
            {card.headline}
          </h2>

          <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed font-normal">
            {card.summary}
          </p>
        </div>

        {/* Bottom Card Footer */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between mt-2">
          <button
            onClick={() => onOpenDetails(card)}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Fact-Check Clues & Analysis</span>
            <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
          
          <span className="text-[10px] text-slate-400 italic">Right: Real | Left: Fake</span>
        </div>
      </div>
    </motion.div>
  );
}
