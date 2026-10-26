import React from 'react';
import { useHeritageStore } from '../../store/useHeritageStore';

export const Crosshair: React.FC = () => {
  const { isLocked, isHoveringInteractive, hoverTooltip, activeModal } = useHeritageStore();

  // If a modal is open or pointer is not locked, hide crosshair so user can use the standard mouse cursor
  if (!isLocked || activeModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex items-center justify-center">
      <div className="relative flex items-center justify-center">
        {/* Center dot */}
        <div
          className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
            isHoveringInteractive
              ? 'bg-tech-cyan scale-150 shadow-[0_0_12px_#00F0FF]'
              : 'bg-white/80 scale-100'
          }`}
        />

        {/* Reticle brackets when hovering interactive object */}
        <div
          className={`absolute rounded-full border border-tech-cyan/60 transition-all duration-300 pointer-events-none ${
            isHoveringInteractive
              ? 'w-10 h-10 scale-100 opacity-100 animate-spin [animation-duration:8s]'
              : 'w-6 h-6 scale-50 opacity-0'
          }`}
        />

        {/* Outer targeting cross ticks */}
        <div
          className={`absolute w-8 h-8 transition-all duration-200 ${
            isHoveringInteractive ? 'scale-110 opacity-80' : 'scale-90 opacity-40'
          }`}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-tech-cyan" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-tech-cyan" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-1.5 bg-tech-cyan" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-0.5 w-1.5 bg-tech-cyan" />
        </div>

        {/* Interactive Tooltip Hint below crosshair */}
        {isHoveringInteractive && hoverTooltip && (
          <div className="absolute top-8 px-3 py-1 rounded-md bg-black/80 border border-tech-cyan/40 backdrop-blur-md text-[11px] font-mono text-tech-cyan whitespace-nowrap shadow-[0_0_15px_rgba(0,240,255,0.3)] animate-pulse">
            [Chuột Trái]: {hoverTooltip}
          </div>
        )}
      </div>
    </div>
  );
};
