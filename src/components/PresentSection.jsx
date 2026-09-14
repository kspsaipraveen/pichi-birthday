import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, ArrowRight } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { ImageWithFallback } from './MediaFallback';
import { useAudio } from '../context/AudioContext';

export const PresentSection = ({ onNext }) => {
  const [textStep, setTextStep] = useState(0);
  const { playTrack } = useAudio();

  const present = birthdayData.present;

  useEffect(() => {
    playTrack('present');
  }, []);

  useEffect(() => {
    if (textStep < 3) {
      const timer = setTimeout(() => {
        setTextStep((prev) => prev + 1);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [textStep]);

  return (
    <div className="relative min-h-screen w-full py-16 px-4 sm:px-8 max-w-4xl mx-auto flex flex-col items-center justify-center text-center select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-pink-500/10 via-purple-900/10 to-transparent blur-3xl pointer-events-none" />

      {/* Header Tag */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 space-y-2"
      >
        <span className="text-xs font-mono tracking-widest text-pink-300 uppercase">
          Chapter II — Present
        </span>
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-pink-400/50 to-transparent mx-auto" />
      </motion.div>

      {/* Present Cartoon Photo Frame */}
      <div className="relative z-10 w-full max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="relative min-h-[380px] sm:min-h-[500px] max-h-[70vh] w-full rounded-3xl overflow-hidden glass-panel border border-pink-400/30 shadow-2xl p-4 flex flex-col items-center justify-center bg-slate-950/80"
        >
          <ImageWithFallback
            src={present.image}
            alt="Present Portrait"
            className="w-full h-full max-h-[60vh] object-contain rounded-2xl animate-kenburns"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-75 pointer-events-none" />

          {/* Sequential Text Reveals */}
          <div className="absolute bottom-6 left-0 right-0 p-6 space-y-3">
            <AnimatePresence mode="wait">
              {textStep === 0 && (
                <motion.p
                  key="p0"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-lg font-serif text-slate-200 italic"
                >
                  "{present.line1}"
                </motion.p>
              )}

              {textStep === 1 && (
                <motion.p
                  key="p1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-lg sm:text-xl font-serif text-slate-100 font-light italic"
                >
                  "{present.line2}"
                </motion.p>
              )}

              {textStep >= 2 && (
                <motion.div
                  key="p2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <p className="text-base sm:text-lg font-serif text-slate-200 font-light italic">
                    "{present.line3}"
                  </p>
                  <h3 className="text-xl sm:text-2xl font-serif text-pink-300 font-medium pt-1">
                    {present.wish}
                  </h3>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Continue Button */}
        {textStep >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex justify-center"
          >
            <button
              onClick={onNext}
              className="px-8 py-3.5 rounded-full glass-panel border border-pink-500/40 hover:border-pink-400 text-pink-200 hover:text-white text-xs font-mono tracking-widest uppercase flex items-center gap-3 transition-all hover:scale-105 shadow-xl group"
            >
              <span>Step Into Her World ❤️</span>
              <ArrowRight className="w-4 h-4 text-pink-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
