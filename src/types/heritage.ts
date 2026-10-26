export interface ExecutiveMember {
  id: string;
  name: string;
  role: string;
  term: string; // e.g. "Nhiệm kỳ 2023 - 2024", "Nhiệm kỳ 2024 - 2025"
  avatar?: string;
  bio?: string;
  department: 'Ban Chủ Nhiệm' | 'Ban Chuyên Môn' | 'Ban Truyền Thông' | 'Ban Đối Ngoại' | 'Ban Sự Kiện';
}

export interface ExhibitItem {
  id: string;
  title: string;
  category: 'trophy' | 'certificate' | 'activity' | 'history';
  year: string;
  description: string;
  image?: string;
  highlight?: string;
}

export interface GuestbookEntry {
  id: string;
  author: string;
  roleOrAffiliation: string;
  message: string;
  timestamp: string;
}

export type ModalType = 'shirt' | 'guestbook' | 'exhibit' | 'instructions' | null;
