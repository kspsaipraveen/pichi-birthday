import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Heart } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { ImageWithFallback } from './MediaFallback';

export const MemoryGallery = ({ onNextSection }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { title, subtitle } = birthdayData.memoriesHeader;
  const memories = birthdayData.memories;

  return (
    <div className="relative min-h-screen w-full py-20 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col items-center">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl mb-16 space-y-4"
      >
        <span className="text-xs font-mono tracking-widest text-amber-300/80 uppercase">
          Chapter I
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-light text-slate-100 drop-shadow-md">
          {title}
        </h2>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mx-auto" />
        <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
          {subtitle}
        </p>
      </motion.div>

      {/* Grid of Photo Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
        {memories.map((item, idx) => (
          <motion.div
            key={item.id || idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: idx * 0.1 }}
            onClick={() => setSelectedImage(item)}
            className="group relative cursor-pointer overflow-hidden rounded-2xl glass-card transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="relative h-72 sm:h-80 w-full overflow-hidden">
              <ImageWithFallback
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Card Caption Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-1.5 transform transition-transform duration-300 group-hover:translate-y-0">
                <span className="text-[11px] font-mono text-amber-300/80 tracking-widest uppercase">
                  {item.date}
                </span>
                <h3 className="text-lg font-serif font-medium text-white group-hover:text-amber-200 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 font-light leading-relaxed">
                  {item.caption}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-slate-950/90 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full rounded-2xl glass-panel border border-white/15 overflow-hidden shadow-2xl p-6 sm:p-8 flex flex-col md:flex-row gap-6"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/80 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full md:w-3/5 h-64 md:h-[420px] rounded-xl overflow-hidden bg-slate-900">
                <ImageWithFallback
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-full object-cover animate-kenburns"
                />
              </div>

              <div className="w-full md:w-2/5 flex flex-col justify-center gap-4 text-left">
                <span className="text-xs font-mono tracking-widest text-amber-300 uppercase">
                  {selectedImage.date}
                </span>
                <h3 className="text-2xl font-serif text-slate-100">
                  {selectedImage.title}
                </h3>
                <p className="text-sm text-slate-300 font-light leading-relaxed">
                  {selectedImage.caption}
                </p>
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-pink-300 font-mono">
                  <Heart className="w-4 h-4 fill-pink-400" />
                  <span>A moment captured in time</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
