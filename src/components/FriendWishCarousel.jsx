import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronRight, ChevronLeft, Sparkles, UserCheck, ArrowRight } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { VideoPlayer } from './VideoPlayer';
import { ImageWithFallback } from './MediaFallback';
import { useAudio } from '../context/AudioContext';

export const FriendWishCarousel = ({ onCompleteFriends }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const { title, subtitle } = birthdayData.friendsHeader;
  const friends = birthdayData.friends || [];
  const transitionText = birthdayData.friendsToFatherTransition;
  const { playTrack } = useAudio();

  const currentFriend = friends[currentIndex] || friends[0];
  const isLastFriend = currentIndex === friends.length - 1;

  const handleNext = () => {
    if (currentIndex < friends.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsVideoPlaying(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsVideoPlaying(false);
    }
  };

  const handlePlayStateChange = (playing) => {
    setIsVideoPlaying(playing);
    if (playing) {
      playTrack('silence');
    } else {
      playTrack('friends');
    }
  };

  return (
    <div className="relative min-h-screen w-full py-20 px-4 sm:px-8 max-w-5xl mx-auto flex flex-col items-center justify-center">
      {/* Background Blur Overlay when Video is Playing */}
      <div
        className={`fixed inset-0 bg-slate-950/70 backdrop-blur-md z-20 pointer-events-none transition-opacity duration-700 ${
          isVideoPlaying ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-xl mb-12 space-y-3"
      >
        <span className="text-xs font-mono tracking-widest text-pink-300 uppercase">
          Chapter II — Her Community
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif text-slate-100 font-light">
          {title}
        </h2>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-pink-400/50 to-transparent mx-auto" />
        <p className="text-sm text-slate-300 font-light leading-relaxed">
          {subtitle}
        </p>
      </motion.div>

      {/* Friend Card Container */}
      <div className="relative z-30 w-full max-w-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFriend?.id || currentIndex}
            initial={{ opacity: 0, x: 50, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.96 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="glass-panel rounded-3xl border border-white/15 p-6 sm:p-8 space-y-6 shadow-2xl"
          >
            {/* Friend Profile Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-pink-400/50 shadow-md">
                  <ImageWithFallback
                    src={currentFriend?.photo}
                    alt={currentFriend?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-serif text-slate-100 font-medium">
                    {currentFriend?.name}
                  </h3>
                  <span className="text-xs font-mono text-pink-300/80">
                    {currentFriend?.relationship || 'Dear Friend'}
                  </span>
                </div>
              </div>

              <div className="text-xs font-mono text-slate-400 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                {currentIndex + 1} of {friends.length}
              </div>
            </div>

            {/* Video Player */}
            <VideoPlayer
              src={currentFriend?.video}
              poster={currentFriend?.photo}
              onPlayStateChange={handlePlayStateChange}
              onEnded={() => setIsVideoPlaying(false)}
            />

            {/* Friend Caption */}
            {currentFriend?.caption && (
              <p className="text-sm sm:text-base text-slate-300 font-light italic text-center px-4 leading-relaxed">
                "{currentFriend.caption}"
              </p>
            )}

            {/* Carousel Navigation Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`px-4 py-2 rounded-full border text-xs font-mono flex items-center gap-2 transition-all ${
                  currentIndex === 0
                    ? 'opacity-30 cursor-not-allowed border-white/10 text-slate-500'
                    : 'border-white/20 text-slate-200 hover:border-white/40 hover:text-white'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {!isLastFriend ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-full glass-panel border border-amber-400/40 hover:border-amber-400 text-amber-200 hover:text-white text-xs font-mono tracking-wider uppercase flex items-center gap-2 shadow-lg transition-all hover:scale-105"
                >
                  <span>Next Message ❤️</span>
                  <ChevronRight className="w-4 h-4 text-amber-400" />
                </button>
              ) : (
                <button
                  onClick={onCompleteFriends}
                  className="px-6 py-2.5 rounded-full glass-panel border border-pink-500/40 hover:border-pink-400 text-pink-200 hover:text-white text-xs font-mono tracking-wider uppercase flex items-center gap-2 shadow-lg transition-all hover:scale-105"
                >
                  <span>Continue ❤️</span>
                  <ArrowRight className="w-4 h-4 text-pink-400" />
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Father Section Intro Card after last friend */}
      {isLastFriend && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-12 w-full max-w-xl text-center glass-panel p-6 rounded-3xl border border-white/10 space-y-4 shadow-xl"
        >
          <p className="text-base sm:text-lg font-serif text-slate-200 font-light italic">
            "{transitionText.line1}"
          </p>
          <p className="text-xs text-amber-300 font-mono">
            {transitionText.line2}
          </p>
        </motion.div>
      )}
    </div>
  );
};
