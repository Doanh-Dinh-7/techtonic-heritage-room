import { useEffect, useState } from 'react';

export interface MovementKeys {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  shift: boolean;
  jump: boolean;
}

export const useKeyboardControls = () => {
  const [movement, setMovement] = useState<MovementKeys>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    shift: false,
    jump: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing inside input or textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          setMovement((m) => ({ ...m, forward: true }));
          break;
        case 'KeyS':
        case 'ArrowDown':
          setMovement((m) => ({ ...m, backward: true }));
          break;
        case 'KeyA':
        case 'ArrowLeft':
          setMovement((m) => ({ ...m, left: true }));
          break;
        case 'KeyD':
        case 'ArrowRight':
          setMovement((m) => ({ ...m, right: true }));
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          setMovement((m) => ({ ...m, shift: true }));
          break;
        case 'Space':
          setMovement((m) => ({ ...m, jump: true }));
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          setMovement((m) => ({ ...m, forward: false }));
          break;
        case 'KeyS':
        case 'ArrowDown':
          setMovement((m) => ({ ...m, backward: false }));
          break;
        case 'KeyA':
        case 'ArrowLeft':
          setMovement((m) => ({ ...m, left: false }));
          break;
        case 'KeyD':
        case 'ArrowRight':
          setMovement((m) => ({ ...m, right: false }));
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          setMovement((m) => ({ ...m, shift: false }));
          break;
        case 'Space':
          setMovement((m) => ({ ...m, jump: false }));
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return movement;
};
