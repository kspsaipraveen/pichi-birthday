import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { ImageWithFallback } from './MediaFallback';
import { useAudio } from '../context/AudioContext';

export const ChildhoodSection = ({ onNext }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const { playTrack } = useAudio();

  const items = birthdayData.childhood || [];
  const currentItem = items[slideIndex] || items[0];

  useEffect(() => {
    playTrack('childhood');
  }, []);

  const handleNextSlide = () => {
    if (slideIndex < items.length - 1) {
      setSlideIndex((prev) => prev + 1);
    } else {
      if (onNext) onNext();
    }
  };

  return (
    <div className="relative min-h-screen w-full py-16 px-4 sm:px-8 max-w-4xl mx-auto flex flex-col items-center justify-center text-center select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-amber-500/10 via-purple-900/10 to-transparent blur-3xl pointer-events-none" />

      {/* Header Tag */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 space-y-2"
      >
        <span className="text-xs font-mono tracking-widest text-amber-300 uppercase">
          Chapter I — Childhood
        </span>
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mx-auto" />
      </motion.div>

      {/* Cartoon Photo Frame */}
      <div className="relative z-10 w-full max-w-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id || slideIndex}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative min-h-[380px] sm:min-h-[500px] max-h-[70vh] w-full rounded-3xl overflow-hidden glass-panel border border-amber-400/30 shadow-2xl p-4 flex flex-col items-center justify-center bg-slate-950/80"
          >
            <ImageWithFallback
              src={currentItem.image}
              alt={currentItem.title}
              className="w-full h-full max-h-[60vh] object-contain rounded-2xl animate-kenburns"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-75 pointer-events-none" />

            {/* Cinematic Overlay Text */}
            <div className="absolute bottom-6 left-0 right-0 p-6 space-y-2">
              <span className="text-sm font-mono text-amber-300 uppercase tracking-widest">
                {currentItem.title}
              </span>
              <p className="text-base sm:text-xl font-serif text-slate-100 font-light italic drop-shadow-md">
                "{currentItem.caption}"
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Progress / Next Button */}
        <div className="mt-8 flex items-center justify-between">
          <div className="flex gap-2">
            {items.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all ${
                  idx === slideIndex ? 'w-6 bg-amber-400' : 'w-2 bg-white/20'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNextSlide}
            className="px-6 py-2.5 rounded-full glass-panel border border-amber-400/40 hover:border-amber-400 text-amber-200 hover:text-white text-xs font-mono tracking-widest uppercase flex items-center gap-2 transition-all hover:scale-105 shadow-xl"
          >
            <span>{slideIndex < items.length - 1 ? 'Next Memory' : 'Continue →'}</span>
            <ArrowRight className="w-4 h-4 text-amber-300" />
          </button>
        </div>
      </div>
    </div>
  );
};
