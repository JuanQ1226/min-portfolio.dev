"use client";

import { useRef, useEffect, useCallback } from "react";
import * as THREE from "three";

type WaveShaderProps = Readonly<{
  scrollProgress: number;
}>;

const TRAIL_LENGTH = 16;

// Classic 3D Simplex noise (Stefan Gustavson), inlined for GLSL
const noiseGLSL = `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
`;

const vertexShader = `
  ${noiseGLSL}

  uniform float uTime;
  uniform float uScrollProgress;
  uniform vec2 uTrail[${TRAIL_LENGTH}];
  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vNormal;
  varying float vDrainFactor;
  varying float vLensFactor;

  void main() {
    vUv = uv;

    // Drain parameters
    float drainRadius = 2.2;  // how far the spiral pull reaches
    float drainCore = 0.5;    // tight center of the drain
    float funnelDepth = 0.35; // shallow funnel — subtle at this camera angle
    float spiralSpeed = 0.2;  // slow rotation speed

    // Distance from terrain center
    // Scale X by plane aspect ratio (14/10) so the drain is a perfect circle
    vec2 center = vec2(0.0, 0.0);
    vec2 delta = position.xy - center;
    vec2 scaledDelta = vec2(delta.x / 1.4, delta.y);
    float dist = length(scaledDelta);
    vec2 dirFromCenter = (dist > 0.001) ? normalize(delta) : vec2(0.0);

    // How much this vertex is affected by the drain (1.0 at center, 0.0 outside radius)
    float drainInfluence = smoothstep(drainRadius, drainCore, dist);
    vDrainFactor = drainInfluence;

    // Spiral offset: gently rotate noise sampling around center
    // Small angle — just enough to see the swirl, avoids moiré aliasing
    float spiralAngle = drainInfluence * 0.8 + uTime * spiralSpeed;
    float cosA = cos(spiralAngle);
    float sinA = sin(spiralAngle);
    vec2 spiralPos = vec2(
      position.x * cosA - position.y * sinA,
      position.x * sinA + position.y * cosA
    );

    // Blend between original and spiraled position based on drain influence
    vec2 noisePos = mix(position.xy, spiralPos, drainInfluence * 0.4);

    // Gentle inward pull toward center
    vec2 inwardPull = -dirFromCenter * drainInfluence * 0.15;
    noisePos += inwardPull;

    // Distortion lens: warp noise coordinates around the drain rim
    // Peaks in a ring around the hole, fades inward and outward
    float lensInner = drainCore + 0.2;
    float lensOuter = drainRadius + 0.6;
    float lensPeak = (lensInner + lensOuter) * 0.5;
    float lensWidth = (lensOuter - lensInner) * 0.5;
    float lensFactor = 1.0 - smoothstep(0.0, lensWidth, abs(dist - lensPeak));
    lensFactor = lensFactor * lensFactor; // sharpen the falloff
    vLensFactor = lensFactor;

    // Radial magnification: push noise coords outward (stretches pattern radially)
    vec2 radialDir = (dist > 0.001) ? delta / dist : vec2(0.0);
    noisePos += radialDir * lensFactor * 0.8;

    // Tangential warp: rotate noise coords in the lens zone for a swirl distortion
    float lensAngle = lensFactor * 0.5 + lensFactor * sin(uTime * 0.4) * 0.15;
    float lc = cos(lensAngle);
    float ls = sin(lensAngle);
    vec2 centered = noisePos - center;
    noisePos = center + vec2(centered.x * lc - centered.y * ls,
                             centered.x * ls + centered.y * lc);

    float amplitude = 0.3 * (1.0 - uScrollProgress * 0.5);
    float speed = uTime * 0.35;

    // Horizontal drift for flowing movement
    float driftX = uTime * 0.12;
    float driftY = uTime * 0.06;

    // Liquid surface noise using spiral-distorted coordinates
    float n1 = snoise(vec3(noisePos.x * 0.5 + driftX, noisePos.y * 0.5 + driftY, speed)) * 1.0;
    float n2 = snoise(vec3(noisePos.x * 1.0 + driftX * 1.3, noisePos.y * 1.0 + driftY * 0.8, speed * 1.2)) * 0.4;
    float n3 = snoise(vec3(noisePos.x * 2.0 + driftX * 0.7, noisePos.y * 2.0 + driftY * 1.5, speed * 1.6)) * 0.15;

    float elevation = (n1 + n2 + n3) * amplitude;

    // Mouse trail: gentle ripples like touching water
    for (int i = 0; i < ${TRAIL_LENGTH}; i++) {
      vec2 trailWorld = (uTrail[i] - 0.5) * vec2(14.0, 10.0);
      float trailDist = length(position.xy - trailWorld);
      float age = float(i) / float(${TRAIL_LENGTH - 1});
      float strength = (1.0 - age) * 0.08;
      float radius = 0.5 + age * 0.4;
      float bump = smoothstep(radius, 0.0, trailDist) * strength;
      elevation += bump;
    }

    // Funnel depression: gentle bowl shape
    float funnelShape = smoothstep(drainRadius, drainCore, dist);
    float funnel = funnelShape * funnelDepth;
    elevation -= funnel;

    // Gradually reduce noise inside the funnel (smoother center)
    float noiseAttenuation = smoothstep(drainCore, drainRadius * 0.7, dist);
    elevation = mix(elevation * 0.3 - funnel * 0.7, elevation, noiseAttenuation);

    // Subtle rim: tiny ridge where the funnel meets flat terrain
    float rimFactor = smoothstep(drainRadius - 0.3, drainRadius, dist) * smoothstep(drainRadius + 0.4, drainRadius, dist);
    elevation += rimFactor * 0.05;

    vElevation = elevation;

    vec3 newPosition = position;
    newPosition.z += elevation;

    // Approximate normal via finite differences for lighting
    float eps = 0.05;
    float nx1 = snoise(vec3((noisePos.x + eps) * 0.5 + driftX, noisePos.y * 0.5 + driftY, speed));
    float nx2 = snoise(vec3((noisePos.x - eps) * 0.5 + driftX, noisePos.y * 0.5 + driftY, speed));
    float ny1 = snoise(vec3(noisePos.x * 0.5 + driftX, (noisePos.y + eps) * 0.5 + driftY, speed));
    float ny2 = snoise(vec3(noisePos.x * 0.5 + driftX, (noisePos.y - eps) * 0.5 + driftY, speed));
    vec3 calcNormal = normalize(vec3(
      (nx2 - nx1) * amplitude / (2.0 * eps),
      (ny2 - ny1) * amplitude / (2.0 * eps),
      1.0
    ));
    vNormal = normalize(normalMatrix * calcNormal);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const fragmentShader = `
  uniform float uScrollProgress;
  uniform float uTime;
  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vNormal;
  varying float vDrainFactor;
  varying float vLensFactor;

  void main() {
    // Directional light from upper-right
    vec3 lightDir = normalize(vec3(0.4, 0.6, 1.0));
    float diffuse = max(dot(vNormal, lightDir), 0.0);

    // Specular highlight for liquid sheen
    vec3 viewDir = vec3(0.0, 0.0, 1.0);
    vec3 halfDir = normalize(lightDir + viewDir);
    float specular = pow(max(dot(vNormal, halfDir), 0.0), 64.0) * 0.35;

    // Base brightness: subtle ambient + diffuse + specular
    float base = 0.03 + diffuse * 0.14 + specular;
    float elevationTint = smoothstep(-0.2, 0.3, vElevation) * 0.06;
    float brightness = base + elevationTint;

    // Darken inside the drain — deeper = darker
    float depthDarken = vDrainFactor * vDrainFactor * 0.7;
    brightness *= (1.0 - depthDarken);

    // Glow ring at the drain rim where liquid catches light before falling in
    float rimGlow = smoothstep(0.0, 0.3, vDrainFactor) * smoothstep(0.55, 0.3, vDrainFactor);
    float pulse = 1.0 + sin(uTime * 1.0) * 0.06;
    brightness += rimGlow * 0.15 * pulse;

    // Faint inner glow — light refracting through the swirling water
    float innerGlow = smoothstep(0.3, 0.6, vDrainFactor) * smoothstep(0.9, 0.6, vDrainFactor);
    brightness += innerGlow * 0.04;

    // Distortion lens caustic: flickering brightness in the lens zone
    float caustic = vLensFactor * 0.08 * (1.0 + sin(uTime * 2.0 + vUv.x * 30.0) * 0.5)
                  + vLensFactor * 0.04 * (1.0 + cos(uTime * 1.3 + vUv.y * 25.0) * 0.5);
    brightness += caustic;

    // Edge fade
    float edgeFade = smoothstep(0.0, 0.25, vUv.x) * smoothstep(1.0, 0.75, vUv.x);
    edgeFade *= smoothstep(0.0, 0.25, vUv.y) * smoothstep(1.0, 0.75, vUv.y);

    float alpha = edgeFade * (1.0 - uScrollProgress);

    vec3 color = vec3(brightness);
    gl_FragColor = vec4(color, alpha);
  }
`;

export default function WaveShader({ scrollProgress }: WaveShaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef(0);
  const mouseTarget = useRef({ x: 0.5, y: 0.5 });
  const mouseCurrent = useRef({ x: 0.5, y: 0.5 });
  const trailRef = useRef<THREE.Vector2[]>(
    Array.from({ length: TRAIL_LENGTH }, () => new THREE.Vector2(0.5, 0.5))
  );
  const frameCount = useRef(0);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    material: THREE.ShaderMaterial;
    animationId: number;
  } | null>(null);

  const handleResize = useCallback(() => {
    if (!sceneRef.current || !containerRef.current) return;
    const { renderer, camera } = sceneRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (typeof window === "undefined" || !container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 2, 6);
    camera.lookAt(0, 0, 0);

    const isMobile = window.innerWidth < 768;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Reduce geometry segments on smaller screens for mobile performance
    const segments = isMobile ? 100 : 200;
    const geometry = new THREE.PlaneGeometry(14, 10, segments, segments);
    geometry.rotateX(-Math.PI * 0.35);

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uScrollProgress: { value: 0 },
        uTrail: { value: trailRef.current },
      },
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const clock = new THREE.Clock();

    const handleMouseMove = (e: MouseEvent) => {
      mouseTarget.current.x = e.clientX / window.innerWidth;
      mouseTarget.current.y = 1.0 - e.clientY / window.innerHeight;
    };

    let animationId = 0;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (scrollProgressRef.current >= 1) return;

      // Smooth lerp toward target mouse position
      const lerpFactor = 0.08;
      mouseCurrent.current.x += (mouseTarget.current.x - mouseCurrent.current.x) * lerpFactor;
      mouseCurrent.current.y += (mouseTarget.current.y - mouseCurrent.current.y) * lerpFactor;

      // Update trail: shift positions every 3 frames for a spaced-out trail
      frameCount.current++;
      if (frameCount.current % 3 === 0) {
        for (let i = TRAIL_LENGTH - 1; i > 0; i--) {
          trailRef.current[i].copy(trailRef.current[i - 1]);
        }
        trailRef.current[0].set(mouseCurrent.current.x, mouseCurrent.current.y);
      }

      material.uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };
    animate();

    sceneRef.current = { renderer, scene, camera, material, animationId };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [handleResize]);

  // Update scroll uniform without recreating the scene
  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
    if (sceneRef.current) {
      sceneRef.current.material.uniforms.uScrollProgress.value = scrollProgress;
    }
  }, [scrollProgress]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
    />
  );
}
