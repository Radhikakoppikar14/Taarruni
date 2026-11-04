import React, { createContext, useContext, useLayoutEffect, useMemo } from 'react';

/* =========================================================================
   THEME CONTEXT  -  LIGHT ONLY
   The site now ships a single light theme. This provider keeps the same API
   (useTheme, isDark, toggleTheme ...) so existing components keep working,
   but the theme never changes. It simply stamps the light tokens on <html>.
========================================================================= */

export type Theme = 'light';

export interface ThemeOrigin {
  x: number;
  y: number;
}

interface ThemeContextValue {
  theme: Theme;
  isDark: false;
  isSwitching: false;
  setTheme: (next: string, origin?: ThemeOrigin) => void;
  toggleTheme: (origin?: ThemeOrigin) => void;
}

export const THEME_TOKENS: Record<Theme, Record<string, string>> = {
  light: {
    '--bg-graphite': '#f5f7fb',
    '--bg-surface': '#ffffff',
    '--bg-surface-elevated': '#f0f3f9',
    '--text-soft': '#1b2437',
    '--text-strong': '#0b1220',
    '--text-muted': '#566079',
    '--accent-cyan': '#0fb5d4',
    '--accent-magenta': '#e11d74',
    '--accent-gold': '#e8a317',
    '--accent-cyan-ink': '#0b7c97',
    '--accent-magenta-ink': '#c4145f',
    '--accent-gold-ink': '#9a5f00',
    '--fg-rgb': '15 23 42',
    '--glass': 'rgba(255, 255, 255, 0.9)',
    '--glass-nav': 'rgba(255, 255, 255, 0.85)',
    '--scroll-track': '#e8edf6',
    '--scroll-thumb': '#b9c4da',
    '--card-shadow': '0 10px 30px -18px rgba(30, 50, 100, 0.25)',
    '--outline-stroke': 'rgba(27, 36, 55, 0.45)',
  },
};

const applyLight = () => {
  const root = document.documentElement;
  root.dataset.theme = 'light';
  root.classList.remove('dark');
  root.classList.add('light');
  root.style.colorScheme = 'light';

  const tokens = THEME_TOKENS.light;
  for (const key in tokens) root.style.setProperty(key, tokens[key]);

  let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'theme-color';
    document.head.appendChild(meta);
  }
  meta.content = '#f5f7fb';
};

const noop = () => undefined;

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Apply before first paint so there is never a flash of another theme.
  useLayoutEffect(() => {
    applyLight();
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme: 'light', isDark: false, isSwitching: false, setTheme: noop, toggleTheme: noop }),
    [],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
};