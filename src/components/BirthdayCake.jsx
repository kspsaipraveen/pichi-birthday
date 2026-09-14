import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Flame, Heart } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { useAudio } from '../context/AudioContext';

export const BirthdayCake = ({ onCandlesBlown }) => {
  const [litCandles, setLitCandles] = useState([true, true, true]);
  const [allBlown, setAllBlown] = useState(false);

  const { playTrack } = useAudio();

  const blowCandle = (index) => {
    setLitCandles((prev) => {
      const next = [...prev];
      next[index] = false;
      return next;
    });
  };

  const blowAllCandles = () => {
    setLitCandles([false, false, false]);
    if (!allBlown) {
      setAllBlown(true);
      triggerConfettiShower();
      playTrack('finale');
      if (onCandlesBlown) onCandlesBlown();
    }
  };

  // Check if all candles are individually blown out
  useEffect(() => {
    if (litCandles.every((c) => !c) && !allBlown) {
      setAllBlown(true);
      triggerConfettiShower();
      playTrack('finale');
      if (onCandlesBlown) onCandlesBlown();
    }
  }, [litCandles, allBlown]);

  // Confetti Shower Generator
  const triggerConfettiShower = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#d4af37', '#f472b6', '#ffffff']
    });
    fire(0.2, {
      spread: 60,
      colors: ['#ffd700', '#ff69b4', '#00ffff']
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      colors: ['#ffffff', '#ffd700', '#e879f9']
    });
  };

  return (
    <div className="relative w-full min-h-screen py-8 px-4 flex flex-col items-center justify-center text-center select-none overflow-hidden">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-3 mb-10"
      >
        <span className="text-xs font-mono tracking-widest text-amber-300 uppercase">
          One Last Thing...
        </span>
        <h3 className="text-3xl sm:text-4xl font-serif text-slate-100 font-light">
          {birthdayData.birthdayCake.instruction}
        </h3>
      </motion.div>

      {/* SVG Interactive Birthday Cake Container */}
      <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex flex-col items-center justify-end">
        {/* Flames / Candles row */}
        <div className="flex items-end justify-center gap-8 mb-[-12px] z-20">
          {litCandles.map((isLit, idx) => (
            <div
              key={idx}
              onClick={() => blowCandle(idx)}
              className="flex flex-col items-center cursor-pointer group"
              title="Click to blow out candle"
            >
              {/* Flame */}
              <AnimatePresence>
                {isLit ? (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="w-5 h-7 relative flex items-center justify-center flame-animation"
                  >
                    <div className="w-4 h-6 rounded-full bg-gradient-to-t from-amber-500 via-yellow-300 to-white shadow-[0_0_15px_rgba(251,191,36,0.9)]" />
                  </motion.div>
                ) : (
                  <div className="w-5 h-7 flex items-center justify-center">
                    <span className="text-xs font-mono text-slate-500 animate-fade-out">
                      💨
                    </span>
                  </div>
                )}
              </AnimatePresence>

              {/* Candle Body */}
              <div className="w-3.5 h-14 bg-gradient-to-b from-pink-300 via-pink-400 to-purple-500 rounded-t-sm shadow-md border-x border-white/20" />
            </div>
          ))}
        </div>

        {/* Cake Layer 1 (Top) */}
        <div className="w-48 h-16 bg-gradient-to-r from-purple-900 via-slate-800 to-amber-900 rounded-t-3xl border-t-2 border-amber-300/40 shadow-xl flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-3 bg-pink-400/30 rounded-t-3xl" />
          <span className="text-xs font-mono tracking-widest text-amber-200/80 uppercase">
            Make A Wish
          </span>
        </div>

        {/* Cake Layer 2 (Bottom) */}
        <div className="w-64 h-24 bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 rounded-t-2xl border-t border-white/10 shadow-2xl flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-4 bg-amber-400/20 rounded-t-2xl" />
          <div className="flex gap-2 text-pink-300/40">
            <Heart className="w-4 h-4 fill-pink-400/20" />
            <Heart className="w-4 h-4 fill-pink-400/20" />
            <Heart className="w-4 h-4 fill-pink-400/20" />
          </div>
        </div>

        {/* Cake Plate */}
        <div className="w-72 sm:w-80 h-4 bg-gradient-to-r from-slate-700 via-slate-400 to-slate-700 rounded-full shadow-2xl border-t border-white/30" />
      </div>

      {/* Blow Control Button */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        {!allBlown ? (
          <button
            onClick={blowAllCandles}
            className="px-6 py-2.5 rounded-full glass-panel border border-amber-400/40 hover:border-amber-400 text-amber-200 hover:text-white text-xs font-mono tracking-wider uppercase flex items-center gap-2 transition-all hover:scale-105 shadow-lg"
          >
            <Flame className="w-4 h-4 text-amber-300" />
            <span>Tap to Blow Out Candles 💨</span>
          </button>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="px-6 py-3 rounded-full bg-amber-400/20 border border-amber-400/50 text-amber-200 font-serif text-sm sm:text-base flex items-center gap-2 shadow-xl"
          >
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span>{birthdayData.birthdayCake.wishGrantedText}</span>
          </motion.div>
        )}
      </div>
    </div>
  );
};
