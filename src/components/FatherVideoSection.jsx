import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { VideoPlayer } from './VideoPlayer';
import { ImageWithFallback } from './MediaFallback';
import { useAudio } from '../context/AudioContext';

export const FatherVideoSection = ({ onVideoComplete }) => {
  const [isSilenceActive, setIsSilenceActive] = useState(false);
  const [silenceSeconds, setSilenceSeconds] = useState(7);
  const { playTrack } = useAudio();

  const header = birthdayData.fatherVideoHeader;
  const videoSrc = birthdayData.fatherBirthdayVideo;
  const fdPhoto = birthdayData.fatherDaughter.image;

  // Handle Video End -> Trigger Silence Period
  const handleVideoEnded = () => {
    setIsSilenceActive(true);
  };

  // Silence Timer Countdown (5-10 Seconds)
  useEffect(() => {
    if (isSilenceActive) {
      playTrack('silence'); // Stop all background music strictly
      if (silenceSeconds > 0) {
        const timer = setTimeout(() => {
          setSilenceSeconds((prev) => prev - 1);
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        if (onVideoComplete) onVideoComplete();
      }
    }
  }, [isSilenceActive, silenceSeconds]);

  return (
    <div className="relative min-h-screen w-full bg-slate-950 py-16 px-4 sm:px-8 max-w-4xl mx-auto flex flex-col items-center justify-center text-center select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-amber-600/5 blur-3xl pointer-events-none" />

      {!isSilenceActive ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 w-full space-y-8"
        >
          {/* Header Lines */}
          <div className="space-y-2">
            <span className="text-xs font-mono tracking-widest text-amber-300/70 uppercase">
              {header.title}
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-slate-100 font-light">
              {header.subtitle}
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent mx-auto" />
          </div>

          {/* Father Video Player */}
          <div className="max-w-3xl mx-auto rounded-3xl overflow-hidden glass-panel border border-amber-400/30 shadow-2xl">
            <VideoPlayer
              src={videoSrc}
              poster={fdPhoto}
              onPlayStateChange={(playing) => {
                if (playing) playTrack('silence');
                else playTrack('father');
              }}
              onEnded={handleVideoEnded}
            />
          </div>

          <p className="text-xs font-mono text-slate-400">
            Tap to play video wish ❤️
          </p>
        </motion.div>
      ) : (
        /* MANDATORY 5-10 SECONDS INTENTIONAL SILENCE & REFLECTION */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="relative z-20 flex flex-col items-center justify-center space-y-8"
        >
          <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-full overflow-hidden border-2 border-amber-300/40 shadow-2xl relative">
            <ImageWithFallback
              src={fdPhoto}
              alt="Remembering"
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
