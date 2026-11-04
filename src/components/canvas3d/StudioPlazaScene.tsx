import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html, Text } from '@react-three/drei';
import * as THREE from 'three';
import { TDS_CLIENTS } from '../../constants/clientsData';
import { TDS_TESTIMONIALS } from '../../constants/testimonialsData';
import { PORTFOLIO_ASSETS } from '../../constants/assets';

interface StudioPlazaSceneProps {
  onNavigate: (route: string) => void;
}

export const StudioPlazaScene: React.FC<StudioPlazaSceneProps> = ({ onNavigate }) => {
  const groupRef = useRef<THREE.Group>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const clientRingRef = useRef<THREE.Group>(null);
  const portfolioRingRef = useRef<THREE.Group>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useFrame((state, delta) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y += delta * 0.25;
    }
    if (clientRingRef.current) {
      clientRingRef.current.rotation.y += delta * 0.08;
    }
    if (portfolioRingRef.current) {
      portfolioRingRef.current.rotation.y -= delta * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 1. CENTRAL HERO 3D: Glass Browser Window Cluster & Extruded TDS Pedestal */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
        {/* Main Central Glass Browser */}
        <group position={[0, 0.4, 0]}>
          {/* Browser Frame */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[3.2, 2.0, 0.12]} />
            <meshPhysicalMaterial
              color="#FFFFFF"
              transmission={0.88}
              roughness={0.12}
              metalness={0.05}
              ior={1.45}
              thickness={0.4}
              clearcoat={1}
              clearcoatRoughness={0.1}
              transparent
              opacity={0.92}
            />
          </mesh>

          {/* Browser Header Bar */}
          <mesh position={[0, 0.88, 0.065]}>
            <boxGeometry args={[3.16, 0.22, 0.02]} />
            <meshStandardMaterial color="#F1F5F9" roughness={0.3} />
          </mesh>

          {/* Browser Chrome Dots */}
          <mesh position={[-1.38, 0.88, 0.08]}>
            <circleGeometry args={[0.04, 16]} />
            <meshBasicMaterial color="#EF4444" />
          </mesh>
          <mesh position={[-1.26, 0.88, 0.08]}>
            <circleGeometry args={[0.04, 16]} />
            <meshBasicMaterial color="#F59E0B" />
          </mesh>
          <mesh position={[-1.14, 0.88, 0.08]}>
            <circleGeometry args={[0.04, 16]} />
            <meshBasicMaterial color="#10B981" />
          </mesh>

          {/* 3D Central Extruded "TDS" Monogram */}
          <group position={[0, 0.08, 0.1]}>
            <Text
              position={[0, 0.12, 0]}
              fontSize={0.58}
              color="#DC2626"
              font="/fonts/Sora-Bold.ttf"
              anchorX="center"
              anchorY="middle"
            >
              TDS
            </Text>
            <Text
              position={[0, -0.32, 0]}
              fontSize={0.13}
              color="#0F172A"
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.12}
            >
              TAARRUNI DESIGN SOLUTIONS
            </Text>
            <Text
              position={[0, -0.52, 0]}
              fontSize={0.09}
              color="#64748B"
              anchorX="center"
              anchorY="middle"
            >
              Incorporated 2005 · Bangalore & California
            </Text>
          </group>

          {/* Secondary Layered Glass Window (Tilted Behind) */}
          <mesh position={[1.4, -0.5, -0.35]} rotation={[0.05, -0.2, 0.05]}>
            <boxGeometry args={[2.2, 1.4, 0.08]} />
            <meshPhysicalMaterial
              color="#E0F2FE"
              transmission={0.82}
              roughness={0.2}
              thickness={0.3}
              transparent
              opacity={0.85}
            />
          </mesh>
          <mesh position={[-1.4, -0.4, -0.3]} rotation={[-0.05, 0.18, -0.05]}>
            <boxGeometry args={[2.0, 1.3, 0.08]} />
            <meshPhysicalMaterial
              color="#EDE9FE"
              transmission={0.82}
              roughness={0.2}
              thickness={0.3}
              transparent
              opacity={0.85}
            />
          </mesh>
        </group>

        {/* Mini 3D Billboard / Hoarding with Illuminated Neon Trim */}
        <group position={[-2.4, 1.2, 0.3]} rotation={[0.08, 0.28, -0.05]}>
          {/* Billboard Pillars */}
          <mesh position={[-0.4, -0.8, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 1.0, 12]} />
            <meshStandardMaterial color="#64748B" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0.4, -0.8, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 1.0, 12]} />
            <meshStandardMaterial color="#64748B" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Billboard Board Frame */}
          <mesh>
            <boxGeometry args={[1.2, 0.7, 0.06]} />
            <meshStandardMaterial color="#0F172A" roughness={0.4} />
          </mesh>
          {/* Neon Border */}
          <mesh position={[0, 0, 0.035]}>
            <planeGeometry args={[1.14, 0.64]} />
            <meshBasicMaterial color="#38BDF8" />
          </mesh>
          <Text
            position={[0, 0.08, 0.04]}
            fontSize={0.09}
            color="#FFFFFF"
            anchorX="center"
            anchorY="middle"
          >
            PAN-INDIA
          </Text>
          <Text
            position={[0, -0.08, 0.04]}
            fontSize={0.075}
            color="#FEF3C7"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.08}
          >
            SIGNAGE & OUTDOOR
          </Text>
        </group>
      </Float>

      {/* 2. ORBITING ICONS: Web, SEO, Print, Signage */}
      <group ref={orbitRef} position={[0, 0.4, 0]}>
        {/* Node 1: Web Development (Sky Blue) */}
        <group position={[2.6, 0.4, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.22, 32, 32]} />
            <meshPhysicalMaterial
              color="#38BDF8"
              roughness={0.15}
              transmission={0.6}
              clearcoat={1}
            />
          </mesh>
          <Text position={[0, -0.34, 0]} fontSize={0.11} color="#0F172A" anchorX="center">
            Web & Apps
          </Text>
        </group>

        {/* Node 2: SEO & Digital Marketing (Rose Red) */}
        <group position={[-2.6, -0.3, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.22, 32, 32]} />
            <meshPhysicalMaterial
              color="#F43F5E"
              roughness={0.15}
              transmission={0.6}
              clearcoat={1}
            />
          </mesh>
          <Text position={[0, -0.34, 0]} fontSize={0.11} color="#0F172A" anchorX="center">
            SEO / SEM
          </Text>
        </group>

        {/* Node 3: 2D/3D Multimedia (Emerald Mint) */}
        <group position={[0, 0.2, 2.5]}>
          <mesh castShadow>
            <sphereGeometry args={[0.22, 32, 32]} />
            <meshPhysicalMaterial
              color="#10B981"
              roughness={0.15}
              transmission={0.6}
              clearcoat={1}
            />
          </mesh>
          <Text position={[0, -0.34, 0]} fontSize={0.11} color="#0F172A" anchorX="center">
            2D/3D Walkthrough
          </Text>
        </group>

        {/* Node 4: Pan-India Signage (Amber Gold) */}
        <group position={[0, -0.2, -2.5]}>
          <mesh castShadow>
            <sphereGeometry args={[0.22, 32, 32]} />
            <meshPhysicalMaterial
              color="#F59E0B"
              roughness={0.15}
              transmission={0.6}
              clearcoat={1}
            />
          </mesh>
          <Text position={[0, -0.34, 0]} fontSize={0.11} color="#0F172A" anchorX="center">
            Pan-India Signs
          </Text>
        </group>
      </group>

      {/* 3. TWO FLOATING 3D CARDS: Marketing Solutions & IT Solutions (Section Line: "is what we are known for.") */}
      <group position={[0, -1.8, 0.4]}>
        {/* Intro text */}
        <Text
          position={[0, 0.55, 0]}
          fontSize={0.16}
          color="#DC2626"
          anchorX="center"
          letterSpacing={0.06}
        >
          is what we are known for.
        </Text>

        {/* Card 1: Marketing Solutions */}
        <group
          position={[-1.6, -0.2, 0]}
          onPointerOver={() => setHoveredCard('marketing')}
          onPointerOut={() => setHoveredCard(null)}
          onClick={() => onNavigate('marketingsolutions')}
        >
          <mesh castShadow>
            <boxGeometry args={[2.5, 1.4, 0.08]} />
            <meshPhysicalMaterial
              color={hoveredCard === 'marketing' ? '#FFFFFF' : '#F8FAFC'}
              transmission={0.7}
              roughness={0.2}
              clearcoat={1}
              transparent
              opacity={0.95}
            />
          </mesh>
          <Text position={[0, 0.45, 0.05]} fontSize={0.14} color="#0F172A" anchorX="center" font="/fonts/Sora-Bold.ttf">
            Marketing Solutions
          </Text>
          <Text
            position={[0, 0.05, 0.05]}
            fontSize={0.085}
            color="#475569"
            anchorX="center"
            maxWidth={2.2}
            textAlign="center"
            lineHeight={1.3}
          >
            "These days, entrepreneurs are adopting various ways to enhance their business. Online marketing is one such way to attract..."
          </Text>
          <Text
            position={[0, -0.45, 0.05]}
            fontSize={0.09}
            color="#DC2626"
            anchorX="center"
          >
            Explore Marketing Solutions →
          </Text>
        </group>

        {/* Card 2: IT Solutions */}
        <group
          position={[1.6, -0.2, 0]}
          onPointerOver={() => setHoveredCard('it')}
          onPointerOut={() => setHoveredCard(null)}
          onClick={() => onNavigate('itsolutions')}
        >
          <mesh castShadow>
            <boxGeometry args={[2.5, 1.4, 0.08]} />
            <meshPhysicalMaterial
              color={hoveredCard === 'it' ? '#FFFFFF' : '#F8FAFC'}
              transmission={0.7}
              roughness={0.2}
              clearcoat={1}
              transparent
              opacity={0.95}
            />
          </mesh>
          <Text position={[0, 0.45, 0.05]} fontSize={0.14} color="#0F172A" anchorX="center" font="/fonts/Sora-Bold.ttf">
            IT Solutions
          </Text>
          <Text
            position={[0, 0.05, 0.05]}
            fontSize={0.085}
            color="#475569"
            anchorX="center"
            maxWidth={2.2}
            textAlign="center"
            lineHeight={1.3}
          >
            "We are team of specialized, experienced, software architect and developers working together to develop world class IT solutions.."
          </Text>
          <Text
            position={[0, -0.45, 0.05]}
            fontSize={0.09}
            color="#0284C7"
            anchorX="center"
          >
            Explore IT Solutions →
          </Text>
        </group>
      </group>

      {/* 4. CURVED 3D CLIENT TILE CAROUSEL */}
      <group ref={clientRingRef} position={[0, -3.6, 0]}>
        {TDS_CLIENTS.slice(0, 12).map((client, idx) => {
          const angle = (idx / 12) * Math.PI * 2;
          const radius = 3.6;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;

          return (
            <group
              key={client.id}
              position={[x, 0, z]}
              rotation={[0, angle + Math.PI, 0]}
              onClick={() => onNavigate('clients')}
            >
              <mesh castShadow>
                <boxGeometry args={[1.1, 0.55, 0.05]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.3} metalness={0.1} />
              </mesh>
              <Text
                position={[0, 0.05, 0.03]}
                fontSize={0.1}
                color={client.accentColor}
                anchorX="center"
                anchorY="middle"
              >
                {client.name.substring(0, 14)}
              </Text>
              <Text
                position={[0, -0.14, 0.03]}
                fontSize={0.06}
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

      {/* 5. PORTFOLIO 3D RING CAROUSEL */}
      <group ref={portfolioRingRef} position={[0, -5.4, 0]}>
        {PORTFOLIO_ASSETS.slice(0, 9).map((port, idx) => {
          const angle = (idx / 9) * Math.PI * 2;
          const radius = 4.2;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;

          return (
            <group
              key={port.id}
              position={[x, 0, z]}
              rotation={[0, angle + Math.PI, 0]}
              onClick={() => onNavigate('portfolio')}
            >
              <mesh castShadow>
                <boxGeometry args={[1.5, 0.95, 0.06]} />
                <meshStandardMaterial color="#F8FAFC" roughness={0.2} />
              </mesh>
              {/* Picture frame glow */}
              <mesh position={[0, 0, 0.035]}>
                <planeGeometry args={[1.42, 0.88]} />
                <meshStandardMaterial color="#E2E8F0" />
              </mesh>
              <Text
                position={[0, 0.12, 0.04]}
                fontSize={0.09}
                color="#0F172A"
                maxWidth={1.3}
                textAlign="center"
                anchorX="center"
              >
                {port.title}
              </Text>
              <Text
                position={[0, -0.22, 0.04]}
                fontSize={0.065}
                color="#DC2626"
                anchorX="center"
              >
                {port.category}
              </Text>
            </group>
          );
        })}
      </group>
    </group>
  );
};
