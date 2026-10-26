import { create } from 'zustand';
import { ExecutiveMember, ExhibitItem, GuestbookEntry, ModalType } from '../types/heritage';

interface HeritageState {
  // Controls & Pointer state
  isLocked: boolean;
  setLocked: (locked: boolean) => void;
  
  // Crosshair hover state
  isHoveringInteractive: boolean;
  hoverTooltip: string;
  setHoveringInteractive: (hovering: boolean, tooltip?: string) => void;

  // Modal system
  activeModal: ModalType;
  modalData: any;
  openModal: (type: ModalType, data?: any) => void;
  closeModal: () => void;

  // Audio state
  isMuted: boolean;
  toggleMute: () => void;

  // Data sets
  executiveMembers: ExecutiveMember[];
  exhibitItems: ExhibitItem[];
  guestbookEntries: GuestbookEntry[];
  addGuestbookEntry: (entry: Omit<GuestbookEntry, 'id' | 'timestamp'>) => void;
}

export const useHeritageStore = create<HeritageState>((set) => ({
  isLocked: false,
  setLocked: (locked) => set({ isLocked: locked }),

  isHoveringInteractive: false,
  hoverTooltip: '',
  setHoveringInteractive: (hovering, tooltip = '') =>
    set({ isHoveringInteractive: hovering, hoverTooltip: hovering ? tooltip : '' }),

  activeModal: null,
  modalData: null,
  openModal: (type, data = null) => {
    // Luôn mở con trỏ chuột khi mở popup để người dùng thao tác
    if (document.exitPointerLock) {
      try {
        document.exitPointerLock();
      } catch (e) {
        console.warn('exitPointerLock error:', e);
      }
    }
    set({ activeModal: type, modalData: data, isLocked: false });
  },
  closeModal: () => {
    // Chỉ reset state — PlayerController sẽ phát hiện activeModal chuyển
    // từ có giá trị → null và tự động re-lock pointer lock sau 200ms.
    set({ activeModal: null, modalData: null });
  },

  isMuted: false,
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),

  // Ban Chủ Nhiệm các nhiệm kỳ
  executiveMembers: [
    {
      id: 'bcn-1',
      name: 'Nguyễn Hoàng Long',
      role: 'Chủ nhiệm CLB (President)',
      term: 'Nhiệm kỳ 2024 - 2025',
      department: 'Ban Chủ Nhiệm',
      bio: 'Định hướng chiến lược phát triển công nghệ, mở rộng mạng lưới hợp tác doanh nghiệp công nghệ.',
    },
    {
      id: 'bcn-2',
      name: 'Trần Minh Quân',
      role: 'Phó Chủ nhiệm Đối ngoại & Sự kiện',
      term: 'Nhiệm kỳ 2024 - 2025',
      department: 'Ban Đối Ngoại',
      bio: 'Phụ trách kết nối đối tác tài trợ, các chương trình Hackathon và TechTalk quy mô lớn.',
    },
    {
      id: 'bcn-3',
      name: 'Lê Thùy Dung',
      role: 'Phó Chủ nhiệm Chuyên môn & R&D',
      term: 'Nhiệm kỳ 2024 - 2025',
      department: 'Ban Chuyên Môn',
      bio: 'Chủ trì các dự án nghiên cứu AI/IoT, tổ chức các chuỗi đào tạo lập trình chuyên sâu cho thành viên.',
    },
    {
      id: 'bcn-4',
      name: 'Phạm Đức Anh',
      role: 'Trưởng Ban Truyền thông & Media',
      term: 'Nhiệm kỳ 2024 - 2025',
      department: 'Ban Truyền Thông',
      bio: 'Xây dựng bộ nhận diện thương hiệu TechTonic, lan tỏa tinh thần đam mê công nghệ tới sinh viên.',
    },
    {
      id: 'bcn-5',
      name: 'Đặng Tuấn Kiệt',
      role: 'Cựu Chủ nhiệm Sáng lập (Founder)',
      term: 'Nhiệm kỳ 2023 - 2024',
      department: 'Ban Chủ Nhiệm',
      bio: 'Đặt nền móng xây dựng TechTonic Club với tôn chỉ "Igniting Passion, Pioneering Technology".',
    },
    {
      id: 'bcn-6',
      name: 'Vũ Hải Yến',
      role: 'Cựu Phó Chủ nhiệm Điều hành',
      term: 'Nhiệm kỳ 2023 - 2024',
      department: 'Ban Chủ Nhiệm',
      bio: 'Xây dựng quy chế hoạt động bền vững và văn hóa cởi mở, sáng tạo cho câu lạc bộ.',
    },
  ],

  // Hiện vật trưng bày & Giải thưởng
  exhibitItems: [
    {
      id: 'ex-1',
      title: 'Cúp Vô Địch Tech Challenge Toàn Quốc',
      category: 'trophy',
      year: '2024',
      description: 'Giải Nhất cuộc thi Sáng tạo Công nghệ Trẻ với dự án Hệ thống Trợ lý AI và Ứng dụng Không gian 3D tương tác.',
      highlight: 'Giải Quán Quân Toàn Quốc',
    },
    {
      id: 'ex-2',
      title: 'Bằng Khen Câu Lạc Bộ Tiêu Biểu Xuất Sắc',
      category: 'certificate',
      year: '2023',
      description: 'Ghi nhận những đóng góp vượt bậc trong phong trào NCKH và đổi mới sáng tạo kỹ thuật số trong sinh viên.',
      highlight: 'Bằng Khen Đoàn - Hội',
    },
    {
      id: 'ex-3',
      title: 'Huy Chương Vàng Hackathon Smart City',
      category: 'trophy',
      year: '2024',
      description: 'Giải pháp Đô thị thông minh tích hợp IoT và Cloud do nhóm R&D TechTonic Club phát triển liên tục trong 48 giờ.',
      highlight: 'Huy Chương Vàng',
    },
    {
      id: 'ex-4',
      title: 'Cúp Đơn Vị Tổ Chức Sự Kiện Công Nghệ Xuất Sắc',
      category: 'trophy',
      year: '2023',
      description: 'Chuỗi sự kiện TechTonic DevFest thu hút hơn 1,500 sinh viên và 15 doanh nghiệp công nghệ hàng đầu tham dự.',
      highlight: 'Sự Kiện Công Nghệ Của Năm',
    },
  ],

  // Sổ lưu bút mẫu
  guestbookEntries: [
    {
      id: 'gb-1',
      author: 'TS. Nguyễn Văn Hưng',
      roleOrAffiliation: 'Cố vấn Chuyên môn',
      message: 'Chúc TechTonic Club luôn giữ vững ngọn lửa đam mê, tiếp tục vươn xa và là cái nôi ươm mầm các tài năng kỹ thuật số hàng đầu!',
      timestamp: '2024-10-15',
    },
    {
      id: 'gb-2',
      author: 'Nguyễn Thu Trang',
      roleOrAffiliation: 'Cựu Thành viên K20',
      message: 'Tự hào là một phần của TechTonic! Phòng truyền thống 3D này thực sự quá đẳng cấp và truyền cảm hứng!',
      timestamp: '2024-10-20',
    },
    {
      id: 'gb-3',
      author: 'Phan Bảo Nam',
      roleOrAffiliation: 'Khách tham quan TechFest',
      message: 'Không gian 3D mượt mà, ánh sáng đỉnh cao. Chúc câu lạc bộ ngày càng phát triển rực rỡ!',
      timestamp: '2024-10-24',
    },
  ],

  addGuestbookEntry: (entry) =>
    set((state) => ({
      guestbookEntries: [
        {
          ...entry,
          id: `gb-${Date.now()}`,
          timestamp: new Date().toISOString().split('T')[0],
        },
        ...state.guestbookEntries,
      ],
    })),
}));
