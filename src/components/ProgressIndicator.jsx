import React from 'react';
import { motion } from 'framer-motion';

const acts = [
  { id: 1, label: 'Childhood' },
  { id: 2, label: 'Present' },
  { id: 3, label: 'Family' },
  { id: 4, label: 'Father' },
  { id: 5, label: 'Video Wish' },
  { id: 6, label: 'Celebration' }
];

export const ProgressIndicator = ({ currentAct, onSelectAct }) => {
  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-40 px-4 py-2 rounded-full glass-panel border border-white/10 flex items-center gap-3 sm:gap-5 shadow-2xl transition-all duration-500">
      {acts.map((act) => {
        const isActive = currentAct === act.id;
        const isPassed = currentAct > act.id;

        return (
          <button
            key={act.id}
            onClick={() => onSelectAct && onSelectAct(act.id)}
            className="group relative flex items-center gap-1.5 focus:outline-none"
            title={act.label}
          >
            <motion.div
              animate={{
                scale: isActive ? 1.3 : 1,
                backgroundColor: isActive
                  ? '#d4af37'
                  : isPassed
                  ? '#f472b6'
                  : 'rgba(255, 255, 255, 0.2)'
              }}
              className="w-2.5 h-2.5 rounded-full transition-colors shadow-sm cursor-pointer"
            />
            {isActive && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="hidden sm:inline-block text-[11px] font-mono tracking-wider text-amber-200 uppercase"
              >
                {act.label}
              </motion.span>
            )}
          </button>
        );
      })}
    </div>
  );
};
