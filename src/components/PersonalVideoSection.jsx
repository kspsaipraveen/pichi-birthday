import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { VideoPlayer } from './VideoPlayer';
import { useAudio } from '../context/AudioContext';

export const PersonalVideoSection = ({ onNext }) => {
  const [stage, setStage] = useState('intro'); // 'intro' -> 'video'
  const [introStep, setIntroStep] = useState(0);
  const { playTrack } = useAudio();

  const header = birthdayData.myVideoHeader;
  const videoSrc = birthdayData.myBirthdayVideo;

  useEffect(() => {
    if (stage === 'intro') {
      if (introStep === 0) {
        const t1 = setTimeout(() => setIntroStep(1), 2800);
        return () => clearTimeout(t1);
      } else {
        const t2 = setTimeout(() => {
          setStage('video');
          playTrack('intro');
        }, 2800);
        return () => clearTimeout(t2);
      }
    }
  }, [stage, introStep]);

  return (
    <div className="relative min-h-screen w-full py-20 px-4 sm:px-8 max-w-4xl mx-auto flex flex-col items-center justify-center text-center select-none">
      {/* STAGE 1: INTRO LINES ("And now... Something from me.") */}
      {stage === 'intro' && (
        <div className="relative z-10 max-w-xl px-6 min-h-[140px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={introStep}
              initial={{ opacity: 0, y: 15, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -15, filter: 'blur(6px)' }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="text-2xl sm:text-4xl font-serif text-slate-100 font-light italic"
            >
              {introStep === 0 ? `"${header.intro1}"` : `"${header.intro2}"`}
            </motion.p>
          </AnimatePresence>
        </div>
      )}

      {/* STAGE 2: PERSONAL VIDEO PLAYER */}
      {stage === 'video' && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full glass-panel rounded-3xl border border-pink-500/20 p-6 sm:p-10 space-y-8 shadow-2xl"
        >
          <div className="space-y-2">
            <span className="text-xs font-mono tracking-widest text-pink-300 uppercase">
              Chapter V — My Birthday Wish
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-slate-100 font-light">
              Something From Me
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-pink-400/50 to-transparent mx-auto" />
          </div>

          {/* My Video Container */}
          <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <VideoPlayer
              src={videoSrc}
              onPlayStateChange={(playing) => {
                if (playing) playTrack('silence');
                else playTrack('intro');
              }}
            />
          </div>

          {/* Continue to Grand Celebration */}
          <div className="pt-4 border-t border-white/10 flex justify-center">
            <button
              onClick={onNext}
              className="px-8 py-3.5 rounded-full glass-panel border border-amber-400/40 hover:border-amber-400 text-amber-200 hover:text-white text-xs font-mono tracking-widest uppercase flex items-center gap-3 transition-all hover:scale-105 shadow-xl group"
            >
              <span>Let's Celebrate You 🎂</span>
              <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
