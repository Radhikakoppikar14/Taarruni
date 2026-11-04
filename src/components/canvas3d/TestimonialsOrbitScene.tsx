import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { TDS_TESTIMONIALS } from '../../constants/testimonialsData';

interface TestimonialsOrbitSceneProps {
  onNavigate: (route: string) => void;
}

export const TestimonialsOrbitScene: React.FC<TestimonialsOrbitSceneProps> = ({ onNavigate }) => {
  const orbitRef = useRef<THREE.Group>(null);
  const [activeIdx, setActiveIdx] = useState<number>(0);

  useFrame((state, delta) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group position={[26, 26, 0]}>
      {/* Scene Header */}
      <Text
        position={[0, 2.6, 0]}
        fontSize={0.34}
        color="#0F172A"
        anchorX="center"
        font="/fonts/Sora-Bold.ttf"
      >
        WORDS OF APPRECIATION
      </Text>
      <Text
        position={[0, 2.2, 0]}
        fontSize={0.13}
        color="#DC2626"
        anchorX="center"
        letterSpacing={0.08}
      >
        Authentic Client Speak & Executive Endorsements
      </Text>

      {/* Orbiting Carousel of Testimonial Pedestals */}
      <group ref={orbitRef} position={[0, 0, 0]}>
        {TDS_TESTIMONIALS.map((t, idx) => {
          const angle = (idx / TDS_TESTIMONIALS.length) * Math.PI * 2;
          const radius = 3.6;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;

          return (
            <group
              key={t.id}
              position={[x, (idx % 2 === 0 ? 0.2 : -0.2), z]}
              rotation={[0, angle + Math.PI, 0]}
              onClick={() => {
                setActiveIdx(idx);
                onNavigate('testimonials');
              }}
            >
              <mesh castShadow>
                <boxGeometry args={[1.8, 1.1, 0.06]} />
                <meshPhysicalMaterial
                  color="#FFFFFF"
                  transmission={0.82}
                  roughness={0.15}
                  clearcoat={1}
                  transparent
                  opacity={0.94}
                />
              </mesh>
              <Text
                position={[0, 0.35, 0.04]}
                fontSize={0.1}
                color="#0F172A"
                anchorX="center"
                font="/fonts/Sora-Bold.ttf"
              >
                {t.name}
              </Text>
              <Text
                position={[0, 0.18, 0.04]}
                fontSize={0.065}
                color="#DC2626"
                anchorX="center"
              >
                {t.title} · {t.company}
              </Text>
              <Text
                position={[0, -0.16, 0.04]}
                fontSize={0.062}
                color="#475569"
                maxWidth={1.65}
                textAlign="center"
                lineHeight={1.3}
                anchorX="center"
              >
                "{t.quote.substring(0, 110)}..."
              </Text>
            </group>
          );
        })}
      </group>
    </group>
  );
};
