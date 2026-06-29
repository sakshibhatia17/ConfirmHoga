import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import LandingView from './components/LandingView.tsx';
import PnrView from './components/PnrView.tsx';
import JugaadView from './components/JugaadView.tsx';
import AboutView from './components/AboutView.tsx';
import { ToastProvider } from './components/Toast.tsx';

export default function App() {
  const [view, setView] = useState('landing');

  // Listen to browser hash changes for seamless deep linking in the iframe
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['landing', 'pnr', 'jugaad', 'about'].includes(hash)) {
        setView(hash);
      } else if (!hash) {
        setView('landing');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial check on mount
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderViewContent = () => {
    switch (view) {
      case 'landing':
        return <LandingView setView={setView} />;
      case 'pnr':
        return <PnrView />;
      case 'jugaad':
        return <JugaadView />;
      case 'about':
        return <AboutView />;
      default:
        return <LandingView setView={setView} />;
    }
  };

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col relative select-none selection:bg-indigo-500/35 selection:text-white">
        {/* 1. Global Cyber-Grid Backgrounds */}
        <div className="grid-bg"></div>
        <div className="ambient-mesh"></div>

        {/* 2. Top Navigation */}
        <Navbar currentView={view} setView={setView} />

        {/* 3. Main Screen Stage */}
        <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-12 py-8 sm:py-12 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {renderViewContent()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* 4. Footer */}
        <Footer setView={setView} />
      </div>
    </ToastProvider>
  );
}

