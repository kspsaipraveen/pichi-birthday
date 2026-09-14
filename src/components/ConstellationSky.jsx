import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, Sparkles, X } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export const ConstellationSky = () => {
  const config = birthdayData.constellation;
  const [activeStar, setActiveStar] = useState(null);
  const [clickedStars, setClickedStars] = useState(new Set());

  if (!config || !config.enabled) return null;

  const stars = config.stars || [];

  const handleStarClick = (star) => {
    setActiveStar(star);
    setClickedStars((prev) => new Set(prev).add(star.id));
  };

  return (
    <div className="relative w-full py-16 px-4 max-w-4xl mx-auto flex flex-col items-center text-center">
      <div className="space-y-2 mb-8">
        <span className="text-xs font-mono tracking-widest text-amber-300 uppercase">
          Constellation Of Us
        </span>
        <h3 className="text-2xl sm:text-3xl font-serif text-slate-100 font-light">
          {config.title}
        </h3>
        <p className="text-xs text-slate-400 font-light">
          {config.subtitle}
        </p>
      </div>

      {/* Constellation Canvas / Sky Container */}
      <div className="relative w-full h-80 sm:h-96 rounded-3xl glass-panel border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center bg-slate-950">
        {/* Subtle background galaxy effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)]" />

        {/* SVG Constellation Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <polyline
            points={stars.map((s) => `${s.x}%,${s.y}%`).join(' ')}
            fill="none"
            stroke="rgba(212, 175, 55, 0.25)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
        </svg>

        {/* Constellation Stars */}
        {stars.map((star) => {
          const isClicked = clickedStars.has(star.id);
          return (
            <motion.button
              key={star.id}
              onClick={() => handleStarClick(star)}
              whileHover={{ scale: 1.4 }}
              style={{ top: `${star.y}%`, left: `${star.x}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none z-10"
            >
              <div className="relative flex items-center justify-center">
                <Star
                  className={`w-6 h-6 sm:w-7 sm:h-7 transition-colors ${
                    isClicked
                      ? 'text-amber-300 fill-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.8)]'
                      : 'text-slate-400 fill-slate-700 hover:text-amber-200'
                  }`}
                />
                <span className="absolute -bottom-5 text-[10px] font-mono text-slate-400 whitespace-nowrap group-hover:text-amber-200">
                  {star.date}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Selected Star Memory Modal / Card */}
      <AnimatePresence>
        {activeStar && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="mt-6 p-6 rounded-2xl glass-card border border-amber-400/40 max-w-md w-full relative shadow-2xl space-y-2 text-left"
          >
            <button
              onClick={() => setActiveStar(null)}
              className="absolute top-3 right-3 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-amber-300 tracking-wider uppercase">
              {activeStar.date}
            </span>
            <p className="text-sm font-serif text-slate-200 font-light leading-relaxed">
              "{activeStar.text}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
