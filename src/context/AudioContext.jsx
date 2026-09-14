import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { birthdayData } from '../data/birthdayData';

const AudioContext = createContext(null);

export const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrackKey, setCurrentTrackKey] = useState('intro');
  const [hasInteracted, setHasInteracted] = useState(false);

  const audioRef = useRef(null);
  const synthContextRef = useRef(null);
  const synthOscsRef = useRef([]);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      stopSynth();
    };
  }, []);

  // Web Audio Synthesizer fallback for gentle ambient background music
  const startSynth = (trackKey) => {
    try {
      if (synthContextRef.current) {
        stopSynth();
      }
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      synthContextRef.current = ctx;

      const freqs = trackKey === 'tribute' 
        ? [220, 261.63, 329.63] // A minor chord (soft, solemn)
        : trackKey === 'finale' 
        ? [261.63, 329.63, 392.00, 523.25] // C Major (cheerful)
        : [196.00, 246.94, 293.66, 392.00]; // G Major (warm, nostalgic)

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(isMuted ? 0 : 0.05, ctx.currentTime);
      masterGain.connect(ctx.destination);

      const oscs = freqs.map((freq) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.2, ctx.currentTime);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(2, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();

        osc.connect(masterGain);
        osc.start();
        return { osc, lfo };
      });

      synthOscsRef.current = oscs;
    } catch (e) {
      console.warn("Synth fallback unavailable", e);
    }
  };

  const stopSynth = () => {
    try {
      synthOscsRef.current.forEach(({ osc, lfo }) => {
        try { osc.stop(); } catch (e) {}
        try { lfo.stop(); } catch (e) {}
      });
      synthOscsRef.current = [];
      if (synthContextRef.current && synthContextRef.current.state !== 'closed') {
        synthContextRef.current.close();
        synthContextRef.current = null;
      }
    } catch (e) {}
  };

  const pendingPlayRef = useRef(null);

  // Play specific track by section key
  const playTrack = async (trackKey) => {
    if (!trackKey) return;
    setCurrentTrackKey(trackKey);

    const audio = audioRef.current;
    if (!audio) return;

    // Special silence track handling
    if (trackKey === 'silence') {
      try {
        if (pendingPlayRef.current) {
          await pendingPlayRef.current;
        }
        audio.pause();
      } catch (e) {}
      stopSynth();
      setIsPlaying(false);
      return;
    }

    const trackUrl = birthdayData.music[trackKey];
    if (!trackUrl) return;

    const absoluteTrackUrl = new URL(trackUrl, window.location.origin).href;

    // If already playing this track, don't interrupt it!
    if (audio.src === absoluteTrackUrl && isPlaying && !audio.paused) {
      return;
    }

    try {
      // Wait for any in-flight play request to settle before changing src
      if (pendingPlayRef.current) {
        try {
          await pendingPlayRef.current;
        } catch (e) {}
      }

      if (audio.src !== absoluteTrackUrl) {
        audio.src = trackUrl;
        audio.load();
      }

      audio.volume = 0.5;
      audio.muted = isMuted;

      const playPromise = audio.play();
      pendingPlayRef.current = playPromise;

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            stopSynth();
            pendingPlayRef.current = null;
          })
          .catch((error) => {
            pendingPlayRef.current = null;
            if (error.name === 'AbortError') {
              // Interrupted by another track change, ignore
              return;
            }
            console.log("HTML5 audio playback failed or deferred, activating synth fallback:", error);
            if (!isMuted) {
              startSynth(trackKey);
              setIsPlaying(true);
            }
          });
      }
    } catch (e) {
      pendingPlayRef.current = null;
      if (!isMuted) startSynth(trackKey);
    }
  };

  // User unlock interaction handler
  const unlockAudio = () => {
    setHasInteracted(true);
    if (audioRef.current && currentTrackKey && currentTrackKey !== 'silence') {
      playTrack(currentTrackKey);
    }
  };

  // Add global document interaction listener for seamless playback unlock
  useEffect(() => {
    const handleGlobalInteraction = (e) => {
      if (!hasInteracted) {
        setHasInteracted(true);
        if (audioRef.current && currentTrackKey && currentTrackKey !== 'silence') {
          playTrack(currentTrackKey);
        }
      }
    };

    window.addEventListener('click', handleGlobalInteraction, { once: true });
    window.addEventListener('touchstart', handleGlobalInteraction, { once: true });
    window.addEventListener('keydown', handleGlobalInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleGlobalInteraction);
      window.removeEventListener('touchstart', handleGlobalInteraction);
      window.removeEventListener('keydown', handleGlobalInteraction);
    };
  }, [hasInteracted, currentTrackKey]);

  // Toggle Mute / Unmute
  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }

    if (synthContextRef.current) {
      if (nextMuted) {
        stopSynth();
      } else {
        startSynth(currentTrackKey);
      }
    }

    if (!nextMuted && !isPlaying && hasInteracted) {
      playTrack(currentTrackKey);
    }
  };

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        isMuted,
        currentTrackKey,
        playTrack,
        unlockAudio,
        toggleMute,
        hasInteracted
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
