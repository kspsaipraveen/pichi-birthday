import React from 'react';
import { motion } from 'framer-motion';
import { Heart, RotateCcw, Sparkles } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { ImageWithFallback } from './MediaFallback';

export const FinalMessage = ({ onReplay }) => {
  const { heading, name, lines } = birthdayData.finalMessage;
  const finalImage = birthdayData.wish?.image || "/assets/images/final_birthday.png";

  return (
    <div className="relative min-h-screen w-full py-20 px-4 sm:px-8 max-w-4xl mx-auto flex flex-col items-center justify-center text-center space-y-12 select-none">
      {/* Grand Final Typography Message */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="space-y-6 max-w-2xl"
      >
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="space-y-2"
        >
          <span className="text-xs font-mono tracking-widest text-amber-300 uppercase">
            {heading}
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif text-amber-200 font-light tracking-wide drop-shadow-2xl">
            {name}
          </h1>
        </motion.div>

        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />

        <div className="space-y-3 text-base sm:text-xl font-serif text-slate-200 font-light italic leading-relaxed">
          {lines.map((line, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.3 }}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </motion.div>

      {/* Hero Final Photograph */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="relative w-full max-w-md min-h-[360px] sm:min-h-[460px] rounded-3xl overflow-hidden glass-panel border border-amber-400/30 shadow-2xl p-4 flex flex-col items-center justify-center bg-slate-950/80 group"
      >
        <ImageWithFallback
          src={finalImage}
          alt="Happy Birthday Himmu"
          className="w-full h-full max-h-[60vh] object-contain rounded-2xl animate-kenburns"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-75 pointer-events-none" />

        <div className="absolute bottom-6 left-0 right-0 p-4 text-center">
          <span className="text-sm font-serif text-amber-200 tracking-widest uppercase font-light">
            Happy Birthday Himmu ❤️
          </span>
        </div>
      </motion.div>

      {/* Replay Button */}
      {onReplay && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="pt-4"
        >
          <button
            onClick={onReplay}
            className="px-8 py-3.5 rounded-full glass-panel border border-amber-400/40 hover:border-amber-400 text-amber-200 hover:text-white text-xs font-mono tracking-widest uppercase flex items-center gap-3 transition-all hover:scale-105 shadow-xl group"
          >
            <RotateCcw className="w-4 h-4 group-hover:-rotate-180 transition-transform duration-700" />
            <span>Replay ❤️</span>
          </button>
        </motion.div>
      )}

      {/* Footer credits */}
      <div className="pt-12 text-center text-xs font-mono text-slate-600">
        Created with love, specifically for you ❤️
      </div>
    </div>
  );
};
