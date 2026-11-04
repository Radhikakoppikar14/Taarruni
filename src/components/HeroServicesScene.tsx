import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

/**
 * HeroServicesScene
 * ---------------------------------------------------------------------------
 * Hero 3D visual that tells the Taarruni story at a glance:
 *   - a website window            → IT / web development
 *   - a mobile app screen         → digital & social marketing
 *   - a growing bar chart         → results / growth
 *   - a roadside billboard        → All India branding & signage
 *   - floating tiles + orbit rings (code, @, ★, %, #)
 * Light, glossy, brand colours (cyan · magenta · gold). Mouse tilts the scene.
 * Plain three.js, transparent canvas, pauses off-screen / hidden tab.
 */

const CYAN = 0x12b8d8;
const MAGENTA = 0xe11d74;
const GOLD = 0xf5b000;

/* ------------------------------ helpers ---------------------------------- */

function roundedShape(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

function slab(w: number, h: number, d: number, r: number) {
  const g = new THREE.ExtrudeGeometry(roundedShape(w, h, r), {
    depth: d,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.03,
    bevelSegments: 3,
    curveSegments: 10,
  });
  g.translate(0, 0, -d / 2);
  return g;
}

function rrect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function makeTexture(w: number, h: number, draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d')!;
  draw(ctx, w, h);
  const tex = new THREE.CanvasTexture(c);
  (tex as unknown as { colorSpace: string }).colorSpace = 'srgb';
  tex.anisotropy = 4;
  return tex;
}

function brandGradient(ctx: CanvasRenderingContext2D, x0: number, y0: number, x1: number, y1: number) {
  const g = ctx.createLinearGradient(x0, y0, x1, y1);
  g.addColorStop(0, '#2fd4ee');
  g.addColorStop(0.55, '#ff3d8f');
  g.addColorStop(1, '#ffc23d');
  return g;
}

/* --------------------------- canvas artworks ----------------------------- */

const drawWebsite = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, w, h);
  // hero banner
  ctx.fillStyle = brandGradient(ctx, 30, 30, w - 30, 260);
  rrect(ctx, 30, 30, w - 60, 240, 26);
  ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.28)';
  ctx.beginPath();
  ctx.arc(w - 170, 150, 78, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  rrect(ctx, 70, 80, 400, 30, 15); ctx.fill();
  rrect(ctx, 70, 124, 300, 30, 15); ctx.fill();
  rrect(ctx, 70, 190, 170, 46, 23); ctx.fill();
  ctx.fillStyle = '#111827';
  rrect(ctx, 96, 207, 118, 12, 6); ctx.fill();
  // cards
  const cw = (w - 60 - 40) / 3;
  const fills = ['#e2faff', '#ffe4f0', '#fff3d6'];
  const dots = ['#12b8d8', '#e11d74', '#f5b000'];
  for (let i = 0; i < 3; i++) {
    const x = 30 + i * (cw + 20);
    ctx.fillStyle = fills[i];
    rrect(ctx, x, 300, cw, 150, 22); ctx.fill();
    ctx.fillStyle = dots[i];
    ctx.beginPath(); ctx.arc(x + 44, 345, 20, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(17,24,39,0.55)';
    rrect(ctx, x + 22, 385, cw - 70, 12, 6); ctx.fill();
    ctx.fillStyle = 'rgba(17,24,39,0.25)';
    rrect(ctx, x + 22, 410, cw - 110, 12, 6); ctx.fill();
  }
  ctx.fillStyle = '#e4e9f3';
  rrect(ctx, 30, 478, w - 200, 14, 7); ctx.fill();
  rrect(ctx, 30, 506, w - 330, 14, 7); ctx.fill();
};

const drawPhone = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = brandGradient(ctx, 0, 0, w, 200);
  ctx.fillRect(0, 0, w, 190);
  ctx.fillStyle = '#fff';
  ctx.beginPath(); ctx.arc(70, 110, 38, 0, Math.PI * 2); ctx.fill();
  rrect(ctx, 130, 88, 170, 18, 9); ctx.fill();
  ctx.globalAlpha = 0.6;
  rrect(ctx, 130, 120, 110, 14, 7); ctx.fill();
  ctx.globalAlpha = 1;
  // post image
  const g = ctx.createLinearGradient(30, 220, w - 30, 520);
  g.addColorStop(0, '#ffd36b'); g.addColorStop(1, '#ff4d9a');
  ctx.fillStyle = g;
  rrect(ctx, 30, 220, w - 60, 290, 28); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  ctx.beginPath(); ctx.arc(w / 2, 365, 82, 0, Math.PI * 2); ctx.fill();
  // actions
  ctx.fillStyle = '#e11d74';
  ctx.beginPath(); ctx.arc(62, 560, 18, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#12b8d8';
  ctx.beginPath(); ctx.arc(112, 560, 18, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#f5b000';
  ctx.beginPath(); ctx.arc(162, 560, 18, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#e4e9f3';
  rrect(ctx, 30, 604, w - 100, 14, 7); ctx.fill();
  rrect(ctx, 30, 634, w - 190, 14, 7); ctx.fill();
  ctx.fillStyle = '#eef2f9';
  rrect(ctx, 30, 690, w - 60, 190, 26); ctx.fill();
  ctx.fillStyle = '#12b8d8';
  rrect(ctx, 56, 720, 120, 16, 8); ctx.fill();
  ctx.fillStyle = '#e4e9f3';
  rrect(ctx, 56, 756, w - 120, 14, 7); ctx.fill();
  rrect(ctx, 56, 786, w - 200, 14, 7); ctx.fill();
};

const drawBillboard = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
  ctx.fillStyle = brandGradient(ctx, 0, 0, w, h);
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = 'rgba(255,255,255,0.16)';
  ctx.beginPath(); ctx.arc(w - 170, 110, 230, 0, Math.PI * 2); ctx.fill();
  // abstract brand mark: ring + dot
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 34;
  ctx.beginPath(); ctx.arc(330, h / 2, 150, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath(); ctx.arc(330, h / 2, 62, 0, Math.PI * 2); ctx.fill();
  // layout bars
  rrect(ctx, 620, 190, 500, 44, 22); ctx.fill();
  ctx.globalAlpha = 0.75;
  rrect(ctx, 620, 270, 400, 44, 22); ctx.fill();
  ctx.globalAlpha = 0.5;
  rrect(ctx, 620, 350, 300, 44, 22); ctx.fill();
  ctx.globalAlpha = 1;
  ctx.strokeStyle = 'rgba(255,255,255,0.8)';
  ctx.lineWidth = 10;
  rrect(ctx, 22, 22, w - 44, h - 44, 30);
  ctx.stroke();
};

const drawChip = (glyph: string, color: string) => (ctx: CanvasRenderingContext2D, w: number, h: number) => {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = color;
  rrect(ctx, 0, 0, w, h, 70); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.22)';
  rrect(ctx, 0, 0, w, h / 2, 70); ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '800 112px Arial, sans-serif';
  ctx.fillText(glyph, w / 2, h / 2 + 6);
};

/* ------------------------------ component -------------------------------- */

export const HeroServicesScene: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    const wrap = wrapRef.current;
    if (!mount || !wrap) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.cssText = 'width:100%;height:100%;display:block';
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);

    // lights – bright & soft so the pale UI stays clean
    scene.add(new THREE.AmbientLight(0xffffff, 1.35));
    const key = new THREE.DirectionalLight(0xffffff, 1.5);
    key.position.set(4, 7, 9);
    scene.add(key);
    const fillC = new THREE.PointLight(CYAN, 18, 40);
    fillC.position.set(-7, 2, 6);
    scene.add(fillC);
    const fillM = new THREE.PointLight(MAGENTA, 18, 40);
    fillM.position.set(7, -3, 6);
    scene.add(fillM);

    const disposables: { dispose: () => void }[] = [];
    const track = <T extends { dispose: () => void }>(o: T) => {
      disposables.push(o);
      return o;
    };

    const root = new THREE.Group();
    root.position.y = -0.1;
    scene.add(root);

    const bodyMat = track(new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.35, metalness: 0.05 }));
    const inkMat = track(new THREE.MeshStandardMaterial({ color: 0x1b2437, roughness: 0.3, metalness: 0.2 }));

    const screen = (tex: THREE.Texture) =>
      track(new THREE.MeshBasicMaterial({ map: tex, toneMapped: false }));

    /* ---- 1. Website window ------------------------------------------- */
    const web = new THREE.Group();
    const webBody = new THREE.Mesh(track(slab(4.5, 3.15, 0.16, 0.2)), bodyMat);
    web.add(webBody);
    const barGeo = track(new THREE.PlaneGeometry(4.4, 0.36));
    const barMat = track(new THREE.MeshBasicMaterial({ color: 0xeaf0f9 }));
    const bar = new THREE.Mesh(barGeo, barMat);
    bar.position.set(0, 1.3, 0.125);
    web.add(bar);
    [MAGENTA, GOLD, CYAN].forEach((c, i) => {
      const d = new THREE.Mesh(
        track(new THREE.CircleGeometry(0.06, 20)),
        track(new THREE.MeshBasicMaterial({ color: c })),
      );
      d.position.set(-1.95 + i * 0.17, 1.3, 0.13);
      web.add(d);
    });
    const webTex = track(makeTexture(880, 560, drawWebsite));
    const webScreen = new THREE.Mesh(track(new THREE.PlaneGeometry(4.3, 2.74)), screen(webTex));
    webScreen.position.set(0, -0.2, 0.125);
    web.add(webScreen);
    web.position.set(0, 0.55, 0);
    web.rotation.set(0.04, -0.3, 0.02);
    root.add(web);

    /* ---- 2. Phone ----------------------------------------------------- */
    const phone = new THREE.Group();
    phone.add(new THREE.Mesh(track(slab(1.3, 2.65, 0.15, 0.24)), inkMat));
    const phoneTex = track(makeTexture(440, 920, drawPhone));
    const phoneScreen = new THREE.Mesh(track(new THREE.PlaneGeometry(1.14, 2.38)), screen(phoneTex));
    phoneScreen.position.set(0, 0, 0.115);
    phone.add(phoneScreen);
    const notch = new THREE.Mesh(
      track(new THREE.PlaneGeometry(0.34, 0.07)),
      track(new THREE.MeshBasicMaterial({ color: 0x0b1220 })),
    );
    notch.position.set(0, 1.12, 0.12);
    phone.add(notch);
    phone.position.set(-2.95, -1.55, 1.2);
    phone.rotation.set(0.02, 0.38, -0.05);
    root.add(phone);

    /* ---- 3. Growth chart card ---------------------------------------- */
    const chart = new THREE.Group();
    chart.add(new THREE.Mesh(track(slab(2.7, 2.1, 0.13, 0.2)), bodyMat));
    const barColors = [CYAN, CYAN, MAGENTA, MAGENTA, GOLD];
    const targets = [0.55, 0.85, 0.75, 1.2, 1.5];
    const bars: THREE.Mesh[] = [];
    const baseY = -0.8;
    barColors.forEach((c, i) => {
      const g = track(new THREE.BoxGeometry(0.31, 1, 0.3));
      g.translate(0, 0.5, 0);
      const m = new THREE.Mesh(
        g,
        track(new THREE.MeshStandardMaterial({ color: c, roughness: 0.3, metalness: 0.1 })),
      );
      m.position.set(-0.95 + i * 0.475, baseY, 0.2);
      m.scale.y = targets[i];
      chart.add(m);
      bars.push(m);
    });
    // trend line + arrow
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.05, baseY + 0.9, 0.42),
      new THREE.Vector3(-0.5, baseY + 1.25, 0.42),
      new THREE.Vector3(0.0, baseY + 1.1, 0.42),
      new THREE.Vector3(0.5, baseY + 1.7, 0.42),
      new THREE.Vector3(1.05, baseY + 2.05, 0.42),
    ]);
    const tube = new THREE.Mesh(
      track(new THREE.TubeGeometry(curve, 40, 0.034, 8, false)),
      track(new THREE.MeshBasicMaterial({ color: 0x1b2437 })),
    );
    chart.add(tube);
    const arrow = new THREE.Mesh(
      track(new THREE.ConeGeometry(0.1, 0.24, 16)),
      track(new THREE.MeshBasicMaterial({ color: 0x1b2437 })),
    );
    arrow.position.copy(curve.getPoint(1));
    arrow.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), curve.getTangent(1).normalize());
    chart.add(arrow);
    chart.position.set(2.75, -1.75, 0.9);
    chart.rotation.set(0.02, -0.42, 0.03);
    root.add(chart);

    /* ---- 4. Billboard ------------------------------------------------- */
    const board = new THREE.Group();
    board.add(new THREE.Mesh(track(slab(3.3, 1.55, 0.12, 0.12)), bodyMat));
    const bbTex = track(makeTexture(1280, 600, drawBillboard));
    const bbScreen = new THREE.Mesh(track(new THREE.PlaneGeometry(3.22, 1.47)), screen(bbTex));
    bbScreen.position.set(0, 0, 0.095);
    board.add(bbScreen);
    const poleMat = track(new THREE.MeshStandardMaterial({ color: 0xaab5cc, roughness: 0.5, metalness: 0.3 }));
    [-1.0, 1.0].forEach((x) => {
      const pole = new THREE.Mesh(track(new THREE.CylinderGeometry(0.06, 0.07, 1.5, 12)), poleMat);
      pole.position.set(x, -1.5, -0.02);
      board.add(pole);
    });
    board.position.set(2.0, 3.05, -1.5);
    board.rotation.set(0.02, -0.3, 0.02);
    root.add(board);

    /* ---- 5. Floating tiles ------------------------------------------- */
    interface Chip { mesh: THREE.Group; base: THREE.Vector3; speed: number; phase: number; rotY: number }
    const chips: Chip[] = [];
    const chipDefs: [string, string, number, number, number][] = [
      ['</>', '#12b8d8', -3.2, 2.5, 0.6],
      ['@', '#e11d74', -3.9, 0.3, -0.3],
      ['★', '#f5b000', 3.95, 0.7, 0.3],
      ['%', '#e11d74', -0.6, -3.15, 1.8],
      ['#', '#12b8d8', 0.9, 3.5, 0.2],
    ];
    chipDefs.forEach(([glyph, color, x, y, z], i) => {
      const g = new THREE.Group();
      g.add(new THREE.Mesh(track(slab(0.7, 0.7, 0.14, 0.2)), bodyMat));
      const t = track(makeTexture(256, 256, drawChip(glyph, color)));
      const face = new THREE.Mesh(
        track(new THREE.PlaneGeometry(0.66, 0.66)),
        track(new THREE.MeshBasicMaterial({ map: t, transparent: true, toneMapped: false })),
      );
      face.position.z = 0.105;
      g.add(face);
      g.position.set(x, y, z);
      g.rotation.set(0.1, -0.25 + i * 0.12, (i % 2 ? 1 : -1) * 0.12);
      root.add(g);
      chips.push({ mesh: g, base: new THREE.Vector3(x, y, z), speed: 0.6 + i * 0.13, phase: i * 1.7, rotY: g.rotation.y });
    });

    /* ---- 6. Orbit rings + travelling bead ---------------------------- */
    const ringGroup = new THREE.Group();
    ringGroup.rotation.set(1.15, 0.2, 0.35);
    const ringA = new THREE.Mesh(
      track(new THREE.TorusGeometry(4.3, 0.016, 8, 140)),
      track(new THREE.MeshBasicMaterial({ color: MAGENTA, transparent: true, opacity: 0.55 })),
    );
    ringGroup.add(ringA);
    const ringB = new THREE.Mesh(
      track(new THREE.TorusGeometry(3.5, 0.012, 8, 120)),
      track(new THREE.MeshBasicMaterial({ color: CYAN, transparent: true, opacity: 0.5 })),
    );
    ringB.rotation.set(0.4, 0.3, 0);
    ringGroup.add(ringB);
    const bead = new THREE.Mesh(
      track(new THREE.SphereGeometry(0.13, 20, 20)),
      track(new THREE.MeshBasicMaterial({ color: GOLD })),
    );
    ringGroup.add(bead);
    root.add(ringGroup);

    /* ---- sizing ------------------------------------------------------- */
    const resize = () => {
      const w = Math.max(1, wrap.clientWidth);
      const h = Math.max(1, wrap.clientHeight);
      renderer.setSize(w, h, false);
      const aspect = w / h;
      camera.aspect = aspect;
      camera.position.set(0, 0.2, Math.max(14, 14.2 / aspect));
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    /* ---- interaction -------------------------------------------------- */
    const pointer = new THREE.Vector2();
    const pointerT = new THREE.Vector2();
    const onMove = (e: MouseEvent) => {
      pointerT.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerT.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; }, { threshold: 0.01 });
    io.observe(wrap);

    /* ---- loop --------------------------------------------------------- */
    const clock = new THREE.Clock();
    let animId = 0;
    const tick = () => {
      animId = requestAnimationFrame(tick);
      if (!visible || document.hidden) { clock.getDelta(); return; }
      const t = clock.getElapsedTime();

      pointer.lerp(pointerT, 0.05);
      root.rotation.y = pointer.x * 0.28 + Math.sin(t * 0.25) * 0.05;
      root.rotation.x = -pointer.y * 0.12;

      web.position.y = 0.55 + Math.sin(t * 0.8) * 0.07;
      phone.position.y = -1.55 + Math.sin(t * 0.9 + 1.2) * 0.1;
      chart.position.y = -1.75 + Math.sin(t * 0.7 + 2.4) * 0.08;
      board.position.y = 3.05 + Math.sin(t * 0.6 + 0.6) * 0.06;

      bars.forEach((b, i) => {
        b.scale.y = targets[i] * (0.88 + 0.12 * Math.sin(t * 1.3 + i * 0.8));
      });

      chips.forEach((c) => {
        c.mesh.position.y = c.base.y + Math.sin(t * c.speed + c.phase) * 0.14;
        c.mesh.rotation.y = c.rotY + Math.sin(t * c.speed * 0.8 + c.phase) * 0.35;
      });

      ringGroup.rotation.z = 0.35 + t * 0.05;
      const a = t * 0.9;
      bead.position.set(Math.cos(a) * 4.3, Math.sin(a) * 4.3, 0);

      renderer.render(scene, camera);
    };

    if (reduced) {
      renderer.render(scene, camera);
    } else {
      tick();
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMove);
      ro.disconnect();
      io.disconnect();
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative w-full h-[420px] sm:h-[500px] lg:h-[600px] flex items-center justify-center"
    >
      {/* soft colour halo behind the scene */}
      <div
        className="absolute inset-[6%] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 60% 35%, rgba(255,190,90,0.22), rgba(120,190,255,0.20) 50%, transparent 72%)',
        }}
      />
      <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />
    </div>
  );
};

export default HeroServicesScene;