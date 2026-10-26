import React, { useState } from 'react';
import { useHeritageStore } from '../../store/useHeritageStore';
import { ExternalLink, Volume2, VolumeX, HelpCircle, Navigation, Eye, Compass } from 'lucide-react';

export const HUD: React.FC = () => {
  const { isLocked, isMuted, toggleMute, openModal } = useHeritageStore();
  const [showControlsHint, setShowControlsHint] = useState(true);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 flex flex-col justify-between p-6 select-none">
      {/* Top Bar */}
      <div className="flex items-center justify-between w-full pointer-events-auto">
        {/* Top Left: Exit to Main Website Button */}
        <a
          href="https://www.techtonic-club.id.vn/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center space-x-2.5 px-4 py-2.5 rounded-xl glass-panel text-slate-200 hover:text-tech-cyan hover:border-tech-cyan/60 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.25)]"
          title="Trở về website chính thức của TechTonic Club"
        >
          <ExternalLink className="w-4 h-4 text-tech-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          <span className="text-xs md:text-sm font-semibold tracking-wide">
            VỀ WEBSITE CHÍNH (TECHTONIC-CLUB.ID.VN)
          </span>
        </a>

        {/* Top Right: Utility Controls (Audio & Help) */}
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleMute}
            className="p-2.5 rounded-xl glass-panel text-slate-300 hover:text-white hover:border-tech-cyan/40 transition-all shadow-md"
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-tech-cyan" />}
          </button>

          <button
            onClick={() => setShowControlsHint(!showControlsHint)}
            className="p-2.5 rounded-xl glass-panel text-slate-300 hover:text-white hover:border-tech-cyan/40 transition-all shadow-md"
            title="Hướng dẫn điều khiển"
          >
            <HelpCircle className="w-4 h-4 text-tech-cyan" />
          </button>
        </div>
      </div>

      {/* Middle/Side: Controls Guide (Minimizable) */}
      {showControlsHint && isLocked && (
        <div className="self-start glass-panel p-3.5 rounded-xl max-w-xs mt-4 pointer-events-auto animate-fade-in text-xs border border-tech-border/30">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono font-bold text-tech-cyan uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" /> Điều khiển 3D
            </span>
            <button
              onClick={() => setShowControlsHint(false)}
              className="text-slate-400 hover:text-white text-[10px]"
            >
              Ẩn [x]
            </button>
          </div>
          <div className="space-y-1.5 text-slate-300 font-sans">
            <div className="flex justify-between items-center">
              <span>Di chuyển:</span>
              <kbd className="px-1.5 py-0.5 bg-black/50 border border-white/20 rounded font-mono text-[10px] text-tech-cyan">
                W A S D
              </kbd>
            </div>
            <div className="flex justify-between items-center">
              <span>Chạy nhanh:</span>
              <kbd className="px-1.5 py-0.5 bg-black/50 border border-white/20 rounded font-mono text-[10px] text-tech-cyan">
                Shift
              </kbd>
            </div>
            <div className="flex justify-between items-center">
              <span>Xoay góc nhìn:</span>
              <span className="text-[11px] text-slate-400">Rê chuột 360°</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Tương tác vật phẩm:</span>
              <span className="text-[11px] text-tech-cyan">Chuột trái</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Mở con trỏ chuột:</span>
              <kbd className="px-1.5 py-0.5 bg-black/50 border border-white/20 rounded font-mono text-[10px] text-tech-cyan">
                ESC
              </kbd>
            </div>
          </div>
        </div>
      )}

      {/* Re-lock Banner when user presses ESC to use mouse */}
      {!isLocked && (
        <div className="self-center glass-panel px-6 py-3 rounded-2xl border border-tech-cyan/50 pointer-events-auto shadow-[0_0_30px_rgba(0,240,255,0.2)] animate-bounce flex items-center gap-3">
          <Eye className="w-5 h-5 text-tech-cyan animate-pulse" />
          <span className="text-sm font-semibold text-white">
            Nhấp chuột vào màn hình để tiếp tục di chuyển góc nhìn 360°
          </span>
        </div>
      )}

      {/* Bottom Bar */}
      <div className="flex items-end justify-between w-full pointer-events-auto">
        {/* Bottom Left: Location / Zone Indicator */}
        <div className="glass-panel px-4 py-2.5 rounded-xl border border-tech-border/30 flex items-center space-x-3">
          <div className="w-2.5 h-2.5 rounded-full bg-tech-cyan animate-ping" />
          <div>
            <div className="text-[10px] uppercase font-mono text-slate-400">Vị trí hiện tại</div>
            <div className="text-xs font-bold text-white tracking-wide">Đại Sảnh Danh Dự TechTonic (Main Hall)</div>
          </div>
        </div>

        {/* Bottom Right: TechTonic Logo statically positioned (Mandatory Requirement) */}
        <div className="group relative pointer-events-auto">
          <a
            href="https://www.techtonic-club.id.vn/"
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-transform duration-300 hover:scale-105"
            title="TechTonic Club Official"
          >
            <div className="glass-panel px-4 py-2 rounded-2xl border border-tech-cyan/30 flex items-center space-x-3 shadow-xl hover:border-tech-cyan/70 hover:shadow-[0_0_25px_rgba(0,240,255,0.3)]">
              <img
                src="/assets/techtonic-logo.svg"
                alt="TechTonic Logo"
                className="h-10 w-auto object-contain"
              />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};
