import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

interface Services3DSceneProps {
  onNavigate: (route: string) => void;
}

export const Services3DScene: React.FC<Services3DSceneProps> = ({ onNavigate }) => {
  const barsRef = useRef<THREE.Group>(null);
  const blocksRef = useRef<THREE.Group>(null);
  const buildingRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (barsRef.current) {
      barsRef.current.children.forEach((child, i) => {
        child.scale.y = 0.5 + Math.sin(t * 2 + i * 0.8) * 0.4 + 0.5;
      });
    }
    if (blocksRef.current) {
      blocksRef.current.rotation.y = t * 0.3;
    }
    if (buildingRef.current) {
      buildingRef.current.rotation.y = -t * 0.15;
    }
  });

  return (
    <group position={[52, 0, 0]}>
      {/* Scene Header */}
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.34}
        color="#0F172A"
        anchorX="center"
        font="/fonts/Sora-Bold.ttf"
      >
        SOLUTIONS ARCHITECTURE HUB
      </Text>
      <Text
        position={[0, 2.1, 0]}
        fontSize={0.13}
        color="#DC2626"
        anchorX="center"
        letterSpacing={0.08}
      >
        7 Specialized Service Domains · From Web & AI to Pan-India Signage
      </Text>

      {/* 1. DIGITAL MARKETING: Rising Animated 3D Analytics Bars */}
      <group position={[-3.2, 0.4, 0]} onClick={() => onNavigate('services/digital-marketing')}>
        <Text position={[0, 1.2, 0]} fontSize={0.14} color="#0F172A" anchorX="center" font="/fonts/Sora-Bold.ttf">
          SEO / SEM Analytics
        </Text>
        <group ref={barsRef} position={[0, -0.4, 0]}>
          {[-0.6, -0.2, 0.2, 0.6].map((x, idx) => (
            <mesh key={idx} position={[x, 0, 0]} castShadow>
              <boxGeometry args={[0.22, 1.2, 0.22]} />
              <meshStandardMaterial
                color={idx === 3 ? '#DC2626' : idx === 2 ? '#38BDF8' : '#818CF8'}
                roughness={0.2}
              />
            </mesh>
          ))}
        </group>
        <mesh position={[0, -0.6, 0]}>
          <boxGeometry args={[1.8, 0.08, 0.6]} />
          <meshStandardMaterial color="#E2E8F0" />
        </mesh>
      </group>

      {/* 2. CMS DEVELOPMENT: Modular Snapping 3D Blocks */}
      <group position={[-1.1, 0.4, 0]} onClick={() => onNavigate('services/cms-development')}>
        <Text position={[0, 1.2, 0]} fontSize={0.14} color="#0F172A" anchorX="center" font="/fonts/Sora-Bold.ttf">
          CMS Modular Blocks
        </Text>
        <group ref={blocksRef} position={[0, 0, 0]}>
          <mesh position={[-0.25, 0.25, -0.25]}>
            <boxGeometry args={[0.42, 0.42, 0.42]} />
            <meshPhysicalMaterial color="#C084FC" roughness={0.2} transmission={0.6} />
          </mesh>
          <mesh position={[0.25, 0.25, 0.25]}>
            <boxGeometry args={[0.42, 0.42, 0.42]} />
            <meshPhysicalMaterial color="#38BDF8" roughness={0.2} transmission={0.6} />
          </mesh>
          <mesh position={[-0.25, -0.25, 0.25]}>
            <boxGeometry args={[0.42, 0.42, 0.42]} />
            <meshPhysicalMaterial color="#F43F5E" roughness={0.2} transmission={0.6} />
          </mesh>
          <mesh position={[0.25, -0.25, -0.25]}>
            <boxGeometry args={[0.42, 0.42, 0.42]} />
            <meshPhysicalMaterial color="#10B981" roughness={0.2} transmission={0.6} />
          </mesh>
        </group>
      </group>

      {/* 3. E-COMMERCE INFRASTRUCTURE: 3D Shopping Cart & Cubes */}
      <group position={[1.1, 0.4, 0]} onClick={() => onNavigate('services/ecommerce-development')}>
        <Text position={[0, 1.2, 0]} fontSize={0.14} color="#0F172A" anchorX="center" font="/fonts/Sora-Bold.ttf">
          E-Commerce Engines
        </Text>
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
          <group position={[0, 0, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.7, 0.4, 0.5]} />
              <meshStandardMaterial color="#FEF3C7" wireframe />
            </mesh>
            <mesh position={[0, 0.2, 0]}>
              <boxGeometry args={[0.28, 0.28, 0.28]} />
              <meshStandardMaterial color="#F59E0B" roughness={0.3} />
            </mesh>
            <mesh position={[-0.25, -0.26, 0.25]}>
              <sphereGeometry args={[0.07, 16, 16]} />
              <meshStandardMaterial color="#0F172A" />
            </mesh>
            <mesh position={[0.25, -0.26, 0.25]}>
              <sphereGeometry args={[0.07, 16, 16]} />
              <meshStandardMaterial color="#0F172A" />
            </mesh>
          </group>
        </Float>
      </group>

      {/* 4. ARCHITECTURAL & CIVIL 2D/3D: Wireframe Building */}
      <group position={[3.2, 0.4, 0]} onClick={() => onNavigate('services/architectural-civil')}>
        <Text position={[0, 1.2, 0]} fontSize={0.14} color="#0F172A" anchorX="center" font="/fonts/Sora-Bold.ttf">
          2D/3D Architecture
        </Text>
        <group ref={buildingRef} position={[0, -0.2, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.7, 1.4, 0.7]} />
            <meshStandardMaterial color="#0284C7" wireframe />
          </mesh>
          <mesh position={[0, 0.8, 0]}>
            <coneGeometry args={[0.5, 0.5, 4]} />
            <meshStandardMaterial color="#38BDF8" wireframe />
          </mesh>
        </group>
      </group>

      {/* 5. ALL INDIA BRANDING: Neon Billboard on Bottom Plane */}
      <group position={[0, -1.8, 0]} onClick={() => onNavigate('services/signage-branding')}>
        <mesh castShadow>
          <boxGeometry args={[3.8, 1.2, 0.08]} />
          <meshStandardMaterial color="#0F172A" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[3.7, 1.1]} />
          <meshBasicMaterial color="#38BDF8" />
        </mesh>
        <Text
          position={[0, 0.2, 0.07]}
          fontSize={0.16}
          color="#FFFFFF"
          anchorX="center"
          font="/fonts/Sora-Bold.ttf"
        >
          ALL INDIA SIGNAGE & BRANDING
        </Text>
        <Text
          position={[0, -0.16, 0.07]}
          fontSize={0.09}
          color="#FEF3C7"
          anchorX="center"
          letterSpacing={0.06}
        >
          Acrylic & SS Letter Cut · LED Glow Boards · Highway Hoardings · Retail POS
        </Text>
      </group>
    </group>
  );
};
