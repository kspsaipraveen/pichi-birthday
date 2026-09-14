import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, ArrowRight, Wand2, Star } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { ImageWithFallback } from './MediaFallback';
import { useAudio } from '../context/AudioContext';

export const ChildhoodTransition = ({ onContinueToFriends }) => {
  const [step, setStep] = useState(0); // 0: Childhood, 1: Transforming, 2: Present, 3: Finale Wish
  const { playTrack } = useAudio();

  const childhood = birthdayData.childhood;
  const present = birthdayData.present;
  const transitionText = birthdayData.childhoodToFriendsTransition;

  useEffect(() => {
    playTrack('childhood');
  }, []);

  const handleTransform = () => {
    setStep(1);
    setTimeout(() => {
      setStep(2);
    }, 2800); // Cartoon transformation animation duration
  };

  return (
    <div className="relative min-h-screen w-full py-20 px-4 sm:px-8 max-w-5xl mx-auto flex flex-col items-center justify-center text-center">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-amber-500/10 via-purple-900/10 to-transparent blur-3xl pointer-events-none" />

      {/* Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 space-y-2"
      >
        <span className="text-xs font-mono tracking-widest text-amber-300 uppercase">
          Chapter I — Her Story
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif text-slate-100 font-light">
          Look How Far You've Come
        </h2>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mx-auto" />
      </motion.div>

      {/* Main Illustrated Frame Box */}
      <div className="relative z-10 w-full max-w-xl">
        <div className="relative h-[380px] sm:h-[460px] w-full rounded-3xl overflow-hidden glass-panel border border-amber-400/30 shadow-2xl p-4 sm:p-6 flex flex-col items-center justify-center">
          
          {/* Animated Storybook Cartoon Backdrop */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-950/40 via-slate-950 to-amber-950/30 opacity-90" />

          {/* Floating stardust elements inside frame */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12)_0%,transparent_75%)] pointer-events-none" />

          {/* STEP 0: CHILDHOOD PHOTO */}
          {step === 0 && (
            <motion.div
              key="childhood-img"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 1 }}
              className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-xl group"
            >
              <ImageWithFallback
                src={childhood.image}
                alt="Childhood Memory"
                className="w-full h-full object-cover animate-kenburns"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

              <div className="absolute bottom-6 left-0 right-0 p-4 space-y-1">
                <span className="text-xs font-mono text-amber-300 uppercase tracking-widest">
                  {childhood.onceUponATimeText}
                </span>
                <p className="text-sm sm:text-base font-serif text-slate-200 font-light italic">
                  "{childhood.storyText}"
                </p>
              </div>
            </motion.div>
          )}

          {/* STEP 1: CARTOON TRANSFORMATION ANIMATION */}
          {step === 1 && (
            <motion.div
              key="transforming"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative w-full h-full rounded-2xl overflow-hidden flex flex-col items-center justify-center bg-slate-950 border border-amber-400/50"
            >
              {/* Swirling Stardust Burst */}
              <motion.div
                animate={{ rotate: 360, scale: [0.8, 1.3, 1] }}
                transition={{ duration: 2.8, ease: 'easeInOut' }}
                className="w-48 h-48 rounded-full border-2 border-dashed border-amber-400/60 flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.4)]"
              >
                <Wand2 className="w-12 h-12 text-amber-300 animate-bounce" />
              </motion.div>

              <motion.p
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="mt-6 text-xs font-mono text-amber-200 uppercase tracking-widest"
              >
                Growing Up & Transforming... ✨
              </motion.p>
            </motion.div>
          )}

          {/* STEP 2 & 3: PRESENT DAY PORTRAIT & WISH */}
          {step >= 2 && (
            <motion.div
              key="present-img"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="relative w-full h-full rounded-2xl overflow-hidden border border-amber-400/40 shadow-xl group"
            >
              <ImageWithFallback
                src={present.image}
                alt="Present Day Portrait"
                className="w-full h-full object-cover animate-kenburns"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-85" />

              <div className="absolute bottom-6 left-0 right-0 p-4 space-y-2">
                <span className="text-xs font-mono text-amber-300 uppercase tracking-widest">
                  {present.transformationText}
                </span>
                <p className="text-sm sm:text-base font-serif text-slate-100 font-light italic">
                  "{present.grewIntoText}"
                </p>
                <div className="pt-2 text-pink-300 font-serif text-lg font-medium">
                  {present.birthdayWishText}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Transformation Action Buttons */}
        <div className="mt-8 flex justify-center">
          {step === 0 && (
            <button
              onClick={handleTransform}
              className="px-8 py-3.5 rounded-full glass-panel border border-amber-400/40 hover:border-amber-400 text-amber-200 hover:text-white text-xs font-mono tracking-widest uppercase flex items-center gap-3 transition-all hover:scale-105 shadow-xl group focus:outline-none"
            >
              <Wand2 className="w-4 h-4 text-amber-300 group-hover:rotate-45 transition-transform" />
              <span>See Her Transformation ✨</span>
            </button>
          )}

          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-xl glass-panel p-8 rounded-3xl border border-white/10 space-y-6 shadow-2xl mt-4"
            >
              <p className="text-lg sm:text-2xl font-serif text-slate-200 font-light italic">
                "{transitionText.line1}"
              </p>
              <p className="text-xs sm:text-sm text-pink-300 font-mono">
                {transitionText.line2}
              </p>

              <button
                onClick={onContinueToFriends}
                className="px-8 py-3.5 rounded-full glass-panel border border-pink-500/40 hover:border-pink-400 text-pink-200 hover:text-white font-mono text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-3 mx-auto group shadow-lg hover:scale-105 focus:outline-none"
              >
                <span>A Few People Wanted To Say Something ❤️</span>
                <ArrowRight className="w-4 h-4 text-pink-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
