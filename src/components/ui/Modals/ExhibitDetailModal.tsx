import React from 'react';
import { useHeritageStore } from '../../../store/useHeritageStore';
import { X, Trophy, Award, Calendar, Sparkles } from 'lucide-react';
import { ExhibitItem } from '../../../types/heritage';

export const ExhibitDetailModal: React.FC = () => {
  const { activeModal, closeModal, modalData } = useHeritageStore();

  if (activeModal !== 'exhibit' || !modalData) return null;

  const item: ExhibitItem = modalData;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md animate-fade-in select-none cursor-default"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeModal();
        }
      }}
    >
      <div
        className="relative w-full max-w-xl flex flex-col rounded-2xl glass-panel-glow overflow-hidden border border-tech-cyan/40"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-6 py-5 border-b border-tech-border/40 flex items-center justify-between bg-[#0c101c]/90">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-tech-cyan/10 border border-tech-cyan/30 text-tech-cyan">
              {item.category === 'trophy' ? <Trophy className="w-6 h-6 text-amber-400" /> : <Award className="w-6 h-6 text-tech-cyan" />}
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-tech-cyan font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-tech-cyan" /> Hiện vật bảo tàng
              </span>
              <h2 className="text-lg md:text-xl font-bold text-white font-['Outfit']">
                CHI TIẾT HIỆN VẬT VINH DANH
              </h2>
            </div>
          </div>

          <button
            onClick={closeModal}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Đóng (ESC)"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 bg-[#0a0d14]/80">
          {item.highlight && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-tech-cyan/10 border border-tech-cyan/30 text-tech-cyan">
              {item.highlight}
            </div>
          )}

          <h3 className="text-xl font-bold text-white font-['Outfit']">
            {item.title}
          </h3>

          <div className="flex items-center space-x-4 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-tech-cyan" /> Năm đạt giải: {item.year}
            </span>
            <span>•</span>
            <span className="capitalize">Phân loại: {item.category}</span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed font-light bg-[#121824]/50 p-4 rounded-xl border border-white/5">
            {item.description}
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#0a0d14] border-t border-white/10 flex justify-end">
          <button
            onClick={closeModal}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-tech-cyan to-tech-blue text-black font-semibold text-xs transition hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]"
          >
            Tiếp tục tham quan
          </button>
        </div>
      </div>
    </div>
  );
};
