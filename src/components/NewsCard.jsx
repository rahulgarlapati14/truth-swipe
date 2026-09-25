import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Info, Newspaper } from 'lucide-react';

export default function NewsCard({ 
  card, 
  isTop, 
  onSwipe, 
  onOpenDetails 
}) {
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
      <div className="absolute top-0 left-0 right-0 w-full h-[560px] max-w-[380px] mx-auto tinder-full-card pointer-events-none scale-[0.95] translate-y-3 opacity-40 transition-all duration-300">
        <img src={card.image} alt="" className="w-full h-full object-cover filter brightness-75" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <span className="bg-emerald-500/90 text-slate-950 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
            {card.category}
          </span>
          <h2 className="text-xl font-black text-white mt-2 line-clamp-2">{card.headline}</h2>
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
      className="absolute top-0 left-0 right-0 w-full h-[560px] max-w-[380px] mx-auto tinder-full-card cursor-grab z-10"
    >
      {/* Giant Visual Stamps */}
      <motion.div style={{ opacity: realOpacity }} className="stamp-giant stamp-giant-real">
        REAL
      </motion.div>
      <motion.div style={{ opacity: fakeOpacity }} className="stamp-giant stamp-giant-fake">
        FAKE
      </motion.div>

      {/* 100% Full-Screen Card Photo */}
      <img 
        src={card.image} 
        alt={card.headline} 
        className="w-full h-full object-cover"
      />

      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />

      {/* Top Card Floating Badges */}
      <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-20">
        <span className="bg-emerald-400 text-slate-950 px-3.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider shadow-lg">
          {card.category}
        </span>

        <span className="bg-black/60 backdrop-blur-md text-white/90 px-3 py-1 rounded-full text-[11px] font-bold border border-white/20 flex items-center gap-1.5 shadow-md">
          <Newspaper className="w-3.5 h-3.5 text-cyan-400" />
          {card.source}
        </span>
      </div>

      {/* Bottom Floating Headline & Info Trigger */}
      <div className="absolute bottom-6 left-6 right-6 z-20 flex items-end justify-between gap-3">
        <div className="flex-1">
          <div className="text-[11px] font-bold text-slate-300 uppercase tracking-widest mb-1.5 opacity-90">
            {card.publishDate} • {card.readTime}
          </div>
          
          <h2 className="text-xl font-extrabold text-white leading-snug drop-shadow-md line-clamp-3">
            {card.headline}
          </h2>
        </div>

        {/* Info Trigger Button directly on Card */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetails(card);
          }}
          className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shrink-0 transition-all shadow-lg"
          title="Fact-Check Analysis"
        >
          <Info className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>
    </motion.div>
  );
}
