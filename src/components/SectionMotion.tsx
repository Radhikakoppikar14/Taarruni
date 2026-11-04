import React, { useLayoutEffect } from 'react';

/**
 * SectionMotion
 * ---------------------------------------------------------------------------
 * Adds a modern scroll-reveal to every section of the current page without
 * touching each page file: cards, panels and headings fade + rise + settle
 * in a soft stagger as they enter the viewport.
 *
 * - Uses the individual CSS `translate` / `scale` properties, so it never
 *   fights with Framer Motion or Tilt3D `transform`s.
 * - Skips anything already animated by Framer Motion (inline opacity).
 * - Removes its own classes after the reveal so hover styles are untouched.
 * - Disabled for prefers-reduced-motion.
 */
const CANDIDATES =
  'h1, h2, .holo-border-wrap, [class*="rounded-3xl"], [class*="rounded-2xl"], [class*="rounded-[28px]"], [class*="rounded-[32px]"]';

export const SectionMotion: React.FC<{ route: string }> = ({ route }) => {
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;
    const main = document.querySelector('main');
    if (!main) return;

    const timers: number[] = [];

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          io.unobserve(el);
          el.classList.add('rv-in');
          // hand the element back to its normal styles once settled
          const t = window.setTimeout(() => {
            el.classList.remove('rv', 'rv-in');
            el.style.removeProperty('--rv-delay');
          }, 1400 + (parseInt(el.style.getPropertyValue('--rv-delay')) || 0));
          timers.push(t);
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
    );

    const scan = () => {
      const picked: HTMLElement[] = [];
      main.querySelectorAll<HTMLElement>(CANDIDATES).forEach((el) => {
        if (el.dataset.rv) return;
        // already handled by Framer Motion (or inside something that is)
        if (el.closest('[style*="opacity"]')) return;
        // nested inside another revealed element
        if (el.parentElement && el.parentElement.closest('.rv')) return;
        const rect = el.getBoundingClientRect();
        const isHeading = el.tagName === 'H1' || el.tagName === 'H2';
        if (!isHeading && rect.height < 70) return; // skip buttons / chips / icons
        el.dataset.rv = '1';
        picked.push(el);
      });

      // stagger siblings
      const counts = new Map<Element | null, number>();
      picked.forEach((el) => {
        const parent = el.parentElement;
        const n = counts.get(parent) ?? 0;
        counts.set(parent, n + 1);
        el.style.setProperty('--rv-delay', `${Math.min(n, 5) * 90}ms`);
        el.classList.add('rv');
        io.observe(el);
      });
    };

    scan();
    // pick up content that renders a moment later (images, async sections)
    timers.push(window.setTimeout(scan, 700));
    timers.push(window.setTimeout(scan, 1800));

    return () => {
      io.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
      main.querySelectorAll<HTMLElement>('.rv').forEach((el) => {
        el.classList.remove('rv', 'rv-in');
      });
    };
  }, [route]);

  return null;
};

export default SectionMotion;