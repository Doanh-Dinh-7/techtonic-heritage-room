import React, { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { useHeritageStore } from '../../../store/useHeritageStore';

export const InteractiveCorner: React.FC = () => {
  const { setHoveringInteractive, openModal } = useHeritageStore();
  const bookRef = useRef<THREE.Group>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const textureRef = useRef<THREE.CanvasTexture | null>(null);

  // Floating animation for guestbook hologram
  useFrame((state) => {
    if (bookRef.current) {
      bookRef.current.position.y = 1.35 + Math.sin(state.clock.elapsedTime * 2) * 0.03;
      bookRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }

    // Dynamic Video/Screen Canvas Animation Loop
    if (canvasRef.current && textureRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        const time = state.clock.elapsedTime;
        const w = 1024;
        const h = 576;

        // Dark background
        ctx.fillStyle = '#060a12';
        ctx.fillRect(0, 0, w, h);

        // Tech grid scanline
        ctx.fillStyle = 'rgba(0, 240, 255, 0.03)';
        for (let y = 0; y < h; y += 8) {
          ctx.fillRect(0, y, w, 1);
        }

        // Animated sine audio/energy waves
        ctx.lineWidth = 3;
        for (let wave = 0; wave < 3; wave++) {
          ctx.beginPath();
          ctx.strokeStyle = wave === 0 ? '#00F0FF' : wave === 1 ? '#0066FF' : '#FF0055';
          for (let x = 0; x < w; x += 10) {
            const freq = 0.015 + wave * 0.005;
            const y = h / 2 + Math.sin(x * freq + time * 3 + wave) * (40 + wave * 25);
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }

        // Glowing center text
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 36px Outfit, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('TECHTONIC PROMO REEL • VIRTUAL EXHIBIT', w / 2, 80);

        ctx.fillStyle = '#00F0FF';
        ctx.font = '600 20px JetBrains Mono, monospace';
        ctx.fillText(`SYSTEM RUNTIME: ${time.toFixed(1)}s • 60 FPS STREAM`, w / 2, 120);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '300 18px Inter, sans-serif';
        ctx.fillText('Pioneering the Next Generation of Digital Builders', w / 2, h - 60);

        // Notify Three.js texture to re-render frame
        textureRef.current.needsUpdate = true;
      }
    }
  });

  // Initialize Canvas Texture for Video Screen
  const videoTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 576;
    canvasRef.current = canvas;
    const tex = new THREE.CanvasTexture(canvas);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    textureRef.current = tex;
    return tex;
  }, []);

  return (
    <group position={[9.5, 0, -16]}>
      {/* ================= 1. VIDEO SCREEN (LOOSE CINEMA DISPLAY) ================= */}
      {/* Screen Frame Stand */}
      <mesh position={[0, 3, -1.8]}>
        <boxGeometry args={[7.2, 4.2, 0.2]} />
        <meshStandardMaterial color="#0b0e17" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Screen Display Area (Playing Dynamic Video Canvas) */}
      <mesh
        position={[0, 3, -1.69]}
        onPointerOver={() => setHoveringInteractive(true, 'Màn hình trình chiếu TechTonic')}
        onPointerOut={() => setHoveringInteractive(false)}
      >
        <planeGeometry args={[6.8, 3.8]} />
        <meshBasicMaterial map={videoTexture} />
      </mesh>

      {/* Frame Glowing Accent */}
      <mesh position={[0, 5.05, -1.68]}>
        <planeGeometry args={[7, 0.04]} />
        <meshBasicMaterial color="#00F0FF" />
      </mesh>
      <mesh position={[0, 0.95, -1.68]}>
        <planeGeometry args={[7, 0.04]} />
        <meshBasicMaterial color="#0066FF" />
      </mesh>

      {/* ================= 2. GUESTBOOK INTERACTIVE KIOSK ================= */}
      {/* Kiosk Pedestal with Physics */}
      <RigidBody type="fixed" position={[-4, 0.55, 1.5]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.2, 1.1, 0.9]} />
          <meshStandardMaterial color="#0e1320" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Kiosk Angled Top Surface */}
        <mesh position={[0, 0.55, 0]} rotation={[-Math.PI / 6, 0, 0]}>
          <boxGeometry args={[1.3, 0.05, 1.0]} />
          <meshStandardMaterial color="#141a29" metalness={0.9} roughness={0.1} />
        </mesh>
      </RigidBody>

      {/* 3D Holographic Guestbook Object (Interactive Target) */}
      <group
        ref={bookRef}
        position={[-4, 1.35, 1.5]}
        onClick={() => openModal('guestbook')}
        onPointerOver={() => setHoveringInteractive(true, 'Nhấp để ghi Lời chúc Sổ lưu bút')}
        onPointerOut={() => setHoveringInteractive(false)}
      >
        {/* Left Book Cover */}
        <mesh position={[-0.22, 0, 0]} rotation={[0, 0.2, 0]} castShadow>
          <boxGeometry args={[0.42, 0.04, 0.55]} />
          <meshStandardMaterial color="#0066FF" metalness={0.6} roughness={0.3} />
        </mesh>

        {/* Right Book Cover */}
        <mesh position={[0.22, 0, 0]} rotation={[0, -0.2, 0]} castShadow>
          <boxGeometry args={[0.42, 0.04, 0.55]} />
          <meshStandardMaterial color="#0066FF" metalness={0.6} roughness={0.3} />
        </mesh>

        {/* Book Pages with glowing cyan text */}
        <mesh position={[0, 0.02, 0]}>
          <boxGeometry args={[0.78, 0.02, 0.5]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#00F0FF"
            emissiveIntensity={0.5}
            roughness={0.2}
          />
        </mesh>

        {/* Floating holographic quill / pen */}
        <mesh position={[0.3, 0.2, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <cylinderGeometry args={[0.015, 0.015, 0.35, 12]} />
          <meshBasicMaterial color="#00F0FF" />
        </mesh>

        {/* Soft Pointlight around Guestbook */}
        <pointLight position={[0, 0.3, 0]} intensity={1.5} distance={3} color="#00F0FF" />
      </group>
    </group>
  );
};
