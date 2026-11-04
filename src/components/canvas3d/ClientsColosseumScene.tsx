import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { TDS_CLIENTS } from '../../constants/clientsData';

interface ClientsColosseumSceneProps {
  onNavigate: (route: string) => void;
}

export const ClientsColosseumScene: React.FC<ClientsColosseumSceneProps> = ({ onNavigate }) => {
  const colosseumRef = useRef<THREE.Group>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useFrame((state, delta) => {
    if (colosseumRef.current) {
      colosseumRef.current.rotation.y += delta * 0.04;
    }
  });

  // Arrange in 3 tiered curved rows
  const rows = [
    { count: 16, radius: 4.8, y: -0.8 },
    { count: 16, radius: 5.2, y: 0.2 },
    { count: 16, radius: 5.6, y: 1.2 },
  ];

  return (
    <group position={[0, 26, 0]}>
      {/* Scene Header */}
      <Text
        position={[0, 2.8, 0]}
        fontSize={0.34}
        color="#0F172A"
        anchorX="center"
        font="/fonts/Sora-Bold.ttf"
      >
        CURVED CLIENT COLOSSEUM
      </Text>
      <Text
        position={[0, 2.4, 0]}
        fontSize={0.13}
        color="#DC2626"
        anchorX="center"
        letterSpacing={0.08}
      >
        Enterprise Clients & National Brands Empowered by Taarruni
      </Text>

      {/* Rotating Colosseum Tier */}
      <group ref={colosseumRef} position={[0, 0, 0]}>
        {TDS_CLIENTS.map((client, idx) => {
          const rowIndex = Math.floor(idx / 16) % 3;
          const config = rows[rowIndex];
          const colIndex = idx % 16;
          const angle = (colIndex / 16) * Math.PI * 2;
          const x = Math.sin(angle) * config.radius;
          const z = Math.cos(angle) * config.radius;
          const isHovered = hoveredIndex === idx;

          return (
            <group
              key={client.id}
              position={[x, config.y, z]}
              rotation={[0, angle + Math.PI, 0]}
              scale={isHovered ? 1.18 : 1.0}
              onPointerOver={() => setHoveredIndex(idx)}
              onPointerOut={() => setHoveredIndex(null)}
              onClick={() => onNavigate('clients')}
            >
              <mesh castShadow>
                <boxGeometry args={[1.05, 0.55, 0.05]} />
                <meshStandardMaterial
                  color={isHovered ? '#FFFFFF' : '#F8FAFC'}
                  roughness={0.25}
                  metalness={0.05}
                />
              </mesh>
              <Text
                position={[0, 0.06, 0.03]}
                fontSize={0.095}
                color={client.accentColor}
                anchorX="center"
                anchorY="middle"
                font="/fonts/Sora-Bold.ttf"
              >
                {client.name.substring(0, 14)}
              </Text>
              <Text
                position={[0, -0.12, 0.03]}
                fontSize={0.058}
                color="#64748B"
                anchorX="center"
                anchorY="middle"
              >
                {client.domain.substring(0, 20)}
              </Text>
            </group>
          );
        })}
      </group>
    </group>
  );
};
