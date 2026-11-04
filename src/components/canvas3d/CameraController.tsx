import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { SCENE_CONFIG } from '../../config/sceneConfig';

interface CameraControllerProps {
  activeScene: string;
}

export const CameraController: React.FC<CameraControllerProps> = ({ activeScene }) => {
  const { camera, pointer } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    const sceneCfg = SCENE_CONFIG.scenes[activeScene] || SCENE_CONFIG.scenes.home;
    const [tx, ty, tz] = sceneCfg.position;
    const [lx, ly, lz] = sceneCfg.target;

    // Mouse parallax offset based on pointer coordinates
    const px = pointer.x * SCENE_CONFIG.camera.mouseParallaxFactor.x;
    const py = pointer.y * SCENE_CONFIG.camera.mouseParallaxFactor.y;

    // Smooth lerp camera position
    const targetPos = new THREE.Vector3(tx + px, ty + py, tz);
    camera.position.lerp(targetPos, THREE.MathUtils.clamp(delta * 2.8, 0.01, 0.15));

    // Smooth lerp target lookAt
    targetLookAt.current.set(lx + px * 0.4, ly + py * 0.4, lz);
    currentLookAt.current.lerp(targetLookAt.current, THREE.MathUtils.clamp(delta * 3.2, 0.01, 0.18));
    camera.lookAt(currentLookAt.current);
  });

  return null;
};
