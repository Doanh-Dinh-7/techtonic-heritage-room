import React, { Suspense } from 'react';
import { Physics } from '@react-three/rapier';
import { StudioLights } from './Environment/StudioLights';
import { MuseumRoom } from './Environment/MuseumRoom';
import { CenterWall } from './Exhibits/CenterWall';
import { PerimeterGallery } from './Exhibits/PerimeterGallery';
import { CentralIsland } from './Exhibits/CentralIsland';
import { InteractiveCorner } from './Exhibits/InteractiveCorner';
import { PlayerController } from './PlayerController';

export const Scene: React.FC = () => {
  return (
    <Suspense fallback={null}>
      {/* Lighting System outside Physics */}
      <StudioLights />

      {/* Physics World for Collisions and Character Movement */}
      <Physics gravity={[0, -9.81, 0]}>
        {/* Museum Architectural Boundary */}
        <MuseumRoom />

        {/* First Focal Point: Center Wall */}
        <CenterWall />

        {/* Circular Perimeter: Timeline & Club Shirt */}
        <PerimeterGallery />

        {/* Central Island: 360 Trophies & Pedestals */}
        <CentralIsland />

        {/* Interactive Corner: Video Screen & Guestbook */}
        <InteractiveCorner />

        {/* FPS Character Controller (Player starts in Entrance Corridor) */}
        <PlayerController initialPosition={[0, 1.4, 13.5]} />
      </Physics>
    </Suspense>
  );
};
