export const fluidVertexShader = `
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

export const fluidFragmentShader = `
  varying vec2 vUv;
  uniform sampler2D u_baseTexture;
  uniform sampler2D u_revealTexture;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform vec2 u_velocity;
  uniform float u_maskStrength;
  uniform float u_scrollProgress;

  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

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
    m = m*m;
    m = m*m;
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
    
    // Stretch UVs in velocity direction
    vec2 stretchDir = speed > 0.001 ? normalize(u_velocity) : vec2(0.0);
    vec2 distortedUv = vUv + stretchDir * speed * 0.15 * snoise(vUv * 5.0 + u_time * 0.3);
    
    // Distance to cursor
    float dist = distance(vUv, u_mouse);
    
    // Organic noise mask
    float noise1 = snoise(vUv * 3.0 + u_time * 0.4) * 0.12;
    float noise2 = snoise(vUv * 7.0 - u_time * 0.2) * 0.06;
    float noiseTotal = noise1 + noise2;
    
    // Mask radius depends on speed + scroll
    float maskRadius = 0.25 + speed * 8.0 + u_scrollProgress * 0.3;
    float mask = smoothstep(maskRadius + noiseTotal, 0.0, dist);
    
    // Intensity ramps with speed
    mask *= u_maskStrength * (0.6 + speed * 15.0);
    mask = clamp(mask, 0.0, 1.0);
    
    vec4 base = texture2D(u_baseTexture, vUv);
    vec4 reveal = texture2D(u_revealTexture, distortedUv);
    
    // Add subtle gold rim at mask edge
    float rim = smoothstep(0.02, 0.0, abs(mask - 0.5)) * speed * 8.0;
    vec3 goldTint = vec3(0.85, 0.65, 0.3);
    
    vec3 color = mix(base.rgb, reveal.rgb, mask);
    color += goldTint * rim * 0.4;
    
    float alpha = base.a;// ── sample textures ──
   // ── sample textures ──
    vec4 face = texture2D(u_faceTexture, distortedUv);
    vec4 tomb = texture2D(u_tombTexture, vUv);

    // ── gold rim at blob edge ──
    float rimWidth = 0.018 + speed * 0.04;
    float rim = smoothstep(rimWidth, 0.0, abs(dist - maskRadius - noiseTotal * 0.5))
                * (0.4 + speed * 4.0);
    vec3 goldRim = vec3(0.9, 0.72, 0.3);

    // ── composite: tomb default, face revealed at cursor ──
    vec3 color = mix(tomb.rgb, face.rgb, reveal * face.a);
    color += goldRim * rim * tomb.a;

    // tomb shows by default, face bleeds through inside reveal
    float alpha = max(tomb.a, reveal * face.a);

    gl_FragColor = vec4(color, alpha);
  }
`;
