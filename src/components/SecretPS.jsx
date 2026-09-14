import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Lock, Sparkles } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export const SecretPS = () => {
  const secretConfig = birthdayData.secretPS;
  const [isOpen, setIsOpen] = useState(false);

  if (!secretConfig || !secretConfig.enabled) return null;

  return (
    <div className="relative w-full py-12 px-4 flex flex-col items-center justify-center text-center">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="px-5 py-2 rounded-full glass-panel border border-pink-500/30 hover:border-pink-400 text-pink-300 hover:text-white text-xs font-mono tracking-widest uppercase flex items-center gap-2 transition-all hover:scale-105 shadow-lg group focus:outline-none"
        >
          <Lock className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
          <span>{secretConfig.buttonText}</span>
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full glass-panel p-6 sm:p-8 rounded-3xl border border-pink-500/40 shadow-2xl space-y-4 text-center"
        >
          <div className="w-10 h-10 rounded-full bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mx-auto text-pink-400">
            <Heart className="w-5 h-5 fill-pink-400" />
          </div>

          <div className="space-y-3 font-serif text-slate-200 text-sm sm:text-base leading-relaxed font-light italic">
            {secretConfig.lines.map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>

          <div className="pt-2 text-pink-300 text-lg">❤️</div>
        </motion.div>
      )}
    </div>
  );
};
