import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const HeroThreeCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Dimensions
    const width = currentMount.clientWidth || 500;
    const height = currentMount.clientHeight || 500;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 18;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // Group for mouse parallax
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Inner Core Geodesic Wireframe (Tech Tree / Neural Enterprise Core)
    const coreGeo = new THREE.IcosahedronGeometry(4.8, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7, // sky-600
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    worldGroup.add(coreMesh);

    // Outer Halo Wireframe
    const outerGeo = new THREE.DodecahedronGeometry(7.2, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x2563eb, // blue-600
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    worldGroup.add(outerMesh);

    // Nodes (Spheres at vertices)
    const nodePositions = coreGeo.getAttribute('position');
    const nodeCount = nodePositions.count;
    const nodeGroup = new THREE.Group();

    const sphereGeo = new THREE.SphereGeometry(0.24, 16, 16);
    const primaryMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.4,
    });
    const accentMat = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.6,
    });

    const nodes: THREE.Mesh[] = [];
    for (let i = 0; i < nodeCount; i += 3) {
      const x = nodePositions.getX(i);
      const y = nodePositions.getY(i);
      const z = nodePositions.getZ(i);

      const node = new THREE.Mesh(sphereGeo, i % 6 === 0 ? accentMat : primaryMat);
      node.position.set(x, y, z);
      nodeGroup.add(node);
      nodes.push(node);
    }
    worldGroup.add(nodeGroup);

    // Ambient floating enterprise data points
    const particleCount = 70;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 22;
      particlePositions[i + 1] = (Math.random() - 0.5) * 22;
      particlePositions[i + 2] = (Math.random() - 0.5) * 22;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x0ea5e9,
      size: 0.16,
      transparent: true,
      opacity: 0.7,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    worldGroup.add(particleSystem);

    // Orbiting Satellite Rings
    const ringGeo = new THREE.TorusGeometry(8.5, 0.04, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.4,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    ringMesh.rotation.y = Math.PI / 6;
    worldGroup.add(ringMesh);

    // Lighting (Crisp studio light)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 2.0);
    dirLight1.position.set(10, 15, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x2563eb, 1.5);
    dirLight2.position.set(-10, -10, -5);
    scene.add(dirLight2);

    // Mouse Interaction
    let targetX = 0;
    let targetY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    const handleMouseMove = (event: MouseEvent) => {
      targetX = (event.clientX - windowHalfX) * 0.0006;
      targetY = (event.clientY - windowHalfY) * 0.0006;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!currentMount) return;
      const w = currentMount.clientWidth;
      const h = currentMount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Gentle continuous rotation
      coreMesh.rotation.x += 0.0025;
      coreMesh.rotation.y += 0.0035;

      outerMesh.rotation.x -= 0.0015;
      outerMesh.rotation.y -= 0.002;

      nodeGroup.rotation.x = coreMesh.rotation.x;
      nodeGroup.rotation.y = coreMesh.rotation.y;

      ringMesh.rotation.z += 0.003;
      particleSystem.rotation.y += 0.0008;

      // Mouse Parallax Smooth Lerp
      worldGroup.rotation.y += (targetX - worldGroup.rotation.y) * 0.05;
      worldGroup.rotation.x += (targetY - worldGroup.rotation.x) * 0.05;

      // Subtle pulse on nodes
      const scale = 1 + Math.sin(elapsedTime * 2) * 0.04;
      coreMesh.scale.set(scale, scale, scale);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeo.dispose();
      outerGeo.dispose();
      sphereGeo.dispose();
      particleGeo.dispose();
      ringGeo.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[540px] flex items-center justify-center pointer-events-none select-none">
      {/* Three.js Mounting Container */}
      <div ref={mountRef} className="w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing" />

      {/* Floating 3D Node Labels / Enterprise Badges */}
      <div className="absolute top-6 left-6 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-sm text-xs font-semibold text-slate-800">
        <span className="w-2 h-2 rounded-full bg-sky-500"></span>
        <span>Enterprise Neural Fabric</span>
      </div>

      <div className="absolute bottom-8 right-6 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-sm text-xs font-semibold text-slate-800">
        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
        <span>MSME Workflow Cluster</span>
      </div>

      <div className="absolute bottom-6 left-8 pointer-events-none text-[11px] font-mono text-slate-600 bg-slate-50/80 px-2.5 py-1 rounded border border-slate-200/60 hidden md:block">
        Drag to rotate 3D nodes · Real-time WebGL
      </div>
    </div>
  );
};
