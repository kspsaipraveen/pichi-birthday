import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { ImageWithFallback } from './MediaFallback';

export const MemoryTimeline = ({ onContinueToFriends }) => {
  const timeline = birthdayData.timeline;
  const transitionText = birthdayData.memoriesToFriendsTransition;

  return (
    <div className="relative min-h-screen w-full py-20 px-4 sm:px-8 max-w-5xl mx-auto flex flex-col items-center">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-xl mb-20 space-y-3"
      >
        <span className="text-xs font-mono tracking-widest text-amber-300/80 uppercase">
          Chronicles of Us
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif text-slate-100 font-light">
          Our Journey Timeline
        </h2>
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mx-auto" />
      </motion.div>

      {/* Vertical Timeline Line */}
      <div className="relative w-full">
        <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-amber-400/40 via-purple-500/30 to-pink-500/40 hidden md:block" />

        <div className="space-y-16 sm:space-y-24">
          {timeline.map((item, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Center Badge */}
                <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-950 border-2 border-amber-400/80 items-center justify-center text-amber-300 shadow-xl hidden md:flex z-10">
                  <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping" />
                </div>

                {/* Content Card */}
                <div className="w-full md:w-1/2 px-2">
                  <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4 hover:border-amber-400/30 transition-colors">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-mono">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.date}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-serif text-slate-100 font-normal">
                      {item.title}
                    </h3>

                    <p className="text-sm text-slate-300 font-light leading-relaxed">
                      {item.description}
                    </p>

                    {item.image && (
                      <div className="mt-4 rounded-xl overflow-hidden h-48 w-full border border-white/10">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Spacer for two column balance */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Transition to Friends Section Banner */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mt-32 w-full max-w-2xl text-center glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 space-y-6 shadow-2xl"
      >
        <p className="text-lg sm:text-2xl font-serif text-slate-200 font-light italic">
          "{transitionText.line1}"
        </p>
        <p className="text-sm sm:text-base text-amber-200/80 font-mono">
          {transitionText.line2}
        </p>

        <div className="pt-4">
          <button
            onClick={onContinueToFriends}
            className="px-8 py-3.5 rounded-full glass-panel border border-pink-500/40 hover:border-pink-400 text-pink-200 hover:text-white font-mono text-sm tracking-wider uppercase transition-all duration-300 flex items-center gap-3 mx-auto group shadow-lg hover:scale-105 focus:outline-none"
          >
            <span>Messages From Friends</span>
            <ArrowRight className="w-4 h-4 text-pink-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
