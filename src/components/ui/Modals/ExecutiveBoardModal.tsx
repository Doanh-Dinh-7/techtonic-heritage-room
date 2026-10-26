import React, { useState } from 'react';
import { useHeritageStore } from '../../../store/useHeritageStore';
import { X, Award, Users, Sparkles, Shield, Compass } from 'lucide-react';

export const ExecutiveBoardModal: React.FC = () => {
  const { activeModal, closeModal, executiveMembers } = useHeritageStore();
  const [selectedTerm, setSelectedTerm] = useState<string>('all');
  const [selectedDept, setSelectedDept] = useState<string>('all');

  if (activeModal !== 'shirt') return null;

  const terms = Array.from(new Set(executiveMembers.map((m) => m.term)));
  const departments = ['all', 'Ban Chủ Nhiệm', 'Ban Chuyên Môn', 'Ban Truyền Thông', 'Ban Đối Ngoại'];

  const filteredMembers = executiveMembers.filter((m) => {
    const matchTerm = selectedTerm === 'all' || m.term === selectedTerm;
    const matchDept = selectedDept === 'all' || m.department === selectedDept;
    return matchTerm && matchDept;
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md animate-fade-in select-none cursor-default"
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation();
        if (e.target === e.currentTarget) {
          closeModal();
        }
      }}
    >
      <div
        className="relative w-full max-w-4xl max-h-[85vh] flex flex-col rounded-2xl glass-panel-glow overflow-hidden border border-tech-cyan/40"
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-6 py-5 border-b border-tech-border/40 flex items-center justify-between bg-[#0c101c]/90">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-tech-cyan/10 border border-tech-cyan/30 text-tech-cyan">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-tech-cyan font-semibold">
                  Tương tác Áo Câu Lạc Bộ
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-tech-cyan" />
                <span className="text-xs text-slate-400">TechTonic Heritage</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white font-['Outfit']">
                ĐỘI NGŨ BAN CHỦ NHIỆM TECHTONIC CLUB
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

        {/* Filter bar */}
        <div className="px-6 py-3.5 bg-black/40 border-b border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-slate-400 font-mono">Nhiệm kỳ:</span>
            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="bg-[#121824] border border-tech-border/50 text-slate-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-tech-cyan"
            >
              <option value="all">Tất cả nhiệm kỳ</option>
              {terms.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Department Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedDept === dept
                    ? 'bg-tech-cyan text-black font-semibold shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                {dept === 'all' ? 'Tất cả ban' : dept}
              </button>
            ))}
          </div>
        </div>

        {/* Member Cards Grid */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="group p-4 rounded-xl bg-[#0e1422]/70 border border-white/5 hover:border-tech-cyan/40 hover:bg-[#121a2c]/80 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-tech-blue/40 to-tech-cyan/20 border border-tech-cyan/30 flex items-center justify-center text-tech-cyan font-bold text-lg font-['Outfit'] shadow-inner">
                    {member.name.split(' ').slice(-1)[0][0]}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-tech-cyan transition-colors">
                      {member.name}
                    </h3>
                    <div className="text-xs text-tech-cyan font-medium">{member.role}</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-slate-300">
                  {member.term}
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed font-light mb-3">
                {member.bio}
              </p>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span className="flex items-center gap-1 text-slate-400">
                  <Shield className="w-3 h-3 text-tech-cyan" /> {member.department}
                </span>
                <span className="text-tech-cyan font-semibold">TechTonic Leader</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-[#0a0d14] border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span>* Áo CLB đại diện cho màu cờ sắc áo và tinh thần cống hiến của mọi thế hệ thành viên.</span>
          <button
            onClick={closeModal}
            className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition"
          >
            Đóng cửa sổ
          </button>
        </div>
      </div>
    </div>
  );
};
