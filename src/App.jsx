import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AudioProvider } from './context/AudioContext';
import { ParticleBackground } from './components/ParticleBackground';
import { ProgressIndicator } from './components/ProgressIndicator';
import { MusicToggle } from './components/MusicToggle';
import { CinematicIntro } from './components/CinematicIntro';
import { ChildhoodSection } from './components/ChildhoodSection';
import { PresentSection } from './components/PresentSection';
import { FamilySection } from './components/FamilySection';
import { FatherDaughterSection } from './components/FatherDaughterSection';
import { FatherVideoSection } from './components/FatherVideoSection';
import { CelebrationSection } from './components/CelebrationSection';
import { BirthdayCake } from './components/BirthdayCake';
import { FinalMessage } from './components/FinalMessage';

function BirthdayAppContent() {
  const [currentAct, setCurrentAct] = useState(0);
  const [isCandleBlown, setIsCandleBlown] = useState(false);

  // Smooth scroll to top on act transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentAct]);

  // Lock page scrolling strictly in Act 6 until candles are blown out
  useEffect(() => {
    if (currentAct === 6 && !isCandleBlown) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [currentAct, isCandleBlown]);

  const handleCandlesBlown = () => {
    setIsCandleBlown(true);
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    setTimeout(() => {
      window.scrollTo({ top: window.innerHeight * 0.6, behavior: 'smooth' });
    }, 400);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#07080c] text-slate-100 selection:bg-pink-500 selection:text-white overflow-x-hidden font-sans">
      {/* Background Canvas Particles */}
      <ParticleBackground />

      {/* Persistent Floating Controls */}
      {currentAct > 0 && (
        <ProgressIndicator
          currentAct={currentAct > 6 ? 6 : currentAct}
          onSelectAct={(actId) => setCurrentAct(actId)}
        />
      )}
      <MusicToggle />

      {/* Main Narrative Experience Container */}
      <main className="relative z-10 w-full">
        <AnimatePresence mode="wait">
          {/* ACT 0: CINEMATIC INTRO */}
          {currentAct === 0 && (
            <motion.section
              key="act-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 1 }}
            >
              <CinematicIntro onBegin={() => setCurrentAct(1)} />
            </motion.section>
          )}

          {/* ACT 1: CHILDHOOD CARTOON IMAGES */}
          {currentAct === 1 && (
            <motion.section
              key="act-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
            >
              <ChildhoodSection onNext={() => setCurrentAct(2)} />
            </motion.section>
          )}

          {/* ACT 2: PRESENT CARTOON IMAGE */}
          {currentAct === 2 && (
            <motion.section
              key="act-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
            >
              <PresentSection onNext={() => setCurrentAct(3)} />
            </motion.section>
          )}

          {/* ACT 3: FAMILY PHOTOGRAPHS */}
          {currentAct === 3 && (
            <motion.section
              key="act-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
            >
              <FamilySection onNext={() => setCurrentAct(4)} />
            </motion.section>
          )}

          {/* ACT 4: FATHER + DAUGHTER PHOTOGRAPH */}
          {currentAct === 4 && (
            <motion.section
              key="act-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
            >
              <FatherDaughterSection onNext={() => setCurrentAct(5)} />
            </motion.section>
          )}

          {/* ACT 5: FATHER'S BIRTHDAY VIDEO & SILENCE */}
          {currentAct === 5 && (
            <motion.section
              key="act-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
            >
              <FatherVideoSection onVideoComplete={() => setCurrentAct(6)} />
            </motion.section>
          )}

          {/* ACT 6: INTERACTIVE CAKE & GRAND CELEBRATION */}
          {currentAct === 6 && (
            <motion.section
              key="act-6"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="space-y-16"
            >
              <BirthdayCake onCandlesBlown={handleCandlesBlown} />

              {isCandleBlown && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2 }}
                  className="space-y-16"
                >
                  <CelebrationSection />
                  <FinalMessage onReplay={() => {
                    setIsCandleBlown(false);
                    setCurrentAct(0);
                  }} />
                </motion.div>
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AudioProvider>
      <BirthdayAppContent />
    </AudioProvider>
  );
}
