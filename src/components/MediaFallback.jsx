import React, { useState } from 'react';
import { Image as ImageIcon, Video, Heart, Sparkles } from 'lucide-react';

/**
 * MediaFallback Component
 * Wraps <img> and <video> tags to gracefully fall back to an elegant
 * cinematic placeholder if the file is missing or fails to load.
 */
export const ImageWithFallback = ({ src, alt, className, ...props }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-purple-950/40 via-slate-900 to-amber-950/30 flex flex-col items-center justify-center p-6 text-center border border-white/10 rounded-2xl ${className}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)]" />
        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-amber-300 shadow-inner">
            <ImageIcon className="w-6 h-6" />
          </div>
          <span className="text-xs uppercase tracking-widest text-amber-200/70 font-mono">
            {alt || 'Photo Placeholder'}
          </span>
          <p className="text-[11px] text-slate-400 max-w-[200px]">
            Replace with your photo in <code className="text-amber-300">birthdayData.js</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || 'Birthday Memory'}
      className={className}
      onError={() => setHasError(true)}
      {...props}
    />
  );
};

export const VideoWithFallback = ({ src, className, poster, ...props }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/60 flex flex-col items-center justify-center p-8 text-center border border-white/10 rounded-2xl shadow-2xl ${className}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,114,182,0.08)_0%,transparent_70%)]" />
        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shadow-inner">
            <Video className="w-7 h-7" />
          </div>
          <span className="text-xs uppercase tracking-widest text-pink-300/80 font-mono">
            Video Placeholder
          </span>
          <p className="text-xs text-slate-300 max-w-[240px]">
            Place video file in <code className="text-pink-300 font-mono">/public/assets/videos/</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <video
      src={src}
      className={className}
      onError={() => setHasError(true)}
      {...props}
    />
  );
};
