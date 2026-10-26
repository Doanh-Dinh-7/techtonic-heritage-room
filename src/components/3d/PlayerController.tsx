import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import { RigidBody, RapierRigidBody, CapsuleCollider } from '@react-three/rapier';
import * as THREE from 'three';
import { useKeyboardControls } from '../../hooks/useKeyboardControls';
import { useHeritageStore } from '../../store/useHeritageStore';

const SPEED_WALK = 4.5;
const SPEED_RUN = 7.5;
const JUMP_FORCE = 4.5;

interface PlayerControllerProps {
  initialPosition?: [number, number, number];
}

export const PlayerController: React.FC<PlayerControllerProps> = ({
  initialPosition = [0, 1.4, 14],
}) => {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const { forward, backward, left, right, shift, jump } = useKeyboardControls();
  const { isLocked, setLocked, activeModal } = useHeritageStore();
  const controlsRef = useRef<any>(null);

  const frontVector = useRef(new THREE.Vector3());
  const sideVector = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());
  const cameraEuler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'));

  // Track previous modal state to detect open→close transitions
  const prevModalRef = useRef<string | null>(null);

  const handleLock = () => setLocked(true);
  const handleUnlock = () => setLocked(false);

  // Central logic: unlock when modal opens, re-lock when modal closes
  useEffect(() => {
    if (activeModal) {
      // ─── MODAL OPENED ───
      // Force-release pointer so user gets a free cursor for modal interaction.
      // PointerLockControls is also disabled via `enabled` prop (see JSX),
      // so no click anywhere can trigger requestPointerLock while modal is open.
      if (controlsRef.current?.isLocked) {
        controlsRef.current.unlock();
      }
      if (document.pointerLockElement) {
        try { document.exitPointerLock(); } catch (_) {}
      }
    } else if (prevModalRef.current !== null && activeModal === null) {
      // ─── MODAL JUST CLOSED ───
      // Re-lock after a delay so browser has time to settle and
      // PointerLockControls re-enables via the `enabled` prop change.
      const timer = setTimeout(() => {
        if (controlsRef.current && !controlsRef.current.isLocked) {
          try {
            controlsRef.current.lock();
          } catch (_) {
            document.querySelector('canvas')?.requestPointerLock?.();
          }
        }
      }, 200);
      return () => clearTimeout(timer);
    }
    prevModalRef.current = activeModal;
  }, [activeModal]);

  useFrame((state) => {
    if (!rigidBodyRef.current) return;

    const currentVelocity = rigidBodyRef.current.linvel();
    const pos = rigidBodyRef.current.translation();

    // Attach camera to player head position
    state.camera.position.set(pos.x, pos.y + 0.6, pos.z);

    // If pointer is unlocked or modal is open, decelerate smoothly
    if (!isLocked || activeModal) {
      rigidBodyRef.current.setLinvel(
        { x: currentVelocity.x * 0.8, y: currentVelocity.y, z: currentVelocity.z * 0.8 },
        true
      );
      return;
    }

    const speed = shift ? SPEED_RUN : SPEED_WALK;

    frontVector.current.set(0, 0, (backward ? 1 : 0) - (forward ? 1 : 0));
    sideVector.current.set((right ? 1 : 0) - (left ? 1 : 0), 0, 0);

    direction.current
      .addVectors(frontVector.current, sideVector.current)
      .normalize()
      .multiplyScalar(speed);

    cameraEuler.current.setFromQuaternion(state.camera.quaternion);
    cameraEuler.current.x = 0;
    cameraEuler.current.z = 0;
    direction.current.applyEuler(cameraEuler.current);

    let vy = currentVelocity.y;
    if (jump && Math.abs(currentVelocity.y) < 0.1) {
      vy = JUMP_FORCE;
    }

    rigidBodyRef.current.setLinvel(
      { x: direction.current.x, y: vy, z: direction.current.z },
      true
    );

    // Respawn if fallen below floor
    if (pos.y < -5) {
      rigidBodyRef.current.setTranslation(
        { x: initialPosition[0], y: initialPosition[1], z: initialPosition[2] },
        true
      );
      rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
    }
  });

  return (
    <>
      {/*
        KEY FIX: enabled={!activeModal}
        When a modal is open, PointerLockControls is FULLY disabled —
        its internal click-to-lock handler is removed from the DOM,
        so NO click anywhere can trigger requestPointerLock.
        This is why clicking tabs/buttons inside the modal no longer re-locks.
      */}
      <PointerLockControls
        ref={controlsRef}
        enabled={!activeModal}
        onLock={handleLock}
        onUnlock={handleUnlock}
      />
      <RigidBody
        ref={rigidBodyRef}
        colliders={false}
        mass={1}
        type="dynamic"
        position={initialPosition}
        enabledRotations={[false, false, false]}
        canSleep={false}
      >
        <CapsuleCollider args={[0.55, 0.35]} />
      </RigidBody>
    </>
  );
};
