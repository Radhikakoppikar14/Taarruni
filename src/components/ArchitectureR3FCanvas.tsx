import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ArchitectureR3FCanvasProps {
  activeLayer: number;
  onSelectLayer: (id: number) => void;
}

interface LayerSlabProps {
  id: number;
  yPos: number;
  title: string;
  badge: string;
  color: string;
  activeColor: string;
  isActive: boolean;
  onSelect: (id: number) => void;
}

function LayerSlab({
  id,
  yPos,
  title,
  badge,
  color,
  activeColor,
  isActive,
  onSelect,
}: LayerSlabProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    // Slight idle breathing
    const idleOffset = Math.sin(state.clock.elapsedTime * 2 + id) * 0.04;
    const targetY = yPos + idleOffset + (isActive ? 0.25 : 0);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.1);
  });

  return (
    <group>
      {/* 3D Slab */}
      <mesh
        ref={meshRef}
        position={[0, yPos, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[5.2, 0.28, 3.4]} />
        <meshStandardMaterial
          color={isActive ? activeColor : hovered ? '#cbd5e1' : '#f1f5f9'}
          emissive={isActive ? activeColor : '#000000'}
          emissiveIntensity={isActive ? 0.35 : 0}
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>

      {/* Wireframe Outline around Slab */}
      <mesh position={[0, yPos + (isActive ? 0.25 : 0), 0]}>
        <boxGeometry args={[5.24, 0.3, 3.44]} />
        <meshBasicMaterial
          color={isActive ? activeColor : hovered ? '#94a3b8' : '#e2e8f0'}
          wireframe
          transparent
          opacity={isActive ? 0.9 : 0.4}
        />
      </mesh>

      {/* Corner Tech Nodes on the Slab */}
      {[
        [-2.4, yPos + 0.2, -1.5],
        [2.4, yPos + 0.2, -1.5],
        [-2.4, yPos + 0.2, 1.5],
        [2.4, yPos + 0.2, 1.5],
      ].map((pos, idx) => (
        <mesh key={idx} position={[pos[0], pos[1] + (isActive ? 0.25 : 0), pos[2]]}>
          <sphereGeometry args={[0.09, 12, 12]} />
          <meshStandardMaterial
            color={isActive ? activeColor : '#64748b'}
            emissive={isActive ? activeColor : '#000000'}
            emissiveIntensity={isActive ? 0.8 : 0}
          />
        </mesh>
      ))}
    </group>
  );
}

// Tech Tree Connecting Conduits & Flowing Data Packets
function TechConduitsAndData() {
  const packet1Ref = useRef<THREE.Mesh>(null);
  const packet2Ref = useRef<THREE.Mesh>(null);
  const packet3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    state.invalidate();
    const time = state.clock.elapsedTime;
    if (packet1Ref.current) {
      packet1Ref.current.position.y = -1.5 + ((time * 1.8) % 3.4);
    }
    if (packet2Ref.current) {
      packet2Ref.current.position.y = 1.9 - (((time + 0.8) * 1.5) % 3.4);
    }
    if (packet3Ref.current) {
      packet3Ref.current.position.y = -1.5 + (((time + 1.6) * 2.0) % 3.4);
    }
  });

  return (
    <group>
      {/* 4 Vertical Conduits connecting the corners */}
      <mesh position={[-2.4, 0.2, -1.5]}>
        <cylinderGeometry args={[0.025, 0.025, 3.8, 8]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
      </mesh>
      <mesh position={[2.4, 0.2, -1.5]}>
        <cylinderGeometry args={[0.025, 0.025, 3.8, 8]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
      </mesh>
      <mesh position={[-2.4, 0.2, 1.5]}>
        <cylinderGeometry args={[0.025, 0.025, 3.8, 8]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
      </mesh>
      <mesh position={[2.4, 0.2, 1.5]}>
        <cylinderGeometry args={[0.025, 0.025, 3.8, 8]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
      </mesh>

      {/* Flowing Data Packets */}
      <mesh ref={packet1Ref} position={[-2.4, 0, -1.5]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshBasicMaterial color="#e11d48" />
      </mesh>
      <mesh ref={packet2Ref} position={[2.4, 0, 1.5]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshBasicMaterial color="#0284c7" />
      </mesh>
      <mesh ref={packet3Ref} position={[0, 0, 0]}>
        <octahedronGeometry args={[0.16, 0]} />
        <meshBasicMaterial color="#10b981" />
      </mesh>
    </group>
  );
}

// Scene Root that tracks mouse pointer and provides smooth rotation
function SceneContent({ activeLayer, onSelectLayer }: ArchitectureR3FCanvasProps) {
  const groupRef = useRef<THREE.Group>(null);

  const layerDefinitions = [
    {
      id: 0,
      yPos: 1.4,
      title: '01. Client Experience & Edge Layer',
      badge: 'Edge & Frontend',
      color: '#e0f2fe',
      activeColor: '#0284c7',
    },
    {
      id: 1,
      yPos: 0.5,
      title: '02. Enterprise AI & Agentic Orchestration',
      badge: 'Cognitive AI',
      color: '#dbeafe',
      activeColor: '#2563eb',
    },
    {
      id: 2,
      yPos: -0.4,
      title: '03. Microservices & Event Stream Core',
      badge: 'Distributed Core',
      color: '#e0e7ff',
      activeColor: '#6366f1',
    },
    {
      id: 3,
      yPos: -1.3,
      title: '04. Multi-Tenant Persistence & Security Vault',
      badge: 'Data & Security',
      color: '#d1fae5',
      activeColor: '#10b981',
    },
  ];

  useFrame((state) => {
    state.invalidate();
    if (groupRef.current) {
      // Base isometric tilt
      const targetRotX = 0.55 - state.pointer.y * 0.35;
      const targetRotY = -0.65 + state.pointer.x * 0.45;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {layerDefinitions.map((layer) => (
        <LayerSlab
          key={layer.id}
          id={layer.id}
          yPos={layer.yPos}
          title={layer.title}
          badge={layer.badge}
          color={layer.color}
          activeColor={layer.activeColor}
          isActive={activeLayer === layer.id}
          onSelect={onSelectLayer}
        />
      ))}
      <TechConduitsAndData />
    </group>
  );
}

export const ArchitectureR3FCanvas: React.FC<ArchitectureR3FCanvasProps> = ({
  activeLayer,
  onSelectLayer,
}) => {
  return (
    <div className="relative w-full h-[400px] sm:h-[480px] rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 select-none shadow-2xl border border-slate-800">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-sky-500/10 rounded-full blur-[130px] pointer-events-none" />

      <Canvas
        camera={{ position: [0, 1.2, 7.8], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        dpr={Math.min(2, window.devicePixelRatio)}
        frameloop="demand"
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={1.4} />
        <directionalLight position={[10, 15, 10]} intensity={2.5} color="#ffffff" />
        <directionalLight position={[-10, 10, -5]} intensity={1.8} color="#38bdf8" />
        <directionalLight position={[0, -10, 5]} intensity={0.9} color="#e11d48" />

        <SceneContent activeLayer={activeLayer} onSelectLayer={onSelectLayer} />
      </Canvas>

      {/* Floating 3D R3F UI Controls */}
      <div className="absolute top-5 left-5 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-mono text-sky-300">
        <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
        <span>R3F 3D Exploded Stack</span>
      </div>

      <div className="absolute top-5 right-5 pointer-events-none text-xs font-mono text-slate-400 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
        Move mouse to tilt · Click slab to inspect
      </div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 pointer-events-none text-[11px] font-mono text-slate-300 bg-slate-800/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-center whitespace-nowrap">
        Layer {activeLayer + 1} of 4 Active in 3D Space
      </div>
    </div>
  );
};
