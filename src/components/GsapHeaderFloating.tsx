import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface GsapHeaderFloatingProps {
  currentRoute?: string;
}

interface FloatingHeaderItem {
  element: HTMLElement;
  isH1: boolean;
  phase: number;
  amplitude: number;
  frequency: number;
  rotAmplitude: number;
  setY: (val: number) => void;
  setRotation: (val: number) => void;
  visible: boolean;
}

/**
 * Global GSAP-driven floating animation for all h1 and h2 headers.
 * Uses a mathematical sine wave function [y = A * sin(ωt + φ)] via GSAP's ticker
 * and quickSetter for 60fps/120fps hardware-accelerated liquid-chrome fluidity.
 */
export const GsapHeaderFloating: React.FC<GsapHeaderFloatingProps> = ({ currentRoute }) => {
  const itemsRef = useRef<FloatingHeaderItem[]>([]);
  const tickerFnRef = useRef<((time: number) => void) | null>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Clean up previous registration
    if (tickerFnRef.current) {
      gsap.ticker.remove(tickerFnRef.current);
      tickerFnRef.current = null;
    }

    // Reset styles on any previous elements
    itemsRef.current.forEach(({ element }) => {
      gsap.set(element, { clearProps: 'y,rotation,transform' });
    });
    itemsRef.current = [];

    // Only animate headers that are actually on screen
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const it = (e.target as any).__floatItem as FloatingHeaderItem | undefined;
        if (it) it.visible = e.isIntersecting;
      });
    }, { rootMargin: '80px' });

    // Query all h1 and h2 elements on the current view
    const updateHeaders = () => {
      const headers = Array.from(document.querySelectorAll<HTMLElement>('h1, h2'));
      const newItems: FloatingHeaderItem[] = [];

      headers.forEach((el, index) => {
        const isH1 = el.tagName.toLowerCase() === 'h1';

        // Prepare element for smooth hardware-accelerated transform
        el.style.willChange = 'transform';
        el.style.transformOrigin = 'center center';
        
        // Ensure inline-block for proper transform rendering if not already set
        const computedDisplay = window.getComputedStyle(el).display;
        if (computedDisplay === 'inline') {
          el.style.display = 'inline-block';
        }

        // Calculate phase based on element position and index so they float in an organic liquid wave
        const rect = el.getBoundingClientRect();
        const spatialOffset = (rect.top + window.scrollY) * 0.0015;
        const phase = (index * 0.75) + spatialOffset;

        // Amplitudes: h1 has a slightly deeper liquid float; h2 has a subtle crest
        const amplitude = isH1 ? 4.0 : 2.5; // pixels
        const frequency = isH1 ? 1.35 : 1.65; // rad/s (approx 3.8s to 4.6s oscillation period)
        const rotAmplitude = isH1 ? 0.3 : 0.2; // degrees

        // GSAP quickSetters for high performance without style recalculation overhead
        const setY = gsap.quickSetter(el, 'y', 'px') as (val: number) => void;
        const setRotation = gsap.quickSetter(el, 'rotation', 'deg') as (val: number) => void;

        const item: FloatingHeaderItem = {
          element: el,
          isH1,
          phase,
          amplitude,
          frequency,
          rotAmplitude,
          setY,
          setRotation,
          visible: true,
        };
        newItems.push(item);
        io.observe(el);
        (el as any).__floatItem = item;

      });

      itemsRef.current = newItems;
    };

    // Initial query with slight delay to ensure dynamic route component DOM is mounted
    const timeoutId = setTimeout(updateHeaders, 60);

    // Continuous ticker callback executing the mathematical sine wave function
    const onTick = (time: number) => {
      const items = itemsRef.current;
      const len = items.length;
      for (let i = 0; i < len; i++) {
        const item = items[i];
        if (!item.visible) continue;

        // Sine wave function: y(t) = A * sin(ω * t + φ)
        const sineWave = Math.sin(time * item.frequency + item.phase);
        const yOffset = sineWave * item.amplitude;

        // Harmonic secondary sine wave for subtle liquid-metal tilt
        const rotWave = Math.sin(time * (item.frequency * 0.7) + item.phase + Math.PI / 3);
        const rotOffset = rotWave * item.rotAmplitude;

        item.setY(yOffset);
        item.setRotation(rotOffset);
      }
    };

    tickerFnRef.current = onTick;
    gsap.ticker.add(onTick);

    // Observe DOM mutations to pick up dynamically added/revealed headers (e.g. accordion expansions)
    const observer = new MutationObserver(() => {
      // Re-scan if header count changes
      const currentHeaders = document.querySelectorAll('h1, h2');
      if (currentHeaders.length !== itemsRef.current.length) {
        updateHeaders();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
      io.disconnect();
      if (tickerFnRef.current) {
        gsap.ticker.remove(tickerFnRef.current);
        tickerFnRef.current = null;
      }
      itemsRef.current.forEach(({ element }) => {
        gsap.killTweensOf(element);
        gsap.set(element, { clearProps: 'y,rotation,transform,textShadow' });
      });
      itemsRef.current = [];
    };
  }, [currentRoute]);

  return null;
};