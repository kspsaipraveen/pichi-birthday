import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, Heart } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export const MemoryJar = () => {
  const jarConfig = birthdayData.memoryJar;
  const [selectedNote, setSelectedNote] = useState(null);

  if (!jarConfig || !jarConfig.enabled) return null;

  const pickRandomMemory = () => {
    const notes = jarConfig.notes || [];
    const randomIndex = Math.floor(Math.random() * notes.length);
    setSelectedNote(notes[randomIndex]);
  };

  return (
    <div className="relative w-full py-16 px-4 max-w-2xl mx-auto flex flex-col items-center text-center">
      <div className="space-y-2 mb-8">
        <span className="text-xs font-mono tracking-widest text-pink-300 uppercase">
          Interactive Memory Jar
        </span>
        <h3 className="text-2xl sm:text-3xl font-serif text-slate-100 font-light">
          {jarConfig.title}
        </h3>
        <p className="text-xs text-slate-400 font-light">
          {jarConfig.subtitle}
        </p>
      </div>

      <div
        onClick={pickRandomMemory}
        className="group relative cursor-pointer w-48 h-56 rounded-3xl glass-panel border-2 border-white/20 hover:border-amber-400/50 flex flex-col items-center justify-center p-6 shadow-2xl transition-all hover:scale-105"
      >
        <div className="text-5xl mb-2 group-hover:scale-110 transition-transform">🫙</div>
        <span className="text-xs font-mono text-amber-300 uppercase tracking-widest group-hover:text-white">
          Pick A Memory
        </span>
        <div className="absolute top-3 right-3 text-white/30 group-hover:text-amber-300 transition-colors">
          <Sparkles className="w-4 h-4" />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {selectedNote && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="mt-8 p-6 rounded-2xl glass-card border border-amber-400/40 max-w-lg w-full text-center space-y-3 shadow-2xl"
          >
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-pink-300">
              <Heart className="w-4 h-4 fill-pink-400" />
              <span>Drawn From The Jar</span>
            </div>
            <p className="text-base sm:text-lg font-serif text-slate-100 font-light italic leading-relaxed">
              "{selectedNote}"
            </p>
            <button
              onClick={pickRandomMemory}
              className="pt-2 text-xs font-mono text-amber-300/80 hover:text-amber-300 flex items-center gap-1.5 mx-auto transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Draw Another Memory</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
