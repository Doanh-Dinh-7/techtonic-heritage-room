import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { useHeritageStore } from '../../../store/useHeritageStore';

export const CentralIsland: React.FC = () => {
  const { setHoveringInteractive, openModal, exhibitItems } = useHeritageStore();

  const trophy1Ref = useRef<THREE.Group>(null);
  const trophy2Ref = useRef<THREE.Group>(null);
  const trophy3Ref = useRef<THREE.Group>(null);
  const trophy4Ref = useRef<THREE.Group>(null);

  // Slow rotation for trophies inside glass cases
  useFrame((_, delta) => {
    if (trophy1Ref.current) trophy1Ref.current.rotation.y += delta * 0.5;
    if (trophy2Ref.current) trophy2Ref.current.rotation.y += delta * 0.4;
    if (trophy3Ref.current) trophy3Ref.current.rotation.y += delta * 0.45;
    if (trophy4Ref.current) trophy4Ref.current.rotation.y += delta * 0.5;
  });

  // Trophies arranged circularly at radii 3.2m from center [0, 0, -5]
  const exhibits = [
    {
      ref: trophy1Ref,
      item: exhibitItems[0],
      position: [0, 1.25, -2] as [number, number, number],
      color: '#FFD700', // Gold
    },
    {
      ref: trophy2Ref,
      item: exhibitItems[1],
      position: [3, 1.25, -5] as [number, number, number],
      color: '#00F0FF', // Cyan / Certificate
    },
    {
      ref: trophy3Ref,
      item: exhibitItems[2],
      position: [0, 1.25, -8] as [number, number, number],
      color: '#FF9900', // Amber
    },
    {
      ref: trophy4Ref,
      item: exhibitItems[3],
      position: [-3, 1.25, -5] as [number, number, number],
      color: '#0066FF', // Blue
    },
  ];

  return (
    <group position={[0, 0, 0]}>
      {/* ================= CENTRAL ISLAND BASE (PHYSICS COLLIDER) ================= */}
      {/* Circular low platform so player walks 360 around it */}
      <RigidBody type="fixed" position={[0, 0.2, -5]}>
        <mesh receiveShadow castShadow>
          <cylinderGeometry args={[4.6, 4.8, 0.4, 48]} />
          <meshStandardMaterial
            color="#0c101a"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        {/* Outer Emissive Trim Ring */}
        <mesh position={[0, 0.21, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[4.5, 4.6, 48]} />
          <meshBasicMaterial color="#00F0FF" />
        </mesh>
      </RigidBody>

      {/* Center Plaque in Island Floor */}
      <mesh position={[0, 0.42, -5]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.2, 32]} />
        <meshStandardMaterial color="#070a10" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* ================= DISPLAY PEDESTALS & GLASS CASES ================= */}
      {exhibits.map((ex, idx) => (
        <group key={idx}>
          {/* Pedestal Base with Rapier Physics collision */}
          <RigidBody type="fixed" position={[ex.position[0], 0.7, ex.position[2]]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[1.2, 0.8, 1.2]} />
              <meshStandardMaterial
                color="#0a0d15"
                metalness={0.9}
                roughness={0.2}
              />
            </mesh>
            {/* Top base plate */}
            <mesh position={[0, 0.41, 0]}>
              <boxGeometry args={[1.22, 0.04, 1.22]} />
              <meshBasicMaterial color={ex.color} />
            </mesh>
          </RigidBody>

          {/* Transparent Glass Case over trophy */}
          <mesh position={[ex.position[0], 1.5, ex.position[2]]}>
            <boxGeometry args={[1.1, 0.9, 1.1]} />
            <meshPhysicalMaterial
              transparent
              opacity={0.3}
              roughness={0.1}
              metalness={0.1}
              transmission={0.9}
              ior={1.5}
            />
          </mesh>

          {/* Interactive Trophy / Exhibit Target */}
          <group
            ref={ex.ref}
            position={ex.position}
            onClick={() => openModal('exhibit', ex.item)}
            onPointerOver={() => setHoveringInteractive(true, `Xem: ${ex.item.title}`)}
            onPointerOut={() => setHoveringInteractive(false)}
          >
            {/* Trophy Stand */}
            <mesh position={[0, 0, 0]} castShadow>
              <cylinderGeometry args={[0.2, 0.28, 0.12, 16]} />
              <meshStandardMaterial color="#1a1e28" metalness={0.9} roughness={0.2} />
            </mesh>

            {/* Trophy Stem */}
            <mesh position={[0, 0.16, 0]}>
              <cylinderGeometry args={[0.06, 0.06, 0.2, 16]} />
              <meshStandardMaterial color={ex.color} metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Trophy Cup / Emblem */}
            <mesh position={[0, 0.35, 0]}>
              <cylinderGeometry args={[0.24, 0.08, 0.25, 16]} />
              <meshStandardMaterial
                color={ex.color}
                metalness={0.95}
                roughness={0.1}
                emissive={ex.color}
                emissiveIntensity={0.25}
              />
            </mesh>

            {/* Star/Gem on top */}
            <mesh position={[0, 0.5, 0]}>
              <octahedronGeometry args={[0.1]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          </group>

          {/* Soft upward spotlight inside the pedestal glass */}
          <pointLight
            position={[ex.position[0], 1.15, ex.position[2]]}
            intensity={1.0}
            distance={2.5}
            color={ex.color}
          />
        </group>
      ))}
    </group>
  );
};
