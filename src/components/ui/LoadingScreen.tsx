import React, { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import { useHeritageStore } from '../../store/useHeritageStore';
import { Monitor, Volume2, Sparkles, AlertTriangle } from 'lucide-react';

interface LoadingScreenProps {
  onEnter: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onEnter }) => {
  const { progress, active } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const { isLocked } = useHeritageStore();

  useEffect(() => {
    // Check if mobile or small screen
    const checkMobile = () => {
      const isMobile = window.innerWidth < 1024 || 'ontouchstart' in window;
      setIsMobileDevice(isMobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Smoothly increment display progress to 100%
  useEffect(() => {
    const target = active ? Math.max(progress, 30) : 100;
    const timer = setInterval(() => {
      setDisplayProgress((prev) => {
        if (prev >= target) {
          if (target >= 100) {
            setIsReady(true);
          }
          return target;
        }
        return Math.min(prev + 8, target);
      });
    }, 35);

    return () => clearInterval(timer);
  }, [progress, active]);

  // Handle enter click
  const handleEnterClick = () => {
    setHasEntered(true);
    onEnter();
  };

  // If already locked or entered, hide screen completely
  if (hasEntered || (isLocked && isReady)) {
    return null;
  }

  // Mobile Block Screen
  if (isMobileDevice) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05070a] p-6 text-center select-none">
        <div className="w-16 h-16 mb-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 animate-pulse">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2 font-['Outfit']">Yêu Cầu Thiết Bị Máy Tính (Desktop Only)</h2>
        <p className="text-sm text-slate-300 max-w-md leading-relaxed mb-6">
          Không gian 3D Phòng Truyền Thống TechTonic sử dụng cơ chế điều khiển góc nhìn thứ nhất (FPS 360° với phím WASD và chuột máy tính) và chỉ hỗ trợ trải nghiệm trên máy tính để bàn hoặc laptop.
        </p>
        <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-xs text-slate-400">
          Vui lòng mở lại trang web này trên trình duyệt máy tính của bạn.
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05070a]/95 backdrop-blur-xl transition-opacity duration-700 select-none">
      {/* Background Tech Grid & Glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,240,255,0.15),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff08_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-xl mx-auto px-6 text-center">
        {/* TechTonic Logo / Brand Badge */}
        <div className="relative mb-6 group">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-tech-cyan to-tech-blue opacity-50 blur-lg group-hover:opacity-80 transition duration-500" />
          <div className="relative px-6 py-3 rounded-2xl bg-[#0a0d14] border border-tech-border flex items-center space-x-3">
            <span className="w-3 h-3 rounded-full bg-tech-cyan animate-ping" />
            <span className="text-xs uppercase tracking-widest text-tech-cyan font-mono font-semibold">
              TechTonic Club 3D Space
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-3 font-['Outfit']">
          PHÒNG TRUYỀN THỐNG
        </h1>
        <p className="text-sm md:text-base text-slate-400 mb-8 font-light">
          Khám phá hành trình đổi mới công nghệ, các mốc son thành tích và thế hệ tài năng TechTonic trong không gian 3D tương tác.
        </p>

        {/* Progress bar */}
        <div className="w-full max-w-md bg-slate-900/80 rounded-full h-2 p-0.5 border border-tech-border/50 mb-4 overflow-hidden relative shadow-[0_0_15px_rgba(0,240,255,0.1)]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-tech-blue via-tech-cyan to-white transition-all duration-300 ease-out shadow-[0_0_12px_rgba(0,240,255,0.8)]"
            style={{ width: `${Math.round(displayProgress)}%` }}
          />
        </div>
        <div className="flex justify-between w-full max-w-md text-xs font-mono text-slate-400 mb-8">
          <span>{displayProgress >= 100 ? 'TẢI DỮ LIỆU HOÀN TẤT' : 'ĐANG TẢI MÔ HÌNH & ÁNH SÁNG 3D...'}</span>
          <span className="text-tech-cyan font-bold">{Math.round(displayProgress)}%</span>
        </div>

        {/* Mandatory User Requirement Notice */}
        <div className="glass-panel p-4 rounded-xl text-left border-l-4 border-l-tech-cyan mb-8 max-w-md">
          <div className="flex items-start space-x-3">
            <Monitor className="w-5 h-5 text-tech-cyan shrink-0 mt-0.5" />
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
              Để có trải nghiệm tốt nhất, vui lòng giảm độ tương phản màn hình và sử dụng máy tính. Website chỉ tương thích với máy tính.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleEnterClick}
          disabled={!isReady}
          className={`relative group overflow-hidden px-8 py-3.5 rounded-xl font-medium tracking-wide transition-all duration-300 flex items-center space-x-3 text-sm md:text-base ${
            isReady
              ? 'bg-gradient-to-r from-tech-cyan to-tech-blue text-black font-semibold shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_40px_rgba(0,240,255,0.7)] hover:scale-105 active:scale-95 cursor-pointer'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
          }`}
        >
          <Sparkles className="w-5 h-5 text-black" />
          <span>BƯỚC VÀO PHÒNG TRUYỀN THỐNG (CLICK TO ENTER)</span>
        </button>

        {/* Small hint */}
        <p className="text-[11px] text-slate-500 mt-4 font-mono">
          Nhấn chuột để bắt đầu góc nhìn 360° | Dùng phím W A S D để di chuyển | Bấm phím ESC để mở chuột
        </p>
      </div>
    </div>
  );
};
