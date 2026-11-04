import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

interface ProcessPipelineSceneProps {
  onNavigate: (route: string) => void;
}

export const ProcessPipelineScene: React.FC<ProcessPipelineSceneProps> = ({ onNavigate }) => {
  const pipelineRef = useRef<THREE.Group>(null);

  const stages = [
    { num: '01', title: 'Discovery & Requirement', desc: 'Stakeholder interviews, legacy audit & IA', color: '#DC2626', x: -3.2 },
    { num: '02', title: 'Architecture Blueprint', desc: 'Figma prototypes, ER models & schemas', color: '#0284C7', x: -1.6 },
    { num: '03', title: 'Agile Engineering', desc: 'TypeScript, clean microservices & CI/CD', color: '#7C3AED', x: 0 },
    { num: '04', title: 'Rigorous QA & Security', desc: 'Cross-device, OWASP Top-10 & speed tuning', color: '#10B981', x: 1.6 },
    { num: '05', title: 'Deployment & SLA', desc: 'Zero-downtime cutover, SEO indexing & support', color: '#F59E0B', x: 3.2 },
  ];

  useFrame((state) => {
    if (pipelineRef.current) {
      const t = state.clock.getElapsedTime();
      pipelineRef.current.children.forEach((child, i) => {
        child.position.y = Math.sin(t * 1.5 + i * 0.7) * 0.1;
      });
    }
  });

  return (
    <group position={[-26, 26, 0]}>
      {/* Scene Header */}
      <Text
        position={[0, 2.6, 0]}
        fontSize={0.34}
        color="#0F172A"
        anchorX="center"
        font="/fonts/Sora-Bold.ttf"
      >
        5-STAGE ENGINEERING PATHWAY
      </Text>
      <Text
        position={[0, 2.2, 0]}
        fontSize={0.13}
        color="#DC2626"
        anchorX="center"
        letterSpacing={0.08}
      >
        Systematic Delivery Framework Refined Over 20 Years
      </Text>

      {/* Central Pipeline Connecting Beam */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 7.2, 16]} />
        <meshStandardMaterial color="#CBD5E1" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* 5 Glass Gate Arches */}
      <group ref={pipelineRef} position={[0, 0, 0]}>
        {stages.map((stage) => (
          <group key={stage.num} position={[stage.x, 0, 0]} onClick={() => onNavigate('process')}>
            {/* Gate Arch */}
            <mesh castShadow>
              <torusGeometry args={[0.42, 0.05, 16, 32, Math.PI]} />
              <meshStandardMaterial color={stage.color} metalness={0.3} roughness={0.2} />
            </mesh>
            <mesh position={[0, -0.4, 0]}>
              <boxGeometry args={[0.9, 0.8, 0.06]} />
              <meshPhysicalMaterial
                color="#FFFFFF"
                transmission={0.8}
                roughness={0.2}
                transparent
                opacity={0.92}
              />
            </mesh>
            <Text
              position={[0, 0.15, 0.04]}
              fontSize={0.14}
              color={stage.color}
              anchorX="center"
              font="/fonts/Sora-Bold.ttf"
            >
              {stage.num}
            </Text>
            <Text
              position={[0, -0.15, 0.04]}
              fontSize={0.075}
              color="#0F172A"
              maxWidth={0.85}
              textAlign="center"
              anchorX="center"
              font="/fonts/Sora-Bold.ttf"
            >
              {stage.title}
            </Text>
            <Text
              position={[0, -0.48, 0.04]}
              fontSize={0.06}
              color="#64748B"
              maxWidth={0.85}
              textAlign="center"
              anchorX="center"
            >
              {stage.desc}
            </Text>
          </group>
        ))}
      </group>
    </group>
  );
};
