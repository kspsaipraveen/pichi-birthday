import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Smile } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { ImageWithFallback } from './MediaFallback';

export const MemoryMontage = () => {
  const intro = birthdayData.celebrationIntro;
  const { title, subtitle } = birthdayData.finaleHeader;
  const photos = birthdayData.finalMemories || [];

  return (
    <div className="relative w-full py-16 px-4 sm:px-8 max-w-6xl mx-auto flex flex-col items-center">
      {/* Upbeat Header Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-xl mb-12 space-y-4 glass-panel p-6 sm:p-8 rounded-3xl border border-amber-400/40 shadow-2xl"
      >
        <div className="flex items-center justify-center gap-2 text-amber-300 font-mono text-xs uppercase tracking-widest">
          <Smile className="w-4 h-4" />
          <span>Celebration Time</span>
        </div>

        <h3 className="text-2xl sm:text-4xl font-serif text-amber-200 font-light leading-snug">
          "{intro.line1} {intro.line2} {intro.line3}"
        </h3>

        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />

        <p className="text-xs sm:text-sm text-slate-300 font-light">
          {subtitle}
        </p>
      </motion.div>

      {/* Cheerful Polaroid-Style Photo Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
        {photos.map((item, idx) => (
          <motion.div
            key={item.id || idx}
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="group relative h-48 sm:h-60 rounded-2xl overflow-hidden glass-card border border-white/10 hover:border-amber-400/40 transition-all duration-300 hover:scale-105 hover:-rotate-1 shadow-xl"
          >
            <ImageWithFallback
              src={item.image}
              alt={item.caption || 'Celebration Memory'}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
              <span className="text-xs font-serif text-amber-200 font-medium">
                {item.caption}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
