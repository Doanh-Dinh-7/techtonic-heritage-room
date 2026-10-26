import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useHeritageStore } from '../../../store/useHeritageStore';

export const CenterWall: React.FC = () => {
  const { setHoveringInteractive, openModal } = useHeritageStore();
  const emblemRef = useRef<THREE.Group>(null);

  // Subtle floating/pulse animation for central emblem
  useFrame((state) => {
    if (emblemRef.current) {
      emblemRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      emblemRef.current.position.y = 4.2 + Math.sin(state.clock.elapsedTime * 1.2) * 0.04;
    }
  });

  // Canvas Texture for Slogan and Mission Statement
  const textTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, 2048, 1024);

      // Slogan
      ctx.fillStyle = '#00F0FF';
      ctx.font = 'bold 54px Outfit, Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '10px';
      ctx.fillText('IGNITING PASSION • PIONEERING TECHNOLOGY', 1024, 200);

      // Vietnamese Subtitle Slogan
      ctx.fillStyle = '#E2E8F0';
      ctx.font = '600 36px Outfit, Inter, sans-serif';
      ctx.letterSpacing = '4px';
      ctx.fillText('THẮP LỬA ĐAM MÊ • TIÊN PHONG CÔNG NGHỆ', 1024, 260);

      // Divider line
      const gradient = ctx.createLinearGradient(400, 310, 1648, 310);
      gradient.addColorStop(0, 'rgba(0,240,255,0)');
      gradient.addColorStop(0.5, 'rgba(0,240,255,0.8)');
      gradient.addColorStop(1, 'rgba(0,240,255,0)');
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(400, 310);
      ctx.lineTo(1648, 310);
      ctx.stroke();

      // Mission Heading
      ctx.fillStyle = '#94A3B8';
      ctx.font = '600 24px JetBrains Mono, monospace';
      ctx.letterSpacing = '8px';
      ctx.fillText('TUYÊN NGÔN SỨ MỆNH & TẦM NHÌN', 1024, 380);

      // Mission Content Body
      ctx.fillStyle = '#F8FAFC';
      ctx.font = '300 32px Inter, sans-serif';
      ctx.fillText(
        'TechTonic Club là cái nôi nuôi dưỡng niềm say mê nghiên cứu khoa học, đổi mới sáng tạo',
        1024,
        450
      );
      ctx.fillText(
        'và phát triển giải pháp công nghệ tiên phong cho cộng đồng sinh viên.',
        1024,
        505
      );
      ctx.fillText(
        'Kết nối tài năng công nghệ - Lan tỏa tri thức số - Vươn tầm quốc tế.',
        1024,
        560
      );
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 16;
    return texture;
  }, []);

  return (
    <group position={[0, 0, -18.4]}>
      {/* Backplate Accent Panel */}
      <mesh position={[0, 3.4, 0]}>
        <planeGeometry args={[20, 5.4]} />
        <meshStandardMaterial
          color="#07090f"
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Frame border with cyan neon glow */}
      <mesh position={[0, 6.1, 0.02]}>
        <planeGeometry args={[20, 0.05]} />
        <meshBasicMaterial color="#00F0FF" />
      </mesh>
      <mesh position={[0, 0.7, 0.02]}>
        <planeGeometry args={[20, 0.05]} />
        <meshBasicMaterial color="#0066FF" />
      </mesh>

      {/* 3D Emblem Group (Logo Icon) */}
      <group
        ref={emblemRef}
        position={[0, 4.2, 0.2]}
        onPointerOver={() => setHoveringInteractive(true, 'Biểu tượng TechTonic')}
        onPointerOut={() => setHoveringInteractive(false)}
      >
        {/* Outer Ring */}
        <mesh>
          <ringGeometry args={[0.9, 1.05, 6]} />
          <meshStandardMaterial
            color="#00F0FF"
            emissive="#00F0FF"
            emissiveIntensity={0.6}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Inner Ring */}
        <mesh position={[0, 0, 0.02]}>
          <ringGeometry args={[0.7, 0.8, 6]} />
          <meshStandardMaterial
            color="#0066FF"
            emissive="#0066FF"
            emissiveIntensity={0.8}
          />
        </mesh>

        {/* Center Tech Sphere */}
        <mesh position={[0, 0, 0.05]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#00F0FF"
            emissiveIntensity={0.8}
            metalness={0.5}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* Slogan & Mission Graphic Plane */}
      <mesh position={[0, 2.5, 0.08]}>
        <planeGeometry args={[14, 7]} />
        <meshBasicMaterial map={textTexture} transparent />
      </mesh>
    </group>
  );
};
