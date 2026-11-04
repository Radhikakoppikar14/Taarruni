import React, { useEffect, useRef, useState } from 'react';

/* =========================================================================
   MAGNETIC PARALLAX FOLLOW (no custom cursor graphics)
   1. Every visible button / link / card inside the viewport drifts a few
      pixels *toward* the cursor, with a distance falloff, so the whole UI
      leans toward where you are looking.
   3. Cards also receive --mx / --my so their CSS spotlight tracks the pointer.

   Parallax uses the individual `translate` CSS property, so it never fights
   with Tailwind's `scale-*` utilities, framer-motion's `transform`, or GSAP.
========================================================================= */

const INTERACTIVE_SELECTOR =
  'button, a[href], [role="button"], .cursor-pointer, [data-magnetic]';
const CARD_SELECTOR = '.holo-border-wrap, [data-card]';
const PARALLAX_SELECTOR = `${INTERACTIVE_SELECTOR}, ${CARD_SELECTOR}`;

interface Tracked {
  el: HTMLElement;
  kind: 'button' | 'card';
  x: number; // current offset (px)
  y: number;
  baseTranslate: string; // inline `translate` that existed before us
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (coarse || reduce) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    /* ------------------------------ state ------------------------------ */
    const mouse = { x: -200, y: -200, seen: false };
    const ring = { x: -200, y: -200 };
    const dot = { x: -200, y: -200 };
    let hoverTarget: HTMLElement | null = null;
    let pressed = false;

    const tracked = new Map<HTMLElement, Tracked>();
    const visible = new Set<HTMLElement>();
    const known = new WeakSet<HTMLElement>();
    const skip = new WeakSet<HTMLElement>();

    let raf = 0;
    let running = false;
    let lastActivity = performance.now();

    /* ------------------- viewport tracking of elements ------------------ */
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            visible.add(el);
          } else {
            visible.delete(el);
            release(el);
          }
        }
      },
      { rootMargin: '120px' },
    );

    const release = (el: HTMLElement) => {
      const t = tracked.get(el);
      if (!t) return;
      if (t.baseTranslate) el.style.translate = t.baseTranslate;
      else el.style.removeProperty('translate');
      el.removeAttribute('data-parallax');
      tracked.delete(el);
    };

    const register = (el: HTMLElement) => {
      if (known.has(el)) return;
      known.add(el);
      io.observe(el);
    };

    const scan = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>(PARALLAX_SELECTOR).forEach(register);
      if (root instanceof HTMLElement && root.matches(PARALLAX_SELECTOR)) register(root);
    };
    scan(document);

    let scanTimer = 0;
    const mo = new MutationObserver(() => {
      window.clearTimeout(scanTimer);
      scanTimer = window.setTimeout(() => scan(document), 120);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    /* ---------------------------- frame loop --------------------------- */
    const frame = () => {
      raf = requestAnimationFrame(frame);
      const now = performance.now();

      // Cursor ring: eases toward pointer, or toward the hovered element's centre
      let tx = mouse.x;
      let ty = mouse.y;
      if (hoverTarget && hoverTarget.isConnected) {
        const r = hoverTarget.getBoundingClientRect();
        if (r.width < 420 && r.height < 160) {
          // magnetic snap – 35% pull toward the element's centre
          tx = lerp(mouse.x, r.left + r.width / 2, 0.35);
          ty = lerp(mouse.y, r.top + r.height / 2, 0.35);
        }
      }
      ring.x = lerp(ring.x, tx, 0.2);
      ring.y = lerp(ring.y, ty, 0.2);
      dot.x = lerp(dot.x, mouse.x, 0.55);
      dot.y = lerp(dot.y, mouse.y, 0.55);

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%) scale(${pressed ? 0.6 : 1})`;
      }

      // Parallax follow
      let moving = false;
      if (mouse.seen) {
        visible.forEach((el) => {
          if (!el.isConnected) {
            visible.delete(el);
            tracked.delete(el);
            return;
          }

          let t = tracked.get(el);
          if (!t) {
            if (skip.has(el)) return;
            // Skip anything that already uses the `translate` property (e.g. -translate-x-1/2)
            // and inline boxes (transforms don't apply to them).
            const cs = getComputedStyle(el);
            if ((cs.translate && cs.translate !== 'none' && cs.translate !== '0px') || cs.display === 'inline') {
              skip.add(el);
              return;
            }
            t = {
              el,
              kind: el.matches(CARD_SELECTOR) ? 'card' : 'button',
              x: 0,
              y: 0,
              baseTranslate: el.style.translate,
            };
            tracked.set(el, t);
          }

          // Rect includes our own offset – subtract it to get the resting centre
          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2 - t.x;
          const cy = rect.top + rect.height / 2 - t.y;
          const dx = mouse.x - cx;
          const dy = mouse.y - cy;
          const dist = Math.hypot(dx, dy);

          const isCard = t.kind === 'card';
          const reach = (isCard ? 520 : 280) + Math.min(rect.width, 360) * 0.4;
          const max = isCard ? 7 : 11;
          let tgtX = 0;
          let tgtY = 0;

          if (dist < reach && dist > 0.5) {
            const falloff = 1 - dist / reach; // 1 at the element, 0 at the edge
            const pull = Math.min(max, dist * (isCard ? 0.03 : 0.11)) * falloff * (isCard ? 1.35 : 1.2);
            tgtX = (dx / dist) * pull;
            tgtY = (dy / dist) * pull;
          }

          // Hovered element leans in a little harder
          if (el === hoverTarget || el.contains(hoverTarget)) {
            tgtX *= 1.35;
            tgtY *= 1.35;
          }

          t.x = lerp(t.x, tgtX, isCard ? 0.09 : 0.16);
          t.y = lerp(t.y, tgtY, isCard ? 0.09 : 0.16);

          if (Math.abs(t.x) > 0.02 || Math.abs(t.y) > 0.02) {
            moving = true;
            el.setAttribute('data-parallax', 'on');
            el.style.translate = `${t.x.toFixed(2)}px ${t.y.toFixed(2)}px`;
          } else if (el.hasAttribute('data-parallax')) {
            el.removeAttribute('data-parallax');
            if (t.baseTranslate) el.style.translate = t.baseTranslate;
            else el.style.removeProperty('translate');
          }

          // Spotlight coordinates for cards
          if (isCard && dist < reach) {
            el.style.setProperty('--mx', `${mouse.x - rect.left}px`);
            el.style.setProperty('--my', `${mouse.y - rect.top}px`);
          }
        });
      }

      // Idle? stop the loop until the next interaction (saves battery)
      const ringSettled =
        Math.abs(ring.x - tx) < 0.1 && Math.abs(ring.y - ty) < 0.1 &&
        Math.abs(dot.x - mouse.x) < 0.1 && Math.abs(dot.y - mouse.y) < 0.1;
      if (!moving && ringSettled && now - lastActivity > 400) {
        cancelAnimationFrame(raf);
        running = false;
      }
    };

    const wake = () => {
      lastActivity = performance.now();
      if (!running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };

    /* ----------------------------- listeners --------------------------- */
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!mouse.seen) {
        mouse.seen = true;
        ring.x = dot.x = e.clientX;
        ring.y = dot.y = e.clientY;
        wrapRef.current?.style.setProperty('opacity', '1');
      }
      wake();
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const hit = target?.closest?.(INTERACTIVE_SELECTOR) as HTMLElement | null;
      hoverTarget = hit;
      const hovering = !!hit;
      ringRef.current?.setAttribute('data-hover', String(hovering));
      dotRef.current?.setAttribute('data-hover', String(hovering));
      wake();
    };

    const onDown = () => {
      pressed = true;
      ringRef.current?.setAttribute('data-pressed', 'true');
      wake();
    };
    const onUp = () => {
      pressed = false;
      ringRef.current?.setAttribute('data-pressed', 'false');
      wake();
    };

    const onLeave = () => wrapRef.current?.style.setProperty('opacity', '0');
    const onEnter = () => mouse.seen && wrapRef.current?.style.setProperty('opacity', '1');

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    window.addEventListener('mousedown', onDown, { passive: true });
    window.addEventListener('mouseup', onUp, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(scanTimer);
      io.disconnect();
      mo.disconnect();
      tracked.forEach((_, el) => release(el));
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [enabled]);

  // The ring / dot cursor visuals were removed – only the parallax behaviour remains,
  // and the native system cursor is used.
  return null;
};