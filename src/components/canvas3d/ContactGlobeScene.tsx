import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

interface ContactGlobeSceneProps {
  onNavigate: (route: string) => void;
}

export const ContactGlobeScene: React.FC<ContactGlobeSceneProps> = ({ onNavigate }) => {
  const globeRef = useRef<THREE.Group>(null);
  const arcRef = useRef<THREE.Line>(null);

  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group position={[26, -26, 0]}>
      {/* Scene Header */}
      <Text
        position={[0, 2.6, 0]}
        fontSize={0.34}
        color="#0F172A"
        anchorX="center"
        font="/fonts/Sora-Bold.ttf"
      >
        GLOBAL TELEPORT HUB
      </Text>
      <Text
        position={[0, 2.2, 0]}
        fontSize={0.13}
        color="#DC2626"
        anchorX="center"
        letterSpacing={0.08}
      >
        Headquarters in Bangalore · International Operations in California
      </Text>

      {/* 3D Wireframe Earth Globe with Beacons */}
      <group position={[0, 0, 0]}>
        <group ref={globeRef}>
          {/* Wireframe Outer Sphere */}
          <mesh>
            <sphereGeometry args={[1.5, 32, 32]} />
            <meshStandardMaterial color="#38BDF8" wireframe transparent opacity={0.35} />
          </mesh>
          {/* Inner Translucent Sphere */}
          <mesh>
            <sphereGeometry args={[1.44, 32, 32]} />
            <meshPhysicalMaterial
              color="#0F172A"
              transmission={0.5}
              roughness={0.3}
              transparent
              opacity={0.4}
            />
          </mesh>

          {/* Bangalore Beacon (Latitude ~12.9 N, Longitude ~77.5 E) */}
          <group position={[0.9, 0.4, 1.1]}>
            <mesh>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshBasicMaterial color="#DC2626" />
            </mesh>
            <mesh>
              <ringGeometry args={[0.1, 0.16, 16]} />
              <meshBasicMaterial color="#DC2626" transparent opacity={0.6} side={THREE.DoubleSide} />
            </mesh>
          </group>

          {/* California Beacon (Latitude ~37.5 N, Longitude ~-122 W) */}
          <group position={[-1.0, 0.9, -0.7]}>
            <mesh>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshBasicMaterial color="#0284C7" />
            </mesh>
            <mesh>
              <ringGeometry args={[0.1, 0.16, 16]} />
              <meshBasicMaterial color="#0284C7" transparent opacity={0.6} side={THREE.DoubleSide} />
            </mesh>
          </group>
        </group>
      </group>

      {/* Floating Bangalore Office Card */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <group position={[-2.6, -0.6, 0.5]} onClick={() => onNavigate('contact')}>
          <mesh castShadow>
            <boxGeometry args={[2.4, 1.4, 0.08]} />
            <meshPhysicalMaterial
              color="#FFFFFF"
              transmission={0.8}
              roughness={0.2}
              clearcoat={1}
              transparent
              opacity={0.95}
            />
          </mesh>
          <Text position={[0, 0.45, 0.05]} fontSize={0.12} color="#DC2626" anchorX="center" font="/fonts/Sora-Bold.ttf">
            HEAD OFFICE (INDIA)
          </Text>
          <Text
            position={[0, 0.08, 0.05]}
            fontSize={0.08}
            color="#0F172A"
            anchorX="center"
            textAlign="center"
            maxWidth={2.2}
            lineHeight={1.3}
          >
            "PRAVARA", No. 67/1-1, H.B. Samaja Rd, Basavanagudi, Bangalore – 560004
          </Text>
          <Text position={[0, -0.28, 0.05]} fontSize={0.075} color="#475569" anchorX="center">
            Ph: +91 80 26561646 / +91 98804 77344
          </Text>
          <Text position={[0, -0.48, 0.05]} fontSize={0.08} color="#DC2626" anchorX="center">
            info@taarruni.com
          </Text>
        </group>
      </Float>

      {/* Floating USA Office Card */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <group position={[2.6, -0.6, 0.5]} onClick={() => onNavigate('contact')}>
          <mesh castShadow>
            <boxGeometry args={[2.4, 1.4, 0.08]} />
            <meshPhysicalMaterial
              color="#FFFFFF"
              transmission={0.8}
              roughness={0.2}
              clearcoat={1}
              transparent
              opacity={0.95}
            />
          </mesh>
          <Text position={[0, 0.45, 0.05]} fontSize={0.12} color="#0284C7" anchorX="center" font="/fonts/Sora-Bold.ttf">
            USA OFFICE
          </Text>
          <Text
            position={[0, 0.08, 0.05]}
            fontSize={0.08}
            color="#0F172A"
            anchorX="center"
            textAlign="center"
            maxWidth={2.2}
            lineHeight={1.3}
          >
            Taarruni c/o Izen AI Inc., 4556 Fernandez St, Union City, CA 94587
          </Text>
          <Text position={[0, -0.28, 0.05]} fontSize={0.075} color="#475569" anchorX="center">
            Cross-Pacific AI & Offshore Architecture
          </Text>
          <Text position={[0, -0.48, 0.05]} fontSize={0.08} color="#0284C7" anchorX="center">
            usa@taarruni.com
          </Text>
        </group>
      </Float>
    </group>
  );
};
