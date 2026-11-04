import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export const LiquidChromeBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'default' });
    } catch (e) {
      return;
    }

    renderer.setSize(window.innerWidth, window.innerHeight);
    // Lower internal resolution = far fewer pixels to shade; the soft fluid hides it.
    const RES = Math.min(window.devicePixelRatio, 1) * 0.6;
    renderer.setPixelRatio(RES);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    // Liquid Chrome Shader Material
    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth * RES, window.innerHeight * RES) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uScroll: { value: 0 },
      uTheme: { value: 1 }, // light theme only (pearl daylight)
    };

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      uniform float uScroll;
      uniform float uTheme;
      varying vec2 vUv;

      // Simplex-inspired procedural liquid noise
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                           -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
              + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 st = gl_FragCoord.xy / uResolution.xy;
        st.y *= uResolution.y / uResolution.x;

        // Mouse ripple displacement
        vec2 mouseSt = uMouse;
        mouseSt.y *= uResolution.y / uResolution.x;
        float mouseDist = distance(st, mouseSt);
        float mouseRipple = sin(mouseDist * 18.0 - uTime * 2.5) * exp(-mouseDist * 3.5) * 0.08;

        // Multi-frequency liquid flow
        float t = uTime * 0.18;
        float n1 = snoise(st * 2.2 + vec2(t * 0.4, t * 0.3) + mouseRipple);
        float n2 = snoise(st * 4.5 - vec2(t * 0.2, n1 * 0.5) + uScroll * 0.0008);
        float fluid = n1 * 0.58 + n2 * 0.42;
        
        // Liquid Chrome Base Color (Dark graphite with specular iridescent highlights)
        vec3 graphite = mix(vec3(0.047, 0.051, 0.063), vec3(0.980, 0.986, 0.997), uTheme); // #0c0d10 -> near-white
        vec3 deepSurface = mix(vec3(0.086, 0.094, 0.114), vec3(0.925, 0.952, 0.990), uTheme); // #16181d -> very light pearl blue
        
        // Iridescent Highlights: Cyan, Magenta, Gold (softer pastels by day)
        vec3 cyan = mix(vec3(0.243, 0.941, 1.0), vec3(0.20, 0.75, 0.92), uTheme);
        vec3 magenta = mix(vec3(1.0, 0.180, 0.533), vec3(0.98, 0.45, 0.70), uTheme);
        vec3 gold = mix(vec3(1.0, 0.827, 0.420), vec3(1.0, 0.80, 0.45), uTheme);

        // Color mapping based on fluid height & scroll hue shift
        float hueShift = fract(fluid * 0.5 + uScroll * 0.0003);
        vec3 iridColor = mix(cyan, magenta, smoothstep(0.1, 0.6, hueShift));
        iridColor = mix(iridColor, gold, smoothstep(0.5, 0.9, hueShift));

        // Specular chrome crests
        float specular = pow(clamp(fluid * 0.5 + 0.5, 0.0, 1.0), 4.5);
        
        vec3 finalColor = mix(graphite, deepSurface, fluid * 0.5 + 0.5);
        finalColor += iridColor * specular * mix(0.32, 0.13, uTheme);

        // Subtle edge vignette (lighter by day)
        vec2 uvCenter = vUv - 0.5;
        float vignette = 1.0 - dot(uvCenter, uvCenter) * mix(0.6, 0.06, uTheme);
        finalColor *= vignette;

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      depthWrite: false,
    });

    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    // Event handlers
    let targetMouse = new THREE.Vector2(0.5, 0.5);
    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = e.clientX / window.innerWidth;
      targetMouse.y = 1.0 - e.clientY / window.innerHeight;
    };

    let targetScroll = 0;
    const handleScroll = () => {
      targetScroll = window.scrollY || 0;
    };

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      uniforms.uResolution.value.set(window.innerWidth * RES, window.innerHeight * RES);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    // Render loop
    let animId: number;
    const clock = new THREE.Clock();

    let acc = 0;
    const FRAME = 1 / 30; // cap at ~30fps – the liquid flow is slow, so it looks the same
    const render = () => {
      animId = requestAnimationFrame(render);
      if (document.hidden) { clock.getDelta(); return; }
      const delta = clock.getDelta();
      acc += delta;
      if (acc < FRAME) return;
      const dt = acc;
      acc = 0;
      uniforms.uTime.value += dt;
      
      // Smooth lerp mouse and scroll
      uniforms.uMouse.value.lerp(targetMouse, 0.12);
      uniforms.uScroll.value += (targetScroll - uniforms.uScroll.value) * 0.15;


      renderer.render(scene, camera);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden"
      aria-hidden="true"
    />
  );
};