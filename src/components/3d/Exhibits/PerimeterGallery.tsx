import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { useHeritageStore } from '../../../store/useHeritageStore';

export const PerimeterGallery: React.FC = () => {
  const { setHoveringInteractive, openModal } = useHeritageStore();
  const shirtGroupRef = useRef<THREE.Group>(null);
  const hologramRingRef = useRef<THREE.Mesh>(null);

  // Subtle floating and rotation animation for the Club Shirt
  useFrame((state) => {
    if (shirtGroupRef.current) {
      shirtGroupRef.current.position.y = 1.6 + Math.sin(state.clock.elapsedTime * 1.5) * 0.04;
      shirtGroupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
    }
    if (hologramRingRef.current) {
      hologramRingRef.current.rotation.z += 0.015;
    }
  });

  // Timeline canvas texture for Left Wall
  const timelineTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#0a0e17';
      ctx.fillRect(0, 0, 2048, 1024);

      // Border and grid
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.2)';
      ctx.lineWidth = 4;
      ctx.strokeRect(20, 20, 2008, 984);

      // Section Title
      ctx.fillStyle = '#00F0FF';
      ctx.font = 'bold 50px Outfit, sans-serif';
      ctx.fillText('DÒNG THỜI GIAN PHÁT TRIỂN • CLUB HISTORY TIMELINE', 80, 100);

      // Timeline axis line
      ctx.strokeStyle = '#0066FF';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(100, 520);
      ctx.lineTo(1948, 520);
      ctx.stroke();

      const milestones = [
        {
          year: '2022',
          title: 'Khởi Nguyên & Thành Lập',
          desc: 'Thành lập TechTonic Club với 30 thành viên sáng lập đam mê lập trình, thuật toán và công nghệ số.',
          x: 250,
        },
        {
          year: '2023',
          title: 'Bứt Phá & Mở Rộng',
          desc: 'Tổ chức chuỗi DevFest quy mô 1,500 sinh viên; thành lập 4 ban chuyên môn vững mạnh và nhóm R&D AI/IoT.',
          x: 950,
        },
        {
          year: '2024',
          title: 'Tiên Phong & Đỉnh Cao',
          desc: 'Quán quân Tech Challenge toàn quốc, giải pháp số đô thị thông minh; hợp tác 15+ doanh nghiệp công nghệ.',
          x: 1650,
        },
      ];

      milestones.forEach((m) => {
        // Timeline node
        ctx.fillStyle = '#00F0FF';
        ctx.beginPath();
        ctx.arc(m.x, 520, 18, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(m.x, 520, 26, 0, Math.PI * 2);
        ctx.stroke();

        // Year badge
        ctx.fillStyle = '#00F0FF';
        ctx.font = '900 60px Outfit, sans-serif';
        ctx.fillText(m.year, m.x - 70, 440);

        // Title
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 36px Outfit, sans-serif';
        ctx.fillText(m.title, m.x - 120, 600);

        // Description
        ctx.fillStyle = '#94a3b8';
        ctx.font = '300 24px Inter, sans-serif';
        const words = m.desc.split(' ');
        let line = '';
        let y = 650;
        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + ' ';
          if (testLine.length > 32) {
            ctx.fillText(line, m.x - 120, y);
            line = words[n] + ' ';
            y += 35;
          } else {
            line = testLine;
          }
        }
        ctx.fillText(line, m.x - 120, y);
      });
    }
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  // Activity Gallery Canvas Texture
  const activityTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1536;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#0b0f19';
      ctx.fillRect(0, 0, 1536, 1024);

      ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
      ctx.lineWidth = 4;
      ctx.strokeRect(20, 20, 1496, 984);

      ctx.fillStyle = '#00F0FF';
      ctx.font = 'bold 44px Outfit, sans-serif';
      ctx.fillText('KHOẢNH KHẮC HOẠT ĐỘNG TIÊU BIỂU', 60, 90);

      // Activity cards mockup
      const cards = [
        { title: 'TechTonic DevFest 2023', tag: 'WORKSHOP & SHOWCASE', color: '#0066FF' },
        { title: 'Hackathon 48h Non-stop', tag: 'CÔNG NGHỆ ĐỈNH CAO', color: '#00F0FF' },
        { title: 'Teambuilding & Gala Dinner', tag: 'GẮN KẾT VĂN HÓA', color: '#FF0055' },
        { title: 'Lễ Trao Giải Tech Challenge', tag: 'VINH DANH TÀI NĂNG', color: '#FFD700' },
      ];

      cards.forEach((c, idx) => {
        const col = idx % 2;
        const row = Math.floor(idx / 2);
        const x = 60 + col * 710;
        const y = 140 + row * 410;

        ctx.fillStyle = '#121826';
        ctx.fillRect(x, y, 660, 360);

        ctx.strokeStyle = c.color;
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, 660, 360);

        // Tech badge
        ctx.fillStyle = c.color;
        ctx.font = '600 20px JetBrains Mono, monospace';
        ctx.fillText(`[ ${c.tag} ]`, x + 30, y + 60);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 36px Outfit, sans-serif';
        ctx.fillText(c.title, x + 30, y + 120);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '300 22px Inter, sans-serif';
        ctx.fillText('Ghi lại tinh thần nhiệt huyết, sáng tạo và gắn kết', x + 30, y + 180);
        ctx.fillText('không ngừng nghỉ của các thế hệ thành viên.', x + 30, y + 215);

        ctx.fillStyle = '#00F0FF';
        ctx.font = '500 20px Inter, sans-serif';
        ctx.fillText('• Xem chi tiết kỷ yếu câu lạc bộ', x + 30, y + 290);
      });
    }
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  return (
    <group>
      {/* ================= LEFT WALL: HISTORY TIMELINE & ACTIVITIES ================= */}
      {/* 1. History Timeline Board */}
      <mesh position={[-16.5, 3.2, -6]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[11, 4.2]} />
        <meshBasicMaterial map={timelineTexture} />
      </mesh>

      {/* 2. Activity Highlights Board */}
      <mesh position={[-16.5, 3.2, 4]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[6.5, 4.2]} />
        <meshBasicMaterial map={activityTexture} />
      </mesh>

      {/* ================= RIGHT WALL: THE CLUB SHIRT DISPLAY & BCN ================= */}
      {/* Pedestal with Rapier Collision so player cannot walk through */}
      <RigidBody type="fixed" position={[14.5, 0.45, -4]}>
        {/* Stone Pedestal Base */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[1.5, 1.7, 0.9, 32]} />
          <meshStandardMaterial
            color="#0d111a"
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        {/* Glowing glass top rim */}
        <mesh position={[0, 0.46, 0]}>
          <cylinderGeometry args={[1.52, 1.52, 0.05, 32]} />
          <meshBasicMaterial color="#00F0FF" />
        </mesh>
      </RigidBody>

      {/* Hologram Floating Ring around pedestal */}
      <mesh
        ref={hologramRingRef}
        position={[14.5, 1.1, -4]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[1.6, 1.7, 32]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>

      {/* 3D Club Shirt Object (Interactive Click Target) */}
      <group
        ref={shirtGroupRef}
        position={[14.5, 1.6, -4]}
        rotation={[0, -Math.PI / 2, 0]}
        onClick={() => openModal('shirt')}
        onPointerOver={() => setHoveringInteractive(true, 'Xem Danh Sách Ban Chủ Nhiệm')}
        onPointerOut={() => setHoveringInteractive(false)}
      >
        {/* Floating Hologram Label above shirt */}
        <mesh position={[0, 1.25, 0]}>
          <planeGeometry args={[1.8, 0.45]} />
          <meshBasicMaterial color="#0c1220" transparent opacity={0.9} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 1.25, 0.01]}>
          <planeGeometry args={[1.8, 0.02]} />
          <meshBasicMaterial color="#00F0FF" side={THREE.DoubleSide} />
        </mesh>

        {/* Shirt Body (Torso) */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[1.2, 1.4, 0.35]} />
          <meshStandardMaterial
            color="#081020"
            roughness={0.4}
            metalness={0.6}
            emissive="#002244"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Left Sleeve */}
        <mesh position={[-0.8, 0.35, 0]} rotation={[0, 0, -Math.PI / 6]} castShadow>
          <boxGeometry args={[0.5, 0.7, 0.34]} />
          <meshStandardMaterial color="#081020" roughness={0.4} metalness={0.6} />
        </mesh>

        {/* Right Sleeve */}
        <mesh position={[0.8, 0.35, 0]} rotation={[0, 0, Math.PI / 6]} castShadow>
          <boxGeometry args={[0.5, 0.7, 0.34]} />
          <meshStandardMaterial color="#081020" roughness={0.4} metalness={0.6} />
        </mesh>

        {/* Collar Cyan Stripe */}
        <mesh position={[0, 0.7, 0]}>
          <cylinderGeometry args={[0.3, 0.35, 0.1, 16]} />
          <meshBasicMaterial color="#00F0FF" />
        </mesh>

        {/* Shirt Front Accent (Vertical Tech Seam) */}
        <mesh position={[0, -0.05, 0.18]}>
          <planeGeometry args={[0.06, 1.2]} />
          <meshBasicMaterial color="#00F0FF" />
        </mesh>

        {/* Club Chest Emblem / Badge */}
        <mesh position={[0.3, 0.3, 0.19]}>
          <circleGeometry args={[0.12, 16]} />
          <meshBasicMaterial color="#00F0FF" />
        </mesh>

        {/* Back Text: "TECHTONIC" */}
        <mesh position={[0, 0.35, -0.19]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[0.8, 0.2]} />
          <meshBasicMaterial color="#00F0FF" />
        </mesh>
      </group>

      {/* Info Plaque on Wall behind Club Shirt */}
      <mesh position={[16.5, 3.2, -4]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[7, 3.5]} />
        <meshStandardMaterial color="#090d16" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Glowing text board description */}
      <group position={[16.45, 3.2, -4]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh position={[0, 0.9, 0]}>
          <planeGeometry args={[6.5, 0.04]} />
          <meshBasicMaterial color="#00F0FF" />
        </mesh>
        <mesh position={[0, -1.2, 0]}>
          <planeGeometry args={[6.5, 0.04]} />
          <meshBasicMaterial color="#0066FF" />
        </mesh>
      </group>
    </group>
  );
};
