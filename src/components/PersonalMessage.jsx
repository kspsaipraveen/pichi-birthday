import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { VideoPlayer } from './VideoPlayer';
import { useAudio } from '../context/AudioContext';

export const PersonalMessage = ({ onContinueToFinale }) => {
  const [stage, setStage] = useState('intro'); // 'intro' -> 'video'
  const [introStep, setIntroStep] = useState(0);
  const { playTrack } = useAudio();

  const myMsg = birthdayData.myMessage;

  useEffect(() => {
    if (stage === 'intro') {
      if (introStep === 0) {
        const t1 = setTimeout(() => setIntroStep(1), 3000);
        return () => clearTimeout(t1);
      } else {
        const t2 = setTimeout(() => {
          setStage('video');
          playTrack('friends');
        }, 3000);
        return () => clearTimeout(t2);
      }
    }
  }, [stage, introStep]);

  return (
    <div className="relative min-h-screen w-full py-20 px-4 sm:px-8 max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
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
              {introStep === 0 ? '"And now..."' : '"Something from me."'}
            </motion.p>
          </AnimatePresence>
        </div>
      )}

      {/* STAGE 2: PERSONAL VIDEO & LETTER */}
      {stage === 'video' && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full glass-panel rounded-3xl border border-pink-500/20 p-6 sm:p-10 space-y-8 shadow-2xl"
        >
          <div className="space-y-2">
            <span className="text-xs font-mono tracking-widest text-pink-300 uppercase">
              Chapter IV — My Wish
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-slate-100 font-light">
              {myMsg.title}
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-pink-400/50 to-transparent mx-auto" />
          </div>

          {/* Boyfriend Video Player Container */}
          <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <VideoPlayer
              src={myMsg.video}
              onPlayStateChange={(playing) => {
                if (playing) playTrack('silence');
                else playTrack('friends');
              }}
            />
          </div>

          {/* Written Personal Script Lines */}
          <div className="max-w-2xl mx-auto glass-card p-6 rounded-2xl border border-white/10 space-y-3 text-left">
            <div className="flex items-center gap-2 text-xs font-mono text-pink-300 mb-2">
              <Heart className="w-4 h-4 fill-pink-400" />
              <span>A Personal Birthday Wish</span>
            </div>
            <div className="space-y-2 font-serif text-slate-200 text-sm sm:text-base leading-relaxed font-light italic">
              {myMsg.scriptLines.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          </div>

          {/* Continue to Grand Celebration */}
          <div className="pt-4 border-t border-white/10 flex justify-center">
            <button
              onClick={onContinueToFinale}
              className="px-8 py-3.5 rounded-full glass-panel border border-amber-400/40 hover:border-amber-400 text-amber-200 hover:text-white text-xs font-mono tracking-widest uppercase flex items-center gap-3 transition-all hover:scale-105 shadow-xl group"
            >
              <span>Let's Celebrate You 🎉</span>
              <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
