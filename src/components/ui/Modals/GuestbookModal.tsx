import React, { useState } from 'react';
import { useHeritageStore } from '../../../store/useHeritageStore';
import { X, BookOpen, Send, Sparkles, MessageSquare, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export const GuestbookModal: React.FC = () => {
  const { activeModal, closeModal, guestbookEntries, addGuestbookEntry } = useHeritageStore();
  const [author, setAuthor] = useState('');
  const [roleOrAffiliation, setRoleOrAffiliation] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (activeModal !== 'guestbook') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) return;

    addGuestbookEntry({
      author: author.trim(),
      roleOrAffiliation: roleOrAffiliation.trim() || 'Khách tham quan',
      message: message.trim(),
    });

    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00F0FF', '#0066FF', '#FF0055', '#FFD700'],
    });

    setIsSuccess(true);
    setAuthor('');
    setRoleOrAffiliation('');
    setMessage('');
    setTimeout(() => setIsSuccess(false), 3000);
  };

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
        className="relative w-full max-w-3xl max-h-[85vh] flex flex-col rounded-2xl glass-panel-glow overflow-hidden border border-tech-cyan/40"
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-6 py-5 border-b border-tech-border/40 flex items-center justify-between bg-[#0c101c]/90">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-tech-cyan/10 border border-tech-cyan/30 text-tech-cyan">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-tech-cyan font-semibold">
                Sổ Lưu Bút Danh Dự (Guestbook)
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-white font-['Outfit']">
                LỜI CHÚC & DẤU ẤN KỶ NIỆM TECHTONIC
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

        {/* Content Body: Split view (Form + List) */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Input Form */}
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-tech-cyan" /> Viết lời chúc của bạn
            </h3>

            {isSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-bounce">
                <Sparkles className="w-4 h-4 shrink-0" />
                Cảm ơn bạn! Lời chúc đã được lưu vào sổ lưu bút TechTonic.
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Họ và tên của bạn <span className="text-tech-cyan">*</span>
              </label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="VD: Nguyễn Văn A"
                className="w-full px-3.5 py-2 rounded-xl bg-[#0e1422] border border-tech-border/40 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-tech-cyan focus:ring-1 focus:ring-tech-cyan"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Đơn vị / Khóa / Mối liên hệ
              </label>
              <input
                type="text"
                value={roleOrAffiliation}
                onChange={(e) => setRoleOrAffiliation(e.target.value)}
                placeholder="VD: Cựu thành viên K21 / Khách mời TechTalk"
                className="w-full px-3.5 py-2 rounded-xl bg-[#0e1422] border border-tech-border/40 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-tech-cyan focus:ring-1 focus:ring-tech-cyan"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Lời nhắn gửi / Cảm nhận <span className="text-tech-cyan">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Gửi gắm lời chúc, kỷ niệm hoặc cảm nhận của bạn khi tham quan phòng truyền thống..."
                className="w-full px-3.5 py-2 rounded-xl bg-[#0e1422] border border-tech-border/40 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-tech-cyan focus:ring-1 focus:ring-tech-cyan resize-none"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-tech-cyan to-tech-blue text-black font-semibold text-sm flex items-center justify-center space-x-2 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>GỬI LỜI CHÚC LƯU BÚT</span>
            </button>
          </form>

          {/* Right: Existing Messages List */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-tech-accent" /> Lưu bút gần đây
              </span>
              <span className="text-xs text-tech-cyan font-normal">{guestbookEntries.length} lời nhắn</span>
            </h3>

            <div className="flex-1 max-h-[360px] overflow-y-auto space-y-3 pr-1">
              {guestbookEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-3.5 rounded-xl bg-[#0e1422]/60 border border-white/5 hover:border-tech-cyan/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-1.5">
                    <div>
                      <div className="text-sm font-bold text-white">{entry.author}</div>
                      <div className="text-[11px] text-tech-cyan font-mono">{entry.roleOrAffiliation}</div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">{entry.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed italic font-light">
                    "{entry.message}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#0a0d14] border-t border-white/10 flex justify-end">
          <button
            onClick={closeModal}
            className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition"
          >
            Đóng cửa sổ
          </button>
        </div>
      </div>
    </div>
  );
};
