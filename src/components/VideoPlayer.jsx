import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { VideoWithFallback } from './MediaFallback';

export const VideoPlayer = ({ src, poster, onEnded, onPlayStateChange }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
      if (onPlayStateChange) onPlayStateChange(false);
    } else {
      video.play().then(() => {
        setIsPlaying(true);
        if (onPlayStateChange) onPlayStateChange(true);
      }).catch((e) => {
        console.log("Video autoplay caught", e);
      });
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    if (onPlayStateChange) onPlayStateChange(false);
    if (onEnded) onEnded();
  };

  return (
    <div className="relative group w-full rounded-2xl overflow-hidden glass-panel border border-white/15 shadow-2xl bg-slate-950">
      <VideoWithFallback
        ref={videoRef}
        src={src}
        poster={poster}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnded}
        className="w-full max-h-[75vh] object-contain bg-slate-950 cursor-pointer"
        onClick={togglePlay}
        playsInline
      />

      {/* Center Big Play Button overlay */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs transition-opacity group-hover:bg-slate-950/30 focus:outline-none"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-400/90 text-slate-950 flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform pl-1">
            <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current" />
          </div>
        </button>
      )}

      {/* Bottom Floating Minimal Control Bar */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent flex flex-col gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
        {/* Progress Line */}
        <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer">
          <div
            className="h-full bg-amber-400 transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between pt-1 text-white/80">
          <button
            onClick={togglePlay}
            className="p-1.5 rounded-lg hover:text-amber-300 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 fill-current" />
            )}
          </button>

          <button
            onClick={toggleMute}
            className="p-1.5 rounded-lg hover:text-amber-300 transition-colors"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};
