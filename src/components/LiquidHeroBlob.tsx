import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';

/* =========================================================================
   SIGNAL CORE  –  hero 3D object (replaces the liquid blob)

   A holographic torus-knot "brand core" wrapped in a live network of nodes:
   the knot is the brand, the nodes are the audience / reach the company builds
   (digital marketing + IT + branding). A data packet circles on an orbit ring.

   - Custom fresnel shader: it never depends on scene lights or env maps, so it
     can't render black like a metal material would.
   - Dark  → near-black core, neon iridescent edge-glow, glowing cyan network.
   - Light → pearl core, deep saturated iridescent edges, ink-blue network.
   - One eased value (`mix`) morphs everything when the theme flips, plus a
     spin / pulse burst on the switch.
   - Pointer tilts the whole scene and ripples the knot surface.
========================================================================= */

const damp = THREE.MathUtils.damp;
const lerp = THREE.MathUtils.lerp;

function useThemeMix(target: number) {
  const mix = useRef(target);
  const burst = useRef(0);
  const prev = useRef(target);
  return (delta: number) => {
    if (prev.current !== target) {
      prev.current = target;
      burst.current = 1;
    }
    mix.current = damp(mix.current, target, 3.4, delta);
    burst.current = damp(burst.current, 0, 2.2, delta);
    return { m: mix.current, burst: burst.current };
  };
}

/* ------------------------------ shader --------------------------------- */

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  varying vec3 vNormalW;
  varying vec3 vViewDir;
  varying vec3 vPos;

  void main() {
    vec3 p = position;
    // living surface: soft travelling ripples, nudged by the pointer
    float r = sin(p.x * 4.0 + uTime * 1.6 + uPointer.x * 2.0)
            * cos(p.y * 4.0 - uTime * 1.3 + uPointer.y * 2.0);
    p += normal * r * 0.035;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vNormalW = normalize(normalMatrix * normal);
    vViewDir = normalize(-mv.xyz);
    vPos = p;
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uMix;    // 0 dark … 1 light
  uniform float uBurst;
  varying vec3 vNormalW;
  varying vec3 vViewDir;
  varying vec3 vPos;

  vec3 palette(float t) {
    // cyan → magenta → gold, cycling (brand colours)
    return 0.5 + 0.5 * cos(6.28318 * (t + vec3(0.52, 0.86, 0.18)));
  }

  void main() {
    vec3 n = normalize(vNormalW);
    vec3 v = normalize(vViewDir);
    float fres = pow(1.0 - clamp(dot(n, v), 0.0, 1.0), 2.2);

    float flow = vPos.x * 0.35 + vPos.y * 0.25 + vPos.z * 0.3 + uTime * 0.18 + fres * 0.6;
    vec3 irid = palette(flow);
    // deeper, more saturated colour on a light background
    irid = mix(irid, irid * irid * 0.9, uMix);

    vec3 core = mix(vec3(0.015, 0.03, 0.05), vec3(0.965, 0.975, 1.0), uMix);

    // holographic scan-lines travelling along the knot
    float stripe = smoothstep(0.82, 1.0, sin(vPos.y * 14.0 + vPos.x * 6.0 - uTime * 2.4) * 0.5 + 0.5);

    float edge = clamp(fres * mix(1.5, 1.05, uMix) + mix(0.04, 0.16, uMix), 0.0, 1.0);
    vec3 col = mix(core, irid, edge);
    col += irid * stripe * mix(0.30, 0.14, uMix);
    // bright specular kick from the top-left
    float spec = pow(max(dot(reflect(-v, n), normalize(vec3(-0.5, 0.8, 0.6))), 0.0), 40.0);
    col += vec3(1.0) * spec * mix(0.7, 0.55, uMix);
    col += irid * uBurst * 0.45;

    gl_FragColor = vec4(col, 1.0);
  }
`;

/* ---------------------------- the knot --------------------------------- */

function CoreKnot({ target }: { target: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const tick = useThemeMix(target);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMix: { value: target },
      uBurst: { value: 0 },
      uPointer: { value: new THREE.Vector2() },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useFrame((state, delta) => {
    const { m, burst } = tick(delta);
    uniforms.uTime.value = state.clock.elapsedTime * 0.5;
    uniforms.uMix.value = m;
    uniforms.uBurst.value = burst;
    uniforms.uPointer.value.lerp(state.pointer, 0.08);

    const mesh = meshRef.current;
    if (!mesh) return;
    mesh.rotation.y += delta * (0.18 + burst * 2);
    mesh.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.3 + state.pointer.y * 0.25;
    mesh.rotation.z += delta * 0.04;
    mesh.scale.setScalar(1 + burst * burst * 0.16);
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[0.78, 0.26, 140, 20, 2, 3]} />
      <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} />
    </mesh>
  );
}

/* ------------------------ glass lattice shell ---------------------------- */

const LAT_DARK = new THREE.Color('#3ef0ff');
const LAT_LIGHT = new THREE.Color('#0b6f8a');

function Lattice({ target }: { target: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  const tick = useThemeMix(target);

  useFrame((_, delta) => {
    const { m, burst } = tick(delta);
    if (ref.current) {
      ref.current.rotation.y -= delta * (0.06 + burst);
      ref.current.rotation.x += delta * 0.02;
    }
    if (matRef.current) {
      matRef.current.color.copy(LAT_DARK).lerp(LAT_LIGHT, m);
      matRef.current.opacity = lerp(0.2, 0.22, m) + burst * 0.3;
    }
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[2.35, 1]} />
      <meshBasicMaterial ref={matRef} wireframe transparent opacity={0.2} depthWrite={false} />
    </mesh>
  );
}

/* ----------------------- audience / reach network ------------------------- */

const NODE_DARK = new THREE.Color('#bffaff');
const NODE_LIGHT = new THREE.Color('#0b6f8a');
const LINK_DARK = new THREE.Color('#3ef0ff');
const LINK_LIGHT = new THREE.Color('#4a5fa8');

function makeDotTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d')!;
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 30);
  grd.addColorStop(0, 'rgba(255,255,255,1)');
  grd.addColorStop(0.35, 'rgba(255,255,255,0.9)');
  grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

function Network({ target }: { target: number }) {
  const group = useRef<THREE.Group>(null);
  const nodeMat = useRef<THREE.PointsMaterial>(null);
  const linkMat = useRef<THREE.LineBasicMaterial>(null);
  const tick = useThemeMix(target);

  const { nodePos, linkPos, texture } = useMemo(() => {
    const COUNT = 56;
    const RADIUS = 3.05;
    const pts: THREE.Vector3[] = [];
    // fibonacci sphere → evenly spread nodes, then jitter radius a little
    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = Math.PI * (3 - Math.sqrt(5)) * i;
      const rad = RADIUS * (0.92 + Math.random() * 0.16);
      pts.push(new THREE.Vector3(Math.cos(th) * r * rad, y * rad, Math.sin(th) * r * rad));
    }
    const nodeArr = new Float32Array(COUNT * 3);
    pts.forEach((p, i) => p.toArray(nodeArr, i * 3));

    const links: number[] = [];
    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        if (pts[i].distanceTo(pts[j]) < 1.25) links.push(...pts[i].toArray(), ...pts[j].toArray());
      }
    }
    return { nodePos: nodeArr, linkPos: new Float32Array(links), texture: makeDotTexture() };
  }, []);

  useFrame((state, delta) => {
    const { m, burst } = tick(delta);
    if (group.current) {
      group.current.rotation.y += delta * (0.05 + burst);
      group.current.rotation.x = lerp(group.current.rotation.x, -state.pointer.y * 0.35, 0.05);
      group.current.rotation.z = lerp(group.current.rotation.z, state.pointer.x * 0.2, 0.05);
      group.current.scale.setScalar(1 + burst * 0.05);
    }
    if (nodeMat.current) {
      nodeMat.current.color.copy(NODE_DARK).lerp(NODE_LIGHT, m);
      nodeMat.current.size = lerp(0.2, 0.17, m);
    }
    if (linkMat.current) {
      linkMat.current.color.copy(LINK_DARK).lerp(LINK_LIGHT, m);
      linkMat.current.opacity = lerp(0.3, 0.32, m) + burst * 0.3;
    }
  });

  return (
    <group ref={group}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linkPos, 3]} />
        </bufferGeometry>
        <lineBasicMaterial ref={linkMat} transparent opacity={0.3} depthWrite={false} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePos, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={nodeMat}
          map={texture}
          size={0.2}
          sizeAttenuation
          transparent
          alphaTest={0.05}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

/* ------------------- orbit ring with travelling data packet ----------------- */

const RING_DARK = new THREE.Color('#ff2e88');
const RING_LIGHT = new THREE.Color('#d61b72');
const PACKET_DARK = new THREE.Color('#ffd36b');
const PACKET_LIGHT = new THREE.Color('#e08a00');

function OrbitPacket({ target }: { target: number }) {
  const tilt = useRef<THREE.Group>(null);
  const packet = useRef<THREE.Mesh>(null);
  const ringMat = useRef<THREE.MeshBasicMaterial>(null);
  const packetMat = useRef<THREE.MeshBasicMaterial>(null);
  const tick = useThemeMix(target);
  const RADIUS = 3.5;

  useFrame((state, delta) => {
    const { m, burst } = tick(delta);
    const t = state.clock.elapsedTime;
    if (tilt.current) tilt.current.rotation.z += delta * (0.03 + burst * 0.5);
    if (packet.current) {
      const a = t * 0.5 + burst;
      packet.current.position.set(Math.cos(a) * RADIUS, Math.sin(a) * RADIUS, 0);
      packet.current.scale.setScalar(1 + burst * 0.3);
    }
    if (ringMat.current) {
      ringMat.current.color.copy(RING_DARK).lerp(RING_LIGHT, m);
      ringMat.current.opacity = lerp(0.55, 0.5, m);
    }
    if (packetMat.current) packetMat.current.color.copy(PACKET_DARK).lerp(PACKET_LIGHT, m);
  });

  return (
    <group ref={tilt} rotation={[Math.PI / 2.6, 0.35, 0]}>
      <mesh>
        <torusGeometry args={[RADIUS, 0.012, 8, 100]} />
        <meshBasicMaterial ref={ringMat} transparent opacity={0.55} />
      </mesh>
      <mesh ref={packet}>
        <sphereGeometry args={[0.1, 14, 14]} />
        <meshBasicMaterial ref={packetMat} color="#ffd36b" />
      </mesh>
    </group>
  );
}

/* ------------------ frame limiter (≈30 fps, light on CPU/GPU) ------------------ */

function FrameLimiter({ active }: { active: boolean }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => {
      if (!document.hidden) invalidate();
    }, 1000 / 30);
    return () => window.clearInterval(id);
  }, [active, invalidate]);
  return null;
}

/* --------------------------------- shell ---------------------------------- */

export const LiquidHeroBlob: React.FC = () => {
  // Light theme only: 1 = pearl / daylight palette.
  const target = 1;
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  // Stop rendering the 3D scene while it is scrolled out of view (or the tab is hidden).
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full h-[420px] sm:h-[500px] lg:h-[600px] flex items-center justify-center overflow-hidden">
      {/* Soft static halo behind the canvas */}
      <div
        className="absolute inset-[8%] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 60% 35%, rgba(255,190,90,0.30), rgba(120,170,255,0.22) 50%, transparent 72%)',
        }}
      />

      <Canvas
        frameloop="demand"
        camera={{ position: [0, 0, 9.2], fov: 45 }}
        dpr={1}
        gl={{ antialias: false, alpha: true, powerPreference: 'default' }}
      >
        <FrameLimiter active={visible} />
        <CoreKnot target={target} />
        <Lattice target={target} />
        <Network target={target} />
        <OrbitPacket target={target} />
      </Canvas>
    </div>
  );
};