import { useEffect, useRef } from 'react';
import { useHeritageStore } from '../store/useHeritageStore';

export const useAudio = () => {
  const { isMuted, isLocked } = useHeritageStore();
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ambientOsc1Ref = useRef<OscillatorNode | null>(null);
  const ambientOsc2Ref = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const initAudio = () => {
    if (audioCtxRef.current) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.04, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Low harmonic ambient drone (Tech museum atmosphere)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(110, ctx.currentTime); // A2

      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(164.81, ctx.currentTime); // E3

      // Low-pass filter to make it warm and cinematic
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(280, ctx.currentTime);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(masterGain);

      osc1.start();
      osc2.start();

      ambientOsc1Ref.current = osc1;
      ambientOsc2Ref.current = osc2;
    } catch (e) {
      console.warn('Web Audio not available:', e);
    }
  };

  // Mute / Unmute
  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      if (isMuted) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.1);
      } else {
        gainNodeRef.current.gain.setTargetAtTime(0.04, audioCtxRef.current.currentTime, 0.1);
      }
    }
  }, [isMuted]);

  return { initAudio };
};
