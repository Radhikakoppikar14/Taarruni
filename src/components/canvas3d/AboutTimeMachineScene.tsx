import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

interface AboutTimeMachineSceneProps {
  onNavigate: (route: string) => void;
}

export const AboutTimeMachineScene: React.FC<AboutTimeMachineSceneProps> = ({ onNavigate }) => {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Group>(null);

  const milestones = [
    { year: '2005', title: 'Incorporation in Bangalore', desc: 'Founded as a pioneering web & multimedia provider', color: '#DC2626', x: -3.5, y: -0.6, z: 0 },
    { year: '2008', title: '2D/3D Multimedia Expansion', desc: 'Launched architectural walkthroughs & corporate animations', color: '#0284C7', x: -2.1, y: 0.4, z: 0.3 },
    { year: '2012', title: 'Pan-India Signage Networks', desc: 'Fabricating acrylic & LED signage across all Indian metros', color: '#10B981', x: -0.7, y: -0.2, z: -0.2 },
    { year: '2016', title: 'USA Office in California', desc: 'Established Silicon Valley offshore technical presence', color: '#8B5CF6', x: 0.7, y: 0.6, z: 0.2 },
    { year: '2020', title: 'Cloud & AI Modernization', desc: 'Enterprise microservices, ERP integrations, & automated pipelines', color: '#F59E0B', x: 2.1, y: 0.0, z: -0.1 },
    { year: '2025', title: 'Two Decades of Excellence', desc: '500+ enterprise clients & continuous digital innovation', color: '#EF4444', x: 3.5, y: 0.8, z: 0.3 },
  ];

  useFrame((state, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[26, 0, 0]}>
      {/* 3D Scene Header */}
      <Text
        position={[0, 2.2, 0]}
        fontSize={0.34}
        color="#0F172A"
        anchorX="center"
        font="/fonts/Sora-Bold.ttf"
      >
        TIME MACHINE: 2005 TO TODAY
      </Text>
      <Text
        position={[0, 1.8, 0]}
        fontSize={0.13}
        color="#DC2626"
        anchorX="center"
        letterSpacing={0.08}
      >
        Two Decades of Digital Mastery & Enterprise Engineering
      </Text>

      {/* Floating 3D Curved Timeline Ribbon */}
      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.25}>
        <group position={[0, 0, 0]}>
          {/* Main Connecting Tube */}
          <mesh>
            <cylinderGeometry args={[0.04, 0.04, 7.8, 16]} />
            <meshStandardMaterial color="#E2E8F0" roughness={0.3} metalness={0.6} />
          </mesh>

          {/* Milestone Nodes */}
          {milestones.map((m, idx) => (
            <group key={m.year} position={[m.x, m.y, m.z]}>
              {/* Outer Pulsing Glow Ring */}
              <mesh>
                <ringGeometry args={[0.3, 0.36, 32]} />
                <meshBasicMaterial color={m.color} transparent opacity={0.6} side={THREE.DoubleSide} />
              </mesh>

              {/* Central Sphere */}
              <mesh castShadow>
                <sphereGeometry args={[0.22, 32, 32]} />
                <meshPhysicalMaterial
                  color={m.color}
                  roughness={0.15}
                  metalness={0.2}
                  clearcoat={1}
                />
              </mesh>

              {/* Year Label */}
              <Text
                position={[0, 0.44, 0]}
                fontSize={0.18}
                color="#0F172A"
                anchorX="center"
                font="/fonts/Sora-Bold.ttf"
              >
                {m.year}
              </Text>

              {/* Milestone Info Card */}
              <group position={[0, -0.6, 0]}>
                <mesh>
                  <boxGeometry args={[1.5, 0.7, 0.04]} />
                  <meshPhysicalMaterial
                    color="#FFFFFF"
                    transmission={0.8}
                    roughness={0.2}
                    transparent
                    opacity={0.9}
                  />
                </mesh>
                <Text
                  position={[0, 0.16, 0.03]}
                  fontSize={0.085}
                  color="#0F172A"
                  maxWidth={1.4}
                  textAlign="center"
                  anchorX="center"
                  font="/fonts/Sora-Bold.ttf"
                >
                  {m.title}
                </Text>
                <Text
                  position={[0, -0.14, 0.03]}
                  fontSize={0.065}
                  color="#64748B"
                  maxWidth={1.38}
                  textAlign="center"
                  anchorX="center"
                >
                  {m.desc}
                </Text>
              </group>
            </group>
          ))}
        </group>
      </Float>

      {/* Floating Infographic Representation */}
      <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.3}>
        <group position={[0, -2.2, 0.5]}>
          <mesh castShadow>
            <boxGeometry args={[3.2, 1.6, 0.06]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
          </mesh>
          <Text
            position={[0, 0.4, 0.04]}
            fontSize={0.13}
            color="#0F172A"
            anchorX="center"
            font="/fonts/Sora-Bold.ttf"
          >
            TDS Digital Transformation Blueprint
          </Text>
          <Text
            position={[0, 0.05, 0.04]}
            fontSize={0.09}
            color="#64748B"
            maxWidth={2.8}
            textAlign="center"
            anchorX="center"
          >
            "Taarruni presents itself as a prominent brand delivering an array of services for web designing, multimedia development (2D/3D animation), web application development, Flash & E-commerce, SEO-SEM, and print media."
          </Text>
          <Text
            position={[0, -0.45, 0.04]}
            fontSize={0.095}
            color="#DC2626"
            anchorX="center"
          >
            Read Complete Corporate Profile →
          </Text>
        </group>
      </Float>
    </group>
  );
};
