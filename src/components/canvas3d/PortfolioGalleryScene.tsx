import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { PORTFOLIO_ASSETS } from '../../constants/assets';

interface PortfolioGallerySceneProps {
  onNavigate: (route: string) => void;
}

export const PortfolioGalleryScene: React.FC<PortfolioGallerySceneProps> = ({ onNavigate }) => {
  const galleryRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (galleryRef.current) {
      galleryRef.current.rotation.y += delta * 0.04;
    }
  });

  return (
    <group position={[-26, 0, 0]}>
      {/* Scene Header */}
      <Text
        position={[0, 2.6, 0]}
        fontSize={0.34}
        color="#0F172A"
        anchorX="center"
        font="/fonts/Sora-Bold.ttf"
      >
        3D GALLERY PAVILION
      </Text>
      <Text
        position={[0, 2.2, 0]}
        fontSize={0.13}
        color="#DC2626"
        anchorX="center"
        letterSpacing={0.08}
      >
        9 Real Production Deployments & Architectural Case Studies
      </Text>

      {/* Hexagonal / Circular Gallery Ring of 9 Picture Frames */}
      <group ref={galleryRef} position={[0, 0, 0]}>
        {PORTFOLIO_ASSETS.map((project, idx) => {
          const angle = (idx / PORTFOLIO_ASSETS.length) * Math.PI * 2;
          const radius = 4.2;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;

          return (
            <group
              key={project.id}
              position={[x, 0, z]}
              rotation={[0, angle + Math.PI, 0]}
              onClick={() => onNavigate('portfolio')}
            >
              {/* Outer Metallic Picture Frame */}
              <mesh castShadow>
                <boxGeometry args={[1.7, 1.15, 0.06]} />
                <meshStandardMaterial color="#0F172A" roughness={0.3} metalness={0.8} />
              </mesh>
              {/* Illuminated Frame Mat */}
              <mesh position={[0, 0, 0.035]}>
                <planeGeometry args={[1.62, 1.07]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.1} />
              </mesh>
              {/* Title & Category text overlay */}
              <Text
                position={[0, 0.2, 0.045]}
                fontSize={0.095}
                color="#0F172A"
                maxWidth={1.5}
                textAlign="center"
                anchorX="center"
                font="/fonts/Sora-Bold.ttf"
              >
                {project.title}
              </Text>
              <Text
                position={[0, -0.05, 0.045]}
                fontSize={0.07}
                color="#DC2626"
                anchorX="center"
              >
                {project.category}
              </Text>
              <Text
                position={[0, -0.3, 0.045]}
                fontSize={0.06}
                color="#64748B"
                maxWidth={1.5}
                textAlign="center"
                anchorX="center"
              >
                Click to Inspect Architecture Details →
              </Text>
            </group>
          );
        })}
      </group>
    </group>
  );
};
