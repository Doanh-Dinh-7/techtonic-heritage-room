# Kế Hoạch Triển Khai: Phòng Truyền Thống 3D TechTonic Club (TechTonic Heritage Room)

## 1. Tổng quan Kiến trúc (Architecture Overview)

Dự án là WebApp 3D FPS tương tác cao dành riêng cho Desktop, tích hợp:
- **3D Engine Layer**: React 18, `@react-three/fiber`, Three.js, `@react-three/drei`.
- **Physics Layer**: `@react-three/rapier` (RigidBody, Kinematic/Dynamic Character Controller, Colliders cho tường, sàn, bệ trưng bày).
- **UI / HUD Layer**: Tailwind CSS + HTML5 Overlay nằm trên 3D Canvas (Loading screen với `useProgress`, Crosshair trung tâm, Logo bottom-right, Nút Exit top-left, Modal popup tương tác).
- **State Management**: `zustand` quản lý trạng thái con trỏ chuột (`isLocked`), dữ liệu modal popup (`activeModal`, `modalData`), hover crosshair (`isHoveringInteractive`), thiết lập âm thanh/ánh sáng.

---

## 2. Cấu trúc Thư mục Dự kiến

```
techtonic-heritage-room/
├── public/
│   ├── assets/
│   │   ├── textures/          # Bê tông tối, kim loại chải, đá marble bệ cúp
│   │   ├── audio/             # Nhạc nền ambient, âm thanh click, tiếng bước chân
│   │   └── images/            # Logo TechTonic, hình ảnh BCN, hoạt động, bằng khen
│   └── favicon.ico
├── src/
│   ├── assets/                # Vector SVGs, icons
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── CanvasContainer.tsx   # Canvas chính với Lighting & Camera
│   │   │   ├── Scene.tsx             # Setup toàn bộ không gian bảo tàng
│   │   │   ├── PlayerController.tsx  # FPS WASD + PointerLock + Rapier Physics
│   │   │   ├── Environment/
│   │   │   │   ├── MuseumRoom.tsx    # Sàn, trần, vách hành lang & sảnh chính
│   │   │   │   └── StudioLights.tsx  # Ambient dịu + Spotlights chiếu điểm
│   │   │   └── Exhibits/
│   │   │       ├── CenterWall.tsx    # Logo 3D TechTonic, Slogan & Sứ mệnh
│   │   │       ├── PerimeterGallery.tsx # Dòng thời gian, BCN, Áo CLB, Hoạt động
│   │   │       ├── CentralIsland.tsx # Bệ kính, Cúp vinh danh, Bằng khen
│   │   │       └── InteractiveCorner.tsx # Video màn chiếu, Sổ lưu bút 3D
│   │   └── ui/
│   │       ├── LoadingScreen.tsx     # Drei useProgress + text bắt buộc + Click to Enter
│   │       ├── HUD.tsx               # Logo góc dưới phải, Nút Exit, Hướng dẫn phím
│   │       ├── Crosshair.tsx         # Tâm ngắm FPS (đổi màu/hiệu ứng khi hover)
│   │       └── Modals/
│   │           ├── ExecutiveBoardModal.tsx # Popup khi click Áo CLB
│   │           ├── GuestbookModal.tsx      # Popup Sổ lưu bút
│   │           └── ExhibitDetailModal.tsx  # Xem chi tiết cúp/ảnh hoạt động
│   ├── store/
│   │   └── useHeritageStore.ts       # Zustand store điều phối state
│   ├── hooks/
│   │   ├── useKeyboardControls.ts    # Bắt phím WASD, Shift, Space
│   │   └── useAudio.ts               # Điều khiển âm thanh ambient/sfx
│   ├── types/
│   │   └── heritage.ts               # Type definitions
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── vercel.json
```

---

## 3. Các Giai đoạn Thực Hiện Chi Tiết

### Phase 1: Thiết lập Dự án & Cài đặt Thư viện
- Khởi tạo dự án Vite (React + TypeScript).
- Cài đặt các thư viện:
  - `three`, `@types/three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/rapier`
  - `zustand`, `lucide-react`, `tailwindcss`, `postcss`, `autoprefixer`
- Cấu hình Tailwind CSS và font chữ phong cách công nghệ cao hiện đại.

### Phase 2: Base UI, HUD & Zustand Store
- `useHeritageStore.ts`:
  - `isLocked`: boolean (trạng thái PointerLock)
  - `isHoveringInteractive`: boolean
  - `activePopup`: 'shirt' | 'guestbook' | 'exhibit' | null
  - `popupData`: thông tin chi tiết hiển thị
  - `soundEnabled`: boolean
- `LoadingScreen.tsx`:
  - Theo dõi tiến độ tải bằng `useProgress()`.
  - Hiển thị đúng câu thông báo: *"Để có trải nghiệm tốt nhất, vui lòng giảm độ tương phản màn hình và sử dụng máy tính. Website chỉ tương thích với máy tính."*
  - Nút **"Khám Phá Phòng Truyền Thống"** để khóa chuột (`requestPointerLock`) và bật âm thanh.
- `HUD.tsx`:
  - Logo TechTonic cố định ở góc dưới bên phải (**Bottom-Right**).
  - Nút "Về Website Chính" ở góc trên bên trái (**Top-Left**) trỏ tới `https://www.techtonic-club.id.vn/`.
  - Hướng dẫn điều khiển thu gọn (WASD: Di chuyển, Chuột: Nhìn, ESC: Mở con trỏ chuột).
  - Crosshair FPS ở tâm màn hình tương tác động.

### Phase 3: Môi trường 3D & Vật lý (Rapier Physics)
- Bọc toàn cảnh trong `<Physics gravity={[0, -9.81, 0]}>`.
- Dựng phòng triển lãm theo dạng hình học liền khối (hành lang lối vào dẫn vào đại sảnh mở tròn/đa giác lớn).
- Tường, sàn, trần có `RigidBody type="fixed" colliders="trimesh"` hoặc `cuboid` để ngăn người chơi đi xuyên.
- Chiếu sáng: Ambient light màu xanh than trầm kết hợp hệ thống `<SpotLight>` công nghệ cao tập trung vào từng khu vực trưng bày.

### Phase 4: FPS Character Controller
- Triển khai `PlayerController` bằng `<RigidBody type="dynamic" colliders="ball" / "capsule">` kết hợp với camera gắn kèm.
- `<PointerLockControls>` từ `@react-three/drei`.
- Đọc phím `WASD` liên tục trong `useFrame`: áp dụng lực vận tốc (`setLinvel`) trên Rapier RigidBody giúp di chuyển mượt mà, không giật lag và không thể đi xuyên tường hoặc bệ trưng bày.
- Khi người dùng bấm ESC hoặc mở modal popup, tự động mở khóa chuột để tương tác UI 2D.

### Phase 5: Khu Vực Nội Dung & Tương Tác
1. **Entrance**: Hành lang dẫn ánh sáng dìu dặt tạo cảm giác hồi hộp, dẫn thẳng vào đại sảnh.
2. **Center Wall (Vách Tâm Điểm)**:
   - Logo 3D TechTonic phát sáng hào quang (Emissive).
   - Slogan *"Igniting Passion, Pioneering Technology"* và Tuyên ngôn sứ mệnh.
3. **Perimeter Gallery (Vành Đai Triển Lãm)**:
   - Dòng thời gian phát triển của TechTonic Club (Timeline milestones).
   - Chân dung Ban Chủ Nhiệm các thế hệ.
   - **Vật phẩm đặc biệt: "Áo Câu Lạc Bộ" (Club Shirt)** dạng 3D mockup/bản thiết kế tinh xảo. Khi click mở popup HTML Ban Chủ Nhiệm.
   - Thư viện hình ảnh hoạt động (Workshop, Teambuilding, Hackathon, Tech Showcase).
4. **Central Island (Đảo Trung Tâm)**:
   - Bệ trưng bày thấp với mặt kính trong suốt, bên trong đặt Cúp thành tích, Bằng khen danh dự.
   - Người chơi có thể đi vòng tròn 360 độ ngắm nhìn mọi góc độ.
5. **Interactive Corner (Góc Tương Tác)**:
   - Màn hình LED lớn phát video/canvas hoạt hình vòng lặp.
   - Sổ lưu bút tương tác (Guestbook): Click vào quyển sổ hoặc màn hình để nhập lời chúc và lưu lại trong phiên tham quan.

### Phase 6: Tối ưu Hóa & Sẵn sàng Triển khai Vercel
- Tối ưu hóa tải tài nguyên, dọn dẹp bộ nhớ Three.js khi unmount.
- Tạo file cấu hình `vercel.json` phục vụ SPA routing.
- Kiểm thử build thành công không lỗi TypeScript.
