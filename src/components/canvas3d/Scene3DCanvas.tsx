import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraController } from './CameraController';
import { ParticleField } from './ParticleField';
import { StudioPlazaScene } from './StudioPlazaScene';
import { AboutTimeMachineScene } from './AboutTimeMachineScene';
import { Services3DScene } from './Services3DScene';
import { ClientsColosseumScene } from './ClientsColosseumScene';
import { PortfolioGalleryScene } from './PortfolioGalleryScene';
import { TestimonialsOrbitScene } from './TestimonialsOrbitScene';
import { ProcessPipelineScene } from './ProcessPipelineScene';
import { ContactGlobeScene } from './ContactGlobeScene';
import { SCENE_CONFIG } from '../../config/sceneConfig';

interface Scene3DCanvasProps {
  activeScene: string;
  onNavigate: (route: string) => void;
  is3DMode?: boolean;
}

export const Scene3DCanvas: React.FC<Scene3DCanvasProps> = ({
  activeScene,
  onNavigate,
  is3DMode = true,
}) => {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: [0, 1.4, 7.8], fov: SCENE_CONFIG.camera.defaultFov }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{
          pointerEvents: is3DMode ? 'auto' : 'none',
        }}
      >
        <Suspense fallback={null}>
          {/* Camera Smooth Flight Controller */}
          <CameraController activeScene={activeScene} />

          {/* Studio Lights */}
          <ambientLight intensity={0.75} />
          <directionalLight
            position={[12, 16, 12]}
            intensity={1.2}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[-12, -6, -6]} color="#E0F2FE" intensity={0.8} />
          <pointLight position={[12, -6, 6]} color="#EDE9FE" intensity={0.6} />
          <pointLight position={[0, 15, 0]} color="#FEF3C7" intensity={0.5} />

          {/* Universal Ambient Particle Field */}
          <ParticleField />

          {/* 3D World Scenes Situated in Coordinates */}
          <StudioPlazaScene onNavigate={onNavigate} />
          <AboutTimeMachineScene onNavigate={onNavigate} />
          <Services3DScene onNavigate={onNavigate} />
          <ClientsColosseumScene onNavigate={onNavigate} />
          <PortfolioGalleryScene onNavigate={onNavigate} />
          <TestimonialsOrbitScene onNavigate={onNavigate} />
          <ProcessPipelineScene onNavigate={onNavigate} />
          <ContactGlobeScene onNavigate={onNavigate} />
        </Suspense>
      </Canvas>
    </div>
  );
};
