import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { ImageWithFallback } from './MediaFallback';
import { useAudio } from '../context/AudioContext';

export const FatherDaughterSection = ({ onNext }) => {
  const [textStep, setTextStep] = useState(0);
  const { playTrack } = useAudio();

  const fd = birthdayData.fatherDaughter;

  useEffect(() => {
    playTrack('father');
  }, []);

  useEffect(() => {
    if (textStep < 4) {
      const timer = setTimeout(() => {
        setTextStep((prev) => prev + 1);
      }, 2800);
      return () => clearTimeout(timer);
    }
  }, [textStep]);

  return (
    <div className="relative min-h-screen w-full bg-slate-950 py-16 px-4 sm:px-8 max-w-4xl mx-auto flex flex-col items-center justify-center text-center select-none overflow-hidden">
      {/* Soft warm light glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-amber-600/5 blur-3xl pointer-events-none" />

      {/* Header Tag */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 space-y-2"
      >
        <span className="text-xs font-mono tracking-widest text-amber-300/70 uppercase">
          Chapter IV — In Loving Memory
        </span>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent mx-auto" />
      </motion.div>

      {/* Father Daughter Photo Box */}
      <div className="relative z-10 w-full max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="relative min-h-[380px] sm:min-h-[500px] max-h-[70vh] w-full rounded-3xl overflow-hidden glass-panel border border-amber-500/20 shadow-2xl p-4 flex flex-col items-center justify-center bg-slate-950/80"
        >
          <ImageWithFallback
            src={fd.image}
            alt="Father and Daughter"
            className="w-full h-full max-h-[60vh] object-contain rounded-2xl animate-kenburns"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-75 pointer-events-none" />

          {/* Sequential Text Sequence */}
          <div className="absolute bottom-6 left-0 right-0 p-6 space-y-2">
            <AnimatePresence mode="wait">
              {textStep === 0 && (
                <motion.p
                  key="t0"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-lg font-serif text-slate-200 italic"
                >
                  "{fd.line1}"
                </motion.p>
              )}

              {textStep === 1 && (
                <motion.p
                  key="t1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-lg sm:text-xl font-serif text-amber-200 font-light italic"
                >
                  "{fd.line2}"
                </motion.p>
              )}

              {textStep === 2 && (
                <motion.p
                  key="t2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-base sm:text-lg font-serif text-slate-200 font-light italic"
                >
                  "{fd.line3}"
                </motion.p>
              )}

              {textStep >= 3 && (
                <motion.div
                  key="t3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <p className="text-sm sm:text-base font-serif text-slate-300 font-light italic">
                    "{fd.line4}"
                  </p>
                  <h3 className="text-base sm:text-lg font-serif text-amber-300 font-normal pt-1">
                    "{fd.line5}"
                  </h3>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Continue Button to Video */}
        {textStep >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex justify-center"
          >
            <button
              onClick={onNext}
              className="px-8 py-3.5 rounded-full glass-panel border border-amber-400/40 hover:border-amber-400 text-amber-200 hover:text-white text-xs font-mono tracking-widest uppercase flex items-center gap-3 transition-all hover:scale-105 shadow-xl group"
            >
              <span>Watch Message ❤️</span>
              <ArrowRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
