"use client"

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { fluidVertexShader, fluidFragmentShader } from '@/shaders/fluidShaders';
import { useFluidCursor } from '@/hooks/useFluidCursor';

interface FluidImagePlaneProps {
  scrollProgress: React.MutableRefObject<number>;
}

export default function FluidImagePlane({ scrollProgress }: FluidImagePlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();
  const { update } = useFluidCursor();

  const [baseTexture, revealTexture, depthTexture] = useTexture([
    '/images/reveal.png',
    '/images/darken.png',
    '/images/depth-image.png',
  ]);

  const uniforms = useMemo(() => ({
    u_baseTexture: { value: baseTexture },
    u_revealTexture: { value: revealTexture },
    u_depthMap: { value: depthTexture },
    u_time: { value: 0 },
    u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
    u_velocity: { value: new THREE.Vector2(0, 0) },
    u_maskStrength: { value: 1.0 },
    u_parallaxStrength: { value: 0.12 },
    u_scrollProgress: { value: 0 },
  }), [baseTexture, revealTexture, depthTexture]);

  useFrame((state) => {
    if (!materialRef.current) return;
    const cursor = update(0.075);
    const mat = materialRef.current;

    mat.uniforms.u_time.value = state.clock.getElapsedTime();
    mat.uniforms.u_mouse.value.copy(cursor.position);
    mat.uniforms.u_velocity.value.copy(cursor.velocity);
    mat.uniforms.u_scrollProgress.value = scrollProgress.current;
  });

  // Portrait image: maintain aspect ratio, fit to viewport height, center
  const imageAspect = 9 / 16; // width/height for portrait
  const planeH = viewport.height * 1.2; // Make it slightly larger
  const planeW = planeH * imageAspect;

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[planeW, planeH, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={fluidVertexShader}
        fragmentShader={fluidFragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}
