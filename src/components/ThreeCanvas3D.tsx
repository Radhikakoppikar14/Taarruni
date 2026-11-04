import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

// Inner Geometric Core with physical translucent materials & soft edge wireframe
function GeometricCore() {
  const meshRef = useRef<THREE.Group>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Gentle continuous rotation
      meshRef.current.rotation.y += delta * 0.25;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;

      // Mouse influence
      const targetX = state.pointer.x * 0.35;
      const targetY = state.pointer.y * 0.25;
      meshRef.current.rotation.y += (targetX - meshRef.current.rotation.y * 0.1) * 0.05;
      meshRef.current.rotation.x += (-targetY - meshRef.current.rotation.x * 0.1) * 0.05;
    }

    if (ringRef1.current) {
      ringRef1.current.rotation.z += delta * 0.35;
      ringRef1.current.rotation.x += delta * 0.15;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.z -= delta * 0.4;
      ringRef2.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Central Solid Icosahedron with Crystal Crimson / Glass Material */}
      <mesh castShadow receiveShadow>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshPhysicalMaterial
          color="#DC2626"
          roughness={0.15}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={0.65}
          ior={1.45}
          thickness={1.2}
          reflectivity={0.9}
        />
      </mesh>

      {/* Exterior Wireframe Cage */}
      <mesh>
        <icosahedronGeometry args={[1.42, 1]} />
        <meshStandardMaterial
          color="#1E293B"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Floating Orbit Ring 1 - Web & Multimedia (Cyan Glow) */}
      <mesh ref={ringRef1} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.0, 0.02, 16, 64]} />
        <meshStandardMaterial
          color="#0284C7"
          emissive="#0284C7"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Floating Orbit Ring 2 - Pan-India Signage & IT (Crimson & Amber) */}
      <mesh ref={ringRef2} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[2.3, 0.022, 16, 64]} />
        <meshStandardMaterial
          color="#E11D48"
          emissive="#E11D48"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* 5 Orbiting Satellite Spheres representing 5 core disciplines */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i * 2 * Math.PI) / 5;
        const radius = 2.0;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const colors = ['#DC2626', '#0284C7', '#059669', '#D97706', '#7C3AED'];
        return (
          <mesh key={i} position={[x, Math.sin(angle * 2) * 0.4, z]}>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshStandardMaterial
              color={colors[i]}
              emissive={colors[i]}
              emissiveIntensity={0.8}
              roughness={0.1}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// Subtle Particle Constellation in Background
function ParticleConstellation() {
  const count = 120;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
      pointsRef.current.rotation.x += delta * 0.015;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#94A3B8"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

interface ThreeCanvas3DProps {
  className?: string;
  enableControls?: boolean;
}

export const ThreeCanvas3D: React.FC<ThreeCanvas3DProps> = ({
  className = '',
  enableControls = true,
}) => {
  return (
    <div className={`relative w-full h-full min-h-[360px] sm:min-h-[460px] ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        dpr={typeof window !== 'undefined' ? Math.min(2, window.devicePixelRatio) : 1}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[6, 8, 6]} intensity={1.5} color="#FFFFFF" />
          <directionalLight position={[-6, -4, -4]} intensity={0.8} color="#E0F2FE" />
          <pointLight position={[0, 4, 2]} intensity={0.9} color="#FFE4E6" />
          <pointLight position={[3, -3, 3]} intensity={0.7} color="#BAE6FD" />

          <Float speed={1.6} rotationIntensity={0.2} floatIntensity={0.4}>
            <GeometricCore />
          </Float>

          <ParticleConstellation />

          {enableControls && (
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.6}
              maxPolarAngle={Math.PI / 1.7}
              minPolarAngle={Math.PI / 2.5}
            />
          )}
        </Suspense>
      </Canvas>

      {/* Subtle Hint */}
      <div className="absolute bottom-3 right-4 pointer-events-none select-none text-[11px] font-medium text-slate-400 bg-white/70 backdrop-blur-xs px-2.5 py-1 rounded-md border border-slate-200/60 shadow-2xs">
        Interactive 3D · Drag to rotate
      </div>
    </div>
  );
};
