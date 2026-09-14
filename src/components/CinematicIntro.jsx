import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { useAudio } from '../context/AudioContext';

export const CinematicIntro = ({ onBegin }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const { unlockAudio } = useAudio();

  const intro = birthdayData.intro;
  const lines = [
    intro.line1,
    intro.line2,
    intro.line3,
    intro.line4,
    birthdayData.name
  ];

  // Per-line display durations (5 seconds for line 1-4, 1s for name header before button)
  const lineDurations = [5000, 5000, 5000, 5000, 1000];

  useEffect(() => {
    if (currentLineIndex < lines.length - 1) {
      const duration = lineDurations[currentLineIndex] || 5000;
      const timer = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
      }, duration);
      return () => clearTimeout(timer);
    } else {
      const buttonTimer = setTimeout(() => {
        setShowButton(true);
      }, 1000);
      return () => clearTimeout(buttonTimer);
    }
  }, [currentLineIndex, lines.length]);

  const handleStart = () => {
    unlockAudio();
    if (onBegin) onBegin();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-12 bg-slate-950 overflow-hidden text-center select-none">
      {/* Subtle radial ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-amber-500/10 via-purple-900/10 to-transparent blur-3xl pointer-events-none" />

      {/* Narrative lines display */}
      <div className="relative z-10 max-w-3xl min-h-[160px] flex items-center justify-center px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLineIndex}
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            {currentLineIndex === lines.length - 1 ? (
              <h1 className="text-4xl sm:text-6xl font-serif tracking-wider text-amber-200 font-light drop-shadow-2xl">
                {lines[currentLineIndex]}
              </h1>
            ) : (
              <p className="text-xl sm:text-3xl md:text-4xl font-serif tracking-wide text-slate-100 leading-relaxed font-light drop-shadow-md">
                "{lines[currentLineIndex]}"
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Begin Experience Button */}
      <div className="relative z-10 mt-16 min-h-[60px]">
        {showButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            onClick={handleStart}
            className="group relative px-8 py-3.5 rounded-full glass-panel border border-amber-400/30 hover:border-amber-400/70 text-amber-200 hover:text-white font-mono tracking-widest text-sm uppercase transition-all duration-500 shadow-2xl flex items-center gap-3 hover:scale-105 active:scale-95 focus:outline-none"
          >
            <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
            <span>{intro.buttonText}</span>
            <Heart className="w-4 h-4 text-pink-400 fill-pink-400/30 group-hover:scale-125 transition-transform" />
          </motion.button>
        )}
      </div>

      {/* Skip Intro small hint */}
      {!showButton && (
        <button
          onClick={() => {
            setShowButton(true);
            setCurrentLineIndex(lines.length - 1);
          }}
          className="absolute bottom-8 text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-widest"
        >
          Skip Intro →
        </button>
      )}
    </div>
  );
};
