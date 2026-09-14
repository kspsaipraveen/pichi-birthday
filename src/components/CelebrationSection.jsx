import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Smile, Users } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { ImageWithFallback } from './MediaFallback';
import { useAudio } from '../context/AudioContext';

export const CelebrationSection = () => {
  const { playTrack } = useAudio();
  const header = birthdayData.celebrationHeader;

  // 3 Portrait items
  const portraitItems = [
    { image: "/assets/images/childhood-01-cartoon.png", caption: "Sweet Little Girl ✨" },
    { image: "/assets/images/present-cartoon.png", caption: "Beautiful You 💖" },
    { image: "/assets/images/father-daughter.jpg", caption: "Forever Bond 🕊️" }
  ];

  // 3 Landscape items
  const landscapeItems = [
    { image: "/assets/images/family-01.jpg", caption: "Family Love ❤️" },
    { image: "/assets/images/family-02.jpg", caption: "Home & Heart 🏡" },
    { image: "/assets/images/family-03.jpg", caption: "Precious Moments 💫" }
  ];

  useEffect(() => {
    playTrack('finale');
  }, []);

  return (
    <div className="relative w-full py-12 px-4 sm:px-8 max-w-6xl mx-auto flex flex-col items-center select-none space-y-12">
      {/* Upbeat Header Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-xl space-y-4 glass-panel p-6 sm:p-8 rounded-3xl border border-amber-400/40 shadow-2xl"
      >
        <div className="flex items-center justify-center gap-2 text-amber-300 font-mono text-xs uppercase tracking-widest">
          <Smile className="w-4 h-4" />
          <span>Celebration Time</span>
        </div>

        <h3 className="text-2xl sm:text-4xl font-serif text-amber-200 font-light leading-snug">
          "{header.line1} {header.line2} {header.line3}"
        </h3>

        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />
      </motion.div>

      {/* ROW 1: 3 PORTRAITS */}
      <div className="w-full space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-amber-300 uppercase px-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Portraits</span>
          <div className="flex-1 h-px bg-gradient-to-r from-amber-400/30 to-transparent ml-2" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
          {portraitItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="group relative h-80 sm:h-96 rounded-2xl overflow-hidden glass-card border border-white/15 hover:border-amber-400/50 transition-all duration-500 hover:scale-[1.03] shadow-2xl bg-slate-950/80 p-3 flex items-center justify-center"
            >
              <ImageWithFallback
                src={item.image}
                alt={item.caption}
                className="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                <span className="text-sm font-serif text-amber-200 font-medium tracking-wide">
                  {item.caption}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ROW 2: 3 LANDSCAPES */}
      <div className="w-full space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-amber-300 uppercase px-2">
          <Users className="w-3.5 h-3.5" />
          <span>Family Memories</span>
          <div className="flex-1 h-px bg-gradient-to-r from-amber-400/30 to-transparent ml-2" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
          {landscapeItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="group relative h-52 sm:h-64 rounded-2xl overflow-hidden glass-card border border-white/15 hover:border-amber-400/50 transition-all duration-500 hover:scale-[1.03] shadow-2xl bg-slate-950/80 p-3 flex items-center justify-center"
            >
              <ImageWithFallback
                src={item.image}
                alt={item.caption}
                className="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                <span className="text-sm font-serif text-amber-200 font-medium tracking-wide">
                  {item.caption}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
