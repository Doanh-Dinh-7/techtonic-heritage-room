import React, { useRef } from 'react';
import * as THREE from 'three';

export const StudioLights: React.FC = () => {
  // Target refs for spotlights
  const centerWallTarget = useRef<THREE.Object3D>(new THREE.Object3D());
  const centralIslandTarget = useRef<THREE.Object3D>(new THREE.Object3D());
  const shirtTarget = useRef<THREE.Object3D>(new THREE.Object3D());
  const timelineTarget = useRef<THREE.Object3D>(new THREE.Object3D());
  const interactiveTarget = useRef<THREE.Object3D>(new THREE.Object3D());

  return (
    <group>
      {/* Invisible target objects for spotlight orientation */}
      <primitive object={centerWallTarget.current} position={[0, 3.5, -18.6]} />
      <primitive object={centralIslandTarget.current} position={[0, 0.8, -5]} />
      <primitive object={shirtTarget.current} position={[15.8, 2.2, -4]} />
      <primitive object={timelineTarget.current} position={[-15.8, 2.2, -4]} />
      <primitive object={interactiveTarget.current} position={[13, 2, -17]} />

      {/* 1. Dark Museum Ambient Light - Balanced and atmospheric */}
      <ambientLight color="#1a233a" intensity={1.5} />

      {/* 2. Soft Blue Directional Top Fill */}
      <directionalLight
        position={[0, 12, 0]}
        intensity={0.6}
        color="#38bdf8"
      />

      {/* 3. Entrance Corridor Dim Downlights */}
      <pointLight
        position={[0, 4.2, 14]}
        intensity={2.5}
        distance={12}
        color="#00F0FF"
      />
      <pointLight
        position={[0, 4.2, 10]}
        intensity={3.0}
        distance={12}
        color="#ffffff"
      />

      {/* 4. Center Wall Dramatic Spotlights */}
      <spotLight
        position={[0, 6, -11]}
        target={centerWallTarget.current}
        intensity={8.0}
        angle={0.75}
        penumbra={0.5}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <spotLight
        position={[-8, 5.8, -12]}
        target={centerWallTarget.current}
        intensity={5.0}
        angle={0.65}
        penumbra={0.7}
        color="#00F0FF"
      />
      <spotLight
        position={[8, 5.8, -12]}
        target={centerWallTarget.current}
        intensity={5.0}
        angle={0.65}
        penumbra={0.7}
        color="#0066FF"
      />

      {/* 5. Central Island Pedestal Spotlights */}
      <spotLight
        position={[0, 6.2, -5]}
        target={centralIslandTarget.current}
        intensity={7.0}
        angle={0.7}
        penumbra={0.5}
        color="#FFF2B2"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight
        position={[0, 2.5, -5]}
        intensity={2.5}
        distance={8}
        color="#FFD700"
      />

      {/* 6. Club Shirt Display Spotlight (Right Perimeter) */}
      <spotLight
        position={[8, 5.8, -4]}
        target={shirtTarget.current}
        intensity={7.5}
        angle={0.65}
        penumbra={0.5}
        color="#00F0FF"
        castShadow
      />
      <pointLight
        position={[14.5, 3.2, -4]}
        intensity={3.0}
        distance={6}
        color="#00F0FF"
      />

      {/* 7. History Timeline Spotlight (Left Perimeter) */}
      <spotLight
        position={[-8, 5.8, -4]}
        target={timelineTarget.current}
        intensity={7.0}
        angle={0.7}
        penumbra={0.6}
        color="#ffffff"
        castShadow
      />
      <pointLight
        position={[-15.5, 3.2, -4]}
        intensity={3.0}
        distance={7}
        color="#38bdf8"
      />

      {/* 8. Interactive Corner Spotlight */}
      <spotLight
        position={[6, 5.8, -13]}
        target={interactiveTarget.current}
        intensity={6.0}
        angle={0.7}
        penumbra={0.5}
        color="#00F0FF"
      />
      <pointLight
        position={[9.5, 3.5, -15]}
        intensity={2.5}
        distance={6}
        color="#FF0077"
      />
    </group>
  );
};
