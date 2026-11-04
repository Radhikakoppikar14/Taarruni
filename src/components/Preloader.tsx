import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(onComplete, 350);
          }, 80);
          return 100;
        }
        const step = Math.floor(Math.random() * 12) + 8;
        return Math.min(prev + step, 100);
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0c0d10] text-[#f2f2f4]"
        >
          {/* Wireframe Rotating Geometric Shard */}
          <div className="relative w-40 h-40 mb-8 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-dashed border-[#3ef0ff]/40" />
            <div className="absolute inset-4 rounded-full border border-[#ff2e88]/40" />
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#3ef0ff] via-[#ff2e88] to-[#ffd36b] opacity-80 blur-md" />
            <div className="absolute font-display text-2xl font-bold tracking-tight">
              {progress}%
            </div>
          </div>

          <div className="text-center space-y-2">
            <div className="font-display text-sm tracking-[0.25em] uppercase text-white/90">
              Taarruni Design Solutions
            </div>
            <div className="text-xs text-[#9a9ca8] tracking-widest uppercase">
              Taarruni Design Solutions
            </div>
          </div>

          {/* Progress Bar with Iridescent Gradient */}
          <div className="w-64 h-1 bg-white/10 rounded-full mt-8 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#3ef0ff] via-[#ff2e88] to-[#ffd36b]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};