import React, { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { CanvasContainer } from './components/3d/CanvasContainer';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { HUD } from './components/ui/HUD';
import { Crosshair } from './components/ui/Crosshair';
import { ExecutiveBoardModal } from './components/ui/Modals/ExecutiveBoardModal';
import { GuestbookModal } from './components/ui/Modals/GuestbookModal';
import { ExhibitDetailModal } from './components/ui/Modals/ExhibitDetailModal';
import { useHeritageStore } from './store/useHeritageStore';
import { useAudio } from './hooks/useAudio';

export const App: React.FC = () => {
  const { isLocked, activeModal, closeModal, setLocked } = useHeritageStore();
  const { initAudio } = useAudio();

  // Handle Enter Experience from LoadingScreen
  const handleEnter = () => {
    initAudio();
    // Request pointer lock on the canvas element
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.requestPointerLock?.();
    }
    setLocked(true);
  };

  // Global ESC Key handler for closing modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModal) {
        closeModal();
        // Re-lock is handled by PlayerController when it detects activeModal → null
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal, closeModal]);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#05070a] select-none">
      {/* 1. 3D Canvas Layer */}
      <CanvasContainer />

      {/* 2. 2D Interactive HUD Layer */}
      <HUD />

      {/* 3. Center Crosshair targeting reticle */}
      <Crosshair />

      {/* 4. Interactive Modals outside Canvas */}
      <ExecutiveBoardModal />
      <GuestbookModal />
      <ExhibitDetailModal />

      {/* 5. Mandatory Loading Screen with Progress and Entry Button */}
      <LoadingScreen onEnter={handleEnter} />

      {/* 6. Vercel Web Analytics */}
      <Analytics />
    </main>
  );
};

export default App;
