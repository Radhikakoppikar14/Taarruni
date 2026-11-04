import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

/**
 * Background3D – modern flowing-ribbon background
 * ---------------------------------------------------------------------------
 * Silky, twisting 3D light ribbons (cyan → magenta → gold) that glide across
 * the page behind your content. Soft glassy sheen, no dots, no solid shapes.
 *   - ribbons ripple toward the mouse
 *   - camera drifts with mouse + scroll for real depth
 * Transparent layer above the liquid shader, below all page content.
 * Off for prefers-reduced-motion, pauses when tab hidden, fully disposed.
 */

interface RibbonOpts {
  y: number;       // vertical offset
  z: number;       // depth offset
  width: number;   // ribbon half-width
  phase: number;
  speed: number;
  amp: number;
  alpha: number;
  hue: number;     // colour offset along the gradient (0..1)
  twist: number;   // twist frequency
}

const VERT = /* glsl */ `
  uniform float uTime;
  uniform float uPhase;
  uniform float uSpeed;
  uniform float uAmp;
  uniform float uY;
  uniform float uZ;
  uniform float uTwistF;
  uniform vec2 uMouse;
  varying float vU;
  varying float vV;
  varying float vTwist;
  void main() {
    float x = position.x;
    float t = uTime * uSpeed;
    // centre line of the ribbon
    float y = uY
      + sin(x * 0.14 + t * 0.9 + uPhase) * uAmp
      + sin(x * 0.06 - t * 0.5 + uPhase * 1.7) * uAmp * 0.7;
    float z = uZ + sin(x * 0.10 + t * 0.6 + uPhase * 2.3) * uAmp * 0.9;
    // mouse makes the ribbon swell gently
    y += exp(-abs(x - uMouse.x * 28.0) * 0.09) * uMouse.y * 2.2;

    // twisting width => silky 3D sheen
    float tw = x * uTwistF + t * 1.1 + uPhase;
    vec3 p = vec3(x, y + position.y * cos(tw), z + position.y * sin(tw));

    vU = (x + 36.0) / 72.0;
    vV = position.y;
    vTwist = tw;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const FRAG = /* glsl */ `
  uniform float uTime;
  uniform float uAlpha;
  uniform float uHue;
  uniform float uWidth;
  varying float vU;
  varying float vV;
  varying float vTwist;
  void main() {
    vec3 cyan = vec3(0.04, 0.72, 0.90);
    vec3 magenta = vec3(0.92, 0.12, 0.50);
    vec3 gold = vec3(0.98, 0.70, 0.14);
    float g = fract(vU * 0.9 + uHue + uTime * 0.02);
    vec3 col = mix(cyan, magenta, smoothstep(0.0, 0.5, g));
    col = mix(col, gold, smoothstep(0.5, 1.0, g));
    col = mix(col, cyan, smoothstep(0.85, 1.0, g)); // loop seamlessly

    // pastel wash: lighter, airier colours
    col = mix(col, vec3(1.0), 0.5);

    // glassy sheen: brighter where the ribbon faces the viewer
    float sheen = 0.5 + 0.5 * cos(vTwist);
    col = mix(col, vec3(1.0), pow(sheen, 3.0) * 0.55);

    // soft edges across the width, soft fade at both ends
    float edge = 1.0 - smoothstep(0.35, 1.0, abs(vV) / uWidth);
    float ends = smoothstep(0.0, 0.14, vU) * (1.0 - smoothstep(0.86, 1.0, vU));
    float a = edge * ends * uAlpha * (0.40 + 0.60 * sheen);
    gl_FragColor = vec4(col, a);
  }
`;

export const Background3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }

    const isMobile = window.innerWidth < 768;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.cssText = 'width:100%;height:100%;display:block';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      200,
    );
    camera.position.set(0, 0, 22);

    const uTime = { value: 0 };
    const uMouse = { value: new THREE.Vector2(0, 0) };

    const ribbonsDef: RibbonOpts[] = [
      // wide soft ribbons
      { y: -6.5, z: -2, width: 3.4, phase: 0.0, speed: 0.55, amp: 2.4, alpha: 0.13, hue: 0.0,  twist: 0.16 },
      { y: -2.0, z: -8, width: 3.0, phase: 2.1, speed: 0.45, amp: 2.8, alpha: 0.10, hue: 0.33, twist: 0.12 },
      { y:  4.5, z: -12, width: 2.6, phase: 4.2, speed: 0.50, amp: 2.2, alpha: 0.08, hue: 0.66, twist: 0.14 },
      // fine silky lines
      { y: -4.2, z:  2, width: 0.45, phase: 1.0, speed: 0.70, amp: 3.0, alpha: 0.23, hue: 0.15, twist: 0.20 },
      { y:  0.5, z: -4, width: 0.35, phase: 3.0, speed: 0.60, amp: 3.4, alpha: 0.20, hue: 0.50, twist: 0.18 },
      { y:  6.5, z: -6, width: 0.30, phase: 5.0, speed: 0.65, amp: 2.6, alpha: 0.17, hue: 0.80, twist: 0.22 },
    ];
    const list = isMobile ? ribbonsDef.filter((_, i) => i % 2 === 0) : ribbonsDef;

    const SEGMENTS = isMobile ? 160 : 280;
    const materials: THREE.ShaderMaterial[] = [];
    const geometries: THREE.BufferGeometry[] = [];

    list.forEach((o) => {
      const geo = new THREE.PlaneGeometry(72, o.width * 2, SEGMENTS, 1);
      const mat = new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        uniforms: {
          uTime,
          uMouse,
          uPhase: { value: o.phase },
          uSpeed: { value: o.speed },
          uAmp: { value: o.amp },
          uY: { value: o.y },
          uZ: { value: o.z },
          uTwistF: { value: o.twist },
          uAlpha: { value: o.alpha },
          uHue: { value: o.hue },
          uWidth: { value: o.width },
        },
      });
      scene.add(new THREE.Mesh(geo, mat));
      geometries.push(geo);
      materials.push(mat);
    });

    // ---- Interaction ------------------------------------------------------
    const mouse = new THREE.Vector2(0, 0);
    const mouseTarget = new THREE.Vector2(0, 0);
    let scrollTarget = 0;
    let scrollCurrent = 0;

    const onMove = (e: MouseEvent) => {
      mouseTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseTarget.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollTarget = Math.min(1, (window.scrollY || 0) / max);
    };
    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    onScroll();

    // ---- Loop -------------------------------------------------------------
    const clock = new THREE.Clock();
    let animId = 0;
    const render = () => {
      animId = requestAnimationFrame(render);
      clock.getDelta();
      if (document.hidden) return;

      uTime.value = clock.elapsedTime;
      mouse.lerp(mouseTarget, 0.05);
      scrollCurrent += (scrollTarget - scrollCurrent) * 0.05;
      uMouse.value.copy(mouse);

      camera.position.x = mouse.x * 2.2;
      camera.position.y = mouse.y * 1.2 - scrollCurrent * 5;
      camera.position.z = 22 - scrollCurrent * 4;
      camera.lookAt(mouse.x * 1.5, -scrollCurrent * 5, 0);

      renderer.render(scene, camera);
    };
    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden"
      style={{ zIndex: -4 }}
      aria-hidden="true"
    />
  );
};

export default Background3D;