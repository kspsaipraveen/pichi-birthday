import React from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export const MusicToggle = () => {
  const { isMuted, toggleMute, isPlaying } = useAudio();

  return (
    <button
      onClick={toggleMute}
      className="fixed top-5 right-5 z-50 w-11 h-11 rounded-full glass-panel border border-white/15 flex items-center justify-center text-amber-200 hover:text-white hover:border-amber-400/40 transition-all duration-300 shadow-xl group focus:outline-none"
      aria-label={isMuted ? 'Unmute Background Music' : 'Mute Background Music'}
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5 text-slate-400 group-hover:text-red-300 transition-colors" />
      ) : (
        <div className="relative flex items-center justify-center">
          <Volume2 className="w-5 h-5 text-amber-300 group-hover:scale-110 transition-transform" />
          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-300"></span>
            </span>
          )}
        </div>
      )}
    </button>
  );
};
