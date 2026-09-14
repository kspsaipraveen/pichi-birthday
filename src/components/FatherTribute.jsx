import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { ImageWithFallback, VideoWithFallback } from './MediaFallback';
import { useAudio } from '../context/AudioContext';

export const FatherTribute = ({ onTributeComplete }) => {
  const [stage, setStage] = useState('intro'); // 'intro' -> 'content' -> 'silence' -> 'complete'
  const [introLineIdx, setIntroLineIdx] = useState(0);
  const [silenceSeconds, setSilenceSeconds] = useState(7);
  const { playTrack } = useAudio();

  const tribute = birthdayData.fatherTribute;

  useEffect(() => {
    playTrack('tribute');
  }, []);

  // Progressive intro text
  useEffect(() => {
    if (stage === 'intro') {
      if (introLineIdx < tribute.introLines.length - 1) {
        const timer = setTimeout(() => {
          setIntroLineIdx((prev) => prev + 1);
        }, 3800);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setStage('content');
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [stage, introLineIdx, tribute.introLines.length]);

  // Silence timer countdown (5-10s intentional silence)
  useEffect(() => {
    if (stage === 'silence') {
      playTrack('silence'); // Stop all audio strictly
      if (silenceSeconds > 0) {
        const timer = setTimeout(() => {
          setSilenceSeconds((prev) => prev - 1);
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        setStage('complete');
        if (onTributeComplete) onTributeComplete();
      }
    }
  }, [stage, silenceSeconds]);

  const handleFinishTributeContent = () => {
    setStage('silence');
  };

  if (!tribute.enabled) {
    if (onTributeComplete) onTributeComplete();
    return null;
  }

  return (
    <div className="relative min-h-screen w-full bg-slate-950 flex flex-col items-center justify-center px-4 py-16 text-center select-none overflow-hidden">
      {/* Soft warm light glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-amber-600/5 blur-3xl pointer-events-none" />

      {/* STAGE 1: INTRO LINES */}
      {stage === 'intro' && (
        <div className="relative z-10 max-w-2xl px-6 min-h-[160px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={introLineIdx}
              initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="text-lg sm:text-2xl font-serif text-slate-200 font-light leading-relaxed italic"
            >
              "{tribute.introLines[introLineIdx]}"
            </motion.p>
          </AnimatePresence>
        </div>
      )}

      {/* STAGE 2: TRIBUTE CONTENT */}
      {stage === 'content' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="relative z-10 max-w-4xl w-full glass-panel rounded-3xl border border-amber-500/20 p-6 sm:p-10 space-y-8 shadow-2xl"
        >
          <div className="space-y-2">
            <span className="text-xs font-mono tracking-widest text-amber-300/70 uppercase">
              Chapter III — In Loving Remembrance
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif text-slate-100 font-light">
              {tribute.title}
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent mx-auto" />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 text-left">
            {/* Father Photograph with Ken Burns Slow Zoom */}
            <div className="w-full md:w-1/2 h-72 sm:h-96 rounded-2xl overflow-hidden border border-white/10 relative group">
              <ImageWithFallback
                src={tribute.image}
                alt="In Loving Memory"
                className="w-full h-full object-cover animate-kenburns"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
            </div>

            {/* Written Tribute Message */}
            <div className="w-full md:w-1/2 space-y-4 max-h-[380px] overflow-y-auto pr-2">
              <div className="space-y-3 font-serif text-slate-200 text-sm sm:text-base leading-relaxed font-light italic border-l-2 border-amber-400/30 pl-4 py-1">
                {tribute.tributeMessageLines.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Optional Tribute Video */}
          {tribute.video && (
            <div className="mt-6 rounded-2xl overflow-hidden border border-white/10 max-w-2xl mx-auto">
              <VideoWithFallback
                src={tribute.video}
                poster={tribute.image}
                controls
                className="w-full max-h-72 object-cover"
              />
            </div>
          )}

          {/* Complete Button */}
          <div className="pt-4 border-t border-white/10 flex justify-center">
            <button
              onClick={handleFinishTributeContent}
              className="px-8 py-3 rounded-full glass-panel border border-amber-400/30 hover:border-amber-400 text-amber-200 hover:text-white text-xs font-mono tracking-widest uppercase flex items-center gap-3 transition-all hover:scale-105 shadow-xl"
            >
              <span>Pause & Reflect</span>
              <Heart className="w-4 h-4 text-amber-300 fill-amber-300/30" />
            </button>
          </div>
        </motion.div>
      )}

      {/* STAGE 3: MANDATORY 5-10 SECONDS INTENTIONAL SILENCE & REFLECTION */}
      {stage === 'silence' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="relative z-20 flex flex-col items-center justify-center space-y-8"
        >
          <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden border-2 border-amber-300/40 shadow-2xl relative">
            <ImageWithFallback
              src={tribute.image}
              alt="Memory"
              className="w-full h-full object-cover animate-kenburns"
            />
            <div className="absolute inset-0 bg-slate-950/30" />
          </div>

          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="text-pink-400"
          >
            <Heart className="w-10 h-10 fill-pink-400" />
          </motion.div>

          <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">
            A moment of quiet reflection ({silenceSeconds}s)
          </p>
        </motion.div>
      )}
    </div>
  );
};
