import { useRef, useCallback, useEffect } from 'react';
import * as THREE from 'three';

interface FluidCursorState {
  mouse: THREE.Vector2;
  target: THREE.Vector2;
  velocity: THREE.Vector2;
  prev: THREE.Vector2;
  trail: THREE.Vector2[];
}

export function useFluidCursor(trailLength = 20) {
  const state = useRef<FluidCursorState>({
    mouse: new THREE.Vector2(0.5, 0.5),
    target: new THREE.Vector2(0.5, 0.5),
    velocity: new THREE.Vector2(0, 0),
    prev: new THREE.Vector2(0.5, 0.5),
    trail: Array.from({ length: trailLength }, () => new THREE.Vector2(0.5, 0.5)),
  });

  const onMouseMove = useCallback((e: MouseEvent) => {
    state.current.mouse.set(
      e.clientX / window.innerWidth,
      1.0 - e.clientY / window.innerHeight
    );
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [onMouseMove]);

  const update = useCallback((lerpFactor = 0.075) => {
    const s = state.current;

    // Lerp target toward mouse
    s.target.lerp(s.mouse, lerpFactor);

    // Calculate velocity
    s.velocity.copy(s.target).sub(s.prev);

    // Update trail
    for (let i = s.trail.length - 1; i > 0; i--) {
      s.trail[i].lerp(s.trail[i - 1], 0.3);
    }
    s.trail[0].copy(s.target);

    // Store previous
    s.prev.copy(s.target);

    return {
      position: s.target,
      velocity: s.velocity,
      speed: s.velocity.length(),
      trail: s.trail,
    };
  }, []);

  return { state: state.current, update };
}
