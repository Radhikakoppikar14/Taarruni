import React, { useState, useEffect, useCallback } from 'react';
import { ArrowUp, Phone } from 'lucide-react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { LiquidChromeBackground } from './components/LiquidChromeBackground';
import { Background3D } from './components/Background3D';
import { SectionMotion } from './components/SectionMotion';
import { Preloader } from './components/Preloader';
import { TopBarAndNav } from './components/TopBarAndNav';
import { QuickContactModal } from './components/QuickContactModal';
import { LiquidFooter } from './components/LiquidFooter';
import { WhatsAppIcon } from './components/SocialIcons';
// Pages
import {
  HomePage,
  AboutUsPage,
  ServicesOverviewPage,
  MarketingSolutionsPage,
  ITSolutionsPage,
  BrandingPage,
  ContactPage,
} from './pages/LiquidPages';
import { CareersPage } from './pages/CareersPage';
import { RequestQuotePage } from './pages/RequestQuotePage';
import { PortfolioShaderTiles } from './components/PortfolioShaderTiles';
import { ClientsCylinder3D } from './components/ClientsCylinder3D';
import { TestimonialsCoverflow3D } from './components/TestimonialsCoverflow3D';
import { ProcessTimeline3D } from './components/ProcessTimeline3D';

export default function App() {
  const getInitialRoute = (): string => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    return hash || 'home';
  };

  const [currentRoute, setCurrentRoute] = useState<string>(getInitialRoute);
  const [quickContactOpen, setQuickContactOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  // Top-of-page reading progress bar
  const { scrollYProgress } = useScroll();
  const progressX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  // Sync route with URL hash for deep linking and back/forward browser history
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      setCurrentRoute(hash || 'home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavigate = useCallback((target: string) => {
    setCurrentRoute(target);
    window.location.hash = `#/${target}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    // Transparent + isolated so the fixed WebGL background (-z-10) shows through.
    <div className="min-h-screen flex flex-col text-[#f2f2f4] relative isolate">

      {/* Reading progress */}
      <motion.div className="scroll-progress" style={{ scaleX: progressX }} aria-hidden="true" />

      {/* Soft static colour orbs */}
      <div className="ambient-orbs" aria-hidden="true">
        <span className="ambient-orb ambient-orb--a" />
        <span className="ambient-orb ambient-orb--b" />
        <span className="ambient-orb ambient-orb--c" />
      </div>

      {/* Global film grain texture */}
      <div className="fixed inset-0 film-grain z-40 pointer-events-none" />

      {/* Fixed WebGL liquid chrome background (light, reduced cost) */}
      <LiquidChromeBackground />

      {/* Fixed 3D layer: floating shapes, rings & particles with mouse/scroll parallax */}
      <Background3D />

      {/* Scroll-reveal animation for every section on the current page */}
      <SectionMotion route={currentRoute} />

      {/* 4. Preloader (Assembles wireframe into hero, 0-100 counter) */}
      {!preloaderComplete && (
        <Preloader onComplete={() => setPreloaderComplete(true)} />
      )}

      {/* 5. Top Bar & Main Navigation Header */}
      <TopBarAndNav
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        onOpenQuickContact={() => setQuickContactOpen(true)}
      />

      {/* 6. Dynamic Hash-Routed Main Content */}
      <main className="flex-1 relative z-10">
       <div key={currentRoute} className="route-enter">
        {currentRoute === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenQuickContact={() => setQuickContactOpen(true)}
          />
        )}

        {currentRoute === 'about' && (
          <AboutUsPage
            onNavigate={handleNavigate}
            onOpenQuickContact={() => setQuickContactOpen(true)}
          />
        )}

        {currentRoute === 'services' && (
          <ServicesOverviewPage
            onNavigate={handleNavigate}
            onOpenQuickContact={() => setQuickContactOpen(true)}
          />
        )}

        {currentRoute === 'marketing' && (
          <MarketingSolutionsPage
            onNavigate={handleNavigate}
            onOpenQuickContact={() => setQuickContactOpen(true)}
          />
        )}

        {currentRoute === 'marketing/online' && (
          <MarketingSolutionsPage
            onNavigate={handleNavigate}
            onOpenQuickContact={() => setQuickContactOpen(true)}
            isOnlineSub={true}
          />
        )}

        {currentRoute === 'it' && (
          <ITSolutionsPage
            onNavigate={handleNavigate}
            onOpenQuickContact={() => setQuickContactOpen(true)}
          />
        )}

        {currentRoute === 'branding' && (
          <BrandingPage
            onNavigate={handleNavigate}
            onOpenQuickContact={() => setQuickContactOpen(true)}
          />
        )}

        {currentRoute === 'portfolio' && (
          <div className="py-2">
            <PortfolioShaderTiles />
          </div>
        )}

        {currentRoute === 'clients' && (
          <div className="py-2">
            <ClientsCylinder3D />
          </div>
        )}

        {currentRoute === 'testimonials' && (
          <div className="py-2">
            <TestimonialsCoverflow3D />
          </div>
        )}

        {currentRoute === 'process' && (
          <div className="py-2">
            <ProcessTimeline3D />
          </div>
        )}

        {currentRoute === 'careers' && (
          <CareersPage />
        )}

        {currentRoute === 'quote' && (
          <RequestQuotePage />
        )}

        {currentRoute === 'contact' && (
          <ContactPage />
        )}
       </div>
      </main>

      {/* 7. Liquid Chrome Footer */}
      <LiquidFooter onNavigate={handleNavigate} />

      {/* 8. Persistent Quick Contact Slide-Out Drawer */}
      <QuickContactModal
        isOpen={quickContactOpen}
        onClose={() => setQuickContactOpen(false)}
      />

      {/* 9. Floating WhatsApp Direct Connect & Back-to-Top Controls */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              key="scroll-top"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              onClick={scrollToTop}
              className="w-11 h-11 rounded-2xl bg-[#16181d] text-white hover:text-[#3ef0ff] shadow-xl border border-white/10 flex items-center justify-center cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Quick-contact phone button (sits just above WhatsApp) */}
        {preloaderComplete && (
          <motion.button
            key={`ph-${currentRoute}`}
            onClick={() => setQuickContactOpen(true)}
            aria-label="Quick contact"
            title="Quick contact"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut', delay: 0.05 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            style={{ color: '#0b1220' }}
            className="relative w-14 h-14 rounded-full bg-white hover:bg-[#f2fbff] border border-black/10 shadow-2xl flex items-center justify-center cursor-pointer transition-colors duration-300"
          >
            <Phone className="w-6 h-6" />
          </motion.button>
        )}

        {/* Icon-only WhatsApp button (light fade-in, no looping animation). */}
        {preloaderComplete && (
          <motion.a
            key={`wa-${currentRoute}`}
            href="https://api.whatsapp.com/send?phone=919880477344&text=Yes%20I%20am%20Interested"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            title="Chat with Taarruni Design Solutions on WhatsApp"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            style={{ color: '#0b1220' }}
            className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] shadow-2xl flex items-center justify-center cursor-pointer transition-colors duration-300"
          >
            <WhatsAppIcon className="w-7 h-7" />
          </motion.a>
        )}
      </div>

    </div>
  );
}