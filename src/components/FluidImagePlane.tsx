"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useFluidCursor } from "@/hooks/useFluidCursor";

const vertexShader = `
  varying vec2 vUv;
  uniform sampler2D u_depthMap;
  uniform vec2 u_mouse;
  uniform float u_parallaxStrength;

  void main() {
    vUv = uv;
    float depth = texture2D(u_depthMap, uv).r;
    vec3 newPosition = position;
    newPosition.x += (u_mouse.x - 0.5) * depth * u_parallaxStrength;
    newPosition.y += (u_mouse.y - 0.5) * depth * u_parallaxStrength;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D u_faceTexture;
  uniform sampler2D u_tombTexture;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform vec2 u_velocity;
  uniform float u_scrollProgress;
  uniform float u_hovering;

  vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x_ = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x_) - 0.5;
    vec3 ox = floor(x_ + 0.5);
    vec3 a0 = x_ - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec2 g0 = vec2(a0.x * x0.x + h.x * x0.y, 0.0);
    vec2 g1 = vec2(a0.y * x12.x + h.y * x12.y, 0.0);
    vec2 g2 = vec2(a0.z * x12.z + h.z * x12.w, 0.0);
    g0.y = -(a0.x * x0.y - h.x * x0.x);
    g1.y = -(a0.y * x12.y - h.y * x12.x);
    g2.y = -(a0.z * x12.w - h.z * x12.z);
    return 130.0 * dot(m, vec3(dot(g0, x0), dot(g1, x12.xy), dot(g2, x12.zw)));
  }

  void main() {
    float speed = length(u_velocity);

    vec2 stretchDir = speed > 0.001 ? normalize(u_velocity) : vec2(0.0);
    vec2 distortedUv = vUv + stretchDir * speed * 0.15
                       * snoise(vUv * 5.0 + u_time * 0.3);

    float blobNoise1 = snoise(vUv * 4.0 + u_time * 0.5) * 0.06;
    float blobNoise2 = snoise(vUv * 9.0 - u_time * 0.3) * 0.03;
    float blobNoise3 = snoise(vUv * 2.5 + u_time * 0.15) * 0.04;
    float noiseTotal = blobNoise1 + blobNoise2 + blobNoise3;

    vec2 toMouse = vUv - u_mouse;
    vec2 stretchedDist = toMouse;
    if (speed > 0.001) {
      vec2 velDir = normalize(u_velocity);
      float along = dot(toMouse, velDir);
      float stretch = 1.0 + speed * 12.0;
      stretchedDist -= velDir * along * (1.0 - 1.0 / stretch);
    }
    float dist = length(stretchedDist);

    float baseRadius = 0.08 + u_scrollProgress * 0.15;
    float velocityRadius = speed * 6.0;
    float maskRadius = baseRadius + velocityRadius;

    float edge0 = maskRadius - 0.04 + noiseTotal;
    float edge1 = maskRadius + 0.04 + noiseTotal;

    vec4 face = texture2D(u_faceTexture, distortedUv);
    vec4 tomb = texture2D(u_tombTexture, vUv);

    float overTomb = step(0.1, tomb.a);

    // when hovering over canvas reveal the face image
    // when outside canvas (u_hovering < 1) show a subtle tint circle instead
    float reveal = (1.0 - smoothstep(edge0, edge1, dist)) * u_hovering * overTomb;

    // subtle amber glow circle that shows even outside canvas area
    float glowCircle = (1.0 - smoothstep(edge0, edge1, dist)) * (1.0 - u_hovering);
    vec3 glowColor = vec3(0.6, 0.35, 0.05); // dark amber tint

    float rimWidth = 0.018 + speed * 0.04;
    float rim = smoothstep(rimWidth, 0.0, abs(dist - maskRadius - noiseTotal * 0.5))
                * (0.4 + speed * 4.0);
    vec3 goldRim = vec3(0.9, 0.72, 0.3);

    vec3 color = mix(tomb.rgb, face.rgb, reveal * face.a);
    color += goldRim * rim * tomb.a;
    // add subtle glow tint outside canvas
    color += glowColor * glowCircle * tomb.a * 0.3;

    float alpha = max(tomb.a, reveal * face.a);

    gl_FragColor = vec4(color, alpha);
  }
`;

interface FluidImagePlaneProps {
  scrollProgress: React.MutableRefObject<number>;
  isOverMeshRef: React.MutableRefObject<boolean>;
}

export default function FluidImagePlane({
  scrollProgress,
  isOverMeshRef,
}: FluidImagePlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const hoverRef = useRef(0.0);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const rawMouse = useRef({ x: 0.5, y: 0.5 });
  const glCanvasRect = useRef<DOMRect | null>(null);
  const { viewport } = useThree();
  const { update } = useFluidCursor();

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      // use stored rect from useFrame which is always the WebGL canvas
      if (!glCanvasRect.current) return;
      const rect = glCanvasRect.current;
      rawMouse.current.x = (e.clientX - rect.left) / rect.width;
      rawMouse.current.y = 1.0 - (e.clientY - rect.top) / rect.height;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useTexture.preload("/images/reveal.png");
  useTexture.preload("/images/tomb.png");
  useTexture.preload("/images/depth-image.png");

  const [faceTexture, tombTexture, depthTexture] = useTexture([
    "/images/reveal.png",
    "/images/tomb.png",
    "/images/depth-image.png",
  ]);

  [faceTexture, tombTexture, depthTexture].forEach((t) => {
    t.generateMipmaps = true;
    t.minFilter = THREE.LinearMipmapLinearFilter;
    t.magFilter = THREE.LinearFilter;
    t.anisotropy = 16;
    t.needsUpdate = true;
  });

  faceTexture.premultiplyAlpha = false;
  tombTexture.premultiplyAlpha = false;
  faceTexture.needsUpdate = true;
  tombTexture.needsUpdate = true;

  const uniforms = useMemo(
    () => ({
      u_faceTexture: { value: faceTexture },
      u_tombTexture: { value: tombTexture },
      u_depthMap: { value: depthTexture },
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_velocity: { value: new THREE.Vector2(0, 0) },
      u_parallaxStrength: { value: 0.12 },
      u_scrollProgress: { value: 0 },
      u_hovering: { value: 0.0 },
    }),
    [faceTexture, tombTexture, depthTexture],
  );

  useFrame((state) => {
    if (!materialRef.current) return;
    const cursor = update(0.075);
    const mat = materialRef.current;

    // always keep rect fresh — this is the definitive WebGL canvas
    glCanvasRect.current = state.gl.domElement.getBoundingClientRect();

    mat.uniforms.u_time.value = state.clock.getElapsedTime();
    mat.uniforms.u_mouse.value.set(rawMouse.current.x, rawMouse.current.y);
    mat.uniforms.u_velocity.value.set(
      cursor.velocity.x,
      -cursor.velocity.y,
    );
    mat.uniforms.u_scrollProgress.value = scrollProgress.current;
mat.uniforms.u_hovering.value = 1.0;
  });

  const imageAspect = 9 / 16;
  const planeH = viewport.height * 1.2;
  const planeW = planeH * imageAspect;

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, 0]}
      onPointerEnter={() => {
        hoverRef.current = 1.0;
        isOverMeshRef.current = true;
      }}
      onPointerLeave={() => {
        hoverRef.current = 0.0;
        isOverMeshRef.current = false;
      }}
      onPointerMove={() => {
        hoverRef.current = 1.0;
        isOverMeshRef.current = true;
      }}
    >
      <planeGeometry args={[planeW, planeH, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}
