import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowRight, Home } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { ImageWithFallback } from './MediaFallback';
import { useAudio } from '../context/AudioContext';

export const FamilySection = ({ onNext }) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [hasSeenLastPhoto, setHasSeenLastPhoto] = useState(false);
  const { playTrack } = useAudio();

  const { title, caption } = birthdayData.familyHeader;
  const familyPhotos = birthdayData.family || [];
  const currentPhoto = familyPhotos[photoIndex] || familyPhotos[0];

  useEffect(() => {
    playTrack('family');
  }, []);

  // Unlock Continue button once 3rd photo (last index) is reached
  useEffect(() => {
    if (photoIndex === familyPhotos.length - 1) {
      setHasSeenLastPhoto(true);
    }
  }, [photoIndex, familyPhotos.length]);

  // Timed 5-second crossfade between family photographs
  useEffect(() => {
    const timer = setInterval(() => {
      setPhotoIndex((prev) => {
        if (prev < familyPhotos.length - 1) return prev + 1;
        return prev;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, [familyPhotos.length]);

  const canContinue = hasSeenLastPhoto || photoIndex === familyPhotos.length - 1;

  return (
    <div className="relative min-h-screen w-full py-16 px-4 sm:px-8 max-w-4xl mx-auto flex flex-col items-center justify-center text-center select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-amber-600/10 via-purple-900/10 to-transparent blur-3xl pointer-events-none" />

      {/* Header Tag & Lines */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 space-y-3 max-w-xl"
      >
        <span className="text-xs font-mono tracking-widest text-amber-300 uppercase">
          Chapter III — Family
        </span>
        <h2 className="text-2xl sm:text-4xl font-serif text-slate-100 font-light leading-snug">
          "{title}"
        </h2>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mx-auto" />
        <p className="text-xs sm:text-sm text-slate-300 font-light italic">
          "{caption}"
        </p>
      </motion.div>

      {/* Family Photo Carousel Box */}
      <div className="relative z-10 w-full max-w-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhoto.id || photoIndex}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="relative min-h-[360px] sm:min-h-[480px] max-h-[70vh] w-full rounded-3xl overflow-hidden glass-panel border border-amber-400/30 shadow-2xl p-4 flex flex-col items-center justify-center bg-slate-950/80"
          >
            <ImageWithFallback
              src={currentPhoto.image}
              alt="Family Memory"
              className="w-full h-full max-h-[60vh] object-contain rounded-2xl animate-kenburns"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-75 pointer-events-none" />

            <div className="absolute bottom-6 left-0 right-0 p-6">
              <p className="text-sm sm:text-base font-serif text-amber-200 font-light italic">
                "{currentPhoto.caption}"
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Indicators & Next Button */}
        <div className="mt-8 flex items-center justify-between">
          <div className="flex gap-2">
            {familyPhotos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setPhotoIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === photoIndex ? 'w-6 bg-amber-400' : 'w-2 bg-white/20'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => canContinue && onNext && onNext()}
            disabled={!canContinue}
            className={`px-6 py-2.5 rounded-full glass-panel text-xs font-mono tracking-widest uppercase flex items-center gap-2 transition-all shadow-xl ${
              canContinue
                ? 'border border-amber-400/40 hover:border-amber-400 text-amber-200 hover:text-white hover:scale-105 cursor-pointer opacity-100'
                : 'border border-white/10 text-slate-500 opacity-40 cursor-not-allowed pointer-events-none'
            }`}
          >
            <span>Continue →</span>
            <ArrowRight className={`w-4 h-4 ${canContinue ? 'text-amber-300' : 'text-slate-600'}`} />
          </button>
        </div>
      </div>
    </div>
  );
};
