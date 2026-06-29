import React from 'react';
import { Train, Globe, Terminal } from 'lucide-react';

interface FooterProps {
  setView: (view: string) => void;
}

export default function Footer({ setView }: FooterProps) {
  const handleNavClick = (viewId: string) => {
    setView(viewId);
    window.location.hash = viewId === 'landing' ? '' : `#${viewId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full pt-16 pb-12 border-t border-white/5 bg-neutral-950 mt-auto relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Train className="w-6 h-6 text-indigo-400" />
            <span className="font-geist text-xl font-black text-neutral-100">
              ConfirmHoga
            </span>
          </div>
          <p className="text-sm text-neutral-400 leading-relaxed pr-4">
            The intelligence layer for the world's largest railway network. Built for travelers, powered by data science.
          </p>
          <span className="text-xs font-mono text-neutral-500 mt-2">
            © 2026 ConfirmHoga AI. All rights reserved.
          </span>
        </div>

        <div className="flex flex-col gap-3 font-mono text-sm">
          <h4 className="text-neutral-200 font-bold tracking-widest uppercase text-xs mb-1">
            Intelligence Engines
          </h4>
          <button onClick={() => handleNavClick('pnr')} className="text-left text-neutral-400 hover:text-indigo-400 transition-all">
            PNR Prediction
          </button>
          <button onClick={() => handleNavClick('jugaad')} className="text-left text-neutral-400 hover:text-indigo-400 transition-all">
            Jugaad Finder
          </button>
          <button onClick={() => handleNavClick('landing')} className="text-left text-neutral-400 hover:text-indigo-400 transition-all">
            Live Stream Monitor
          </button>
        </div>

        <div className="flex flex-col gap-3 font-mono text-sm">
          <h4 className="text-neutral-200 font-bold tracking-widest uppercase text-xs mb-1">
            Company
          </h4>
          <button onClick={() => handleNavClick('about')} className="text-left text-neutral-400 hover:text-indigo-400 transition-all">
            About Project
          </button>
          <button onClick={() => handleNavClick('about')} className="text-left text-neutral-400 hover:text-indigo-400 transition-all">
            Technical Specs
          </button>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-indigo-400 transition-all">
            GitHub Repository
          </a>
        </div>

        <div className="flex flex-col gap-3 font-mono text-sm">
          <h4 className="text-neutral-200 font-bold tracking-widest uppercase text-xs mb-1">
            Legal & Trust
          </h4>
          <span className="text-neutral-400">Privacy Policy</span>
          <span className="text-neutral-400">Terms of Service</span>
          <span className="text-xs text-neutral-500 mt-2 block leading-normal">
            *Disclaimer: Predictions represent statistical probability calculations and do not guarantee final seat charting outcomes.
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 pt-8 border-t border-white/5 flex justify-between items-center flex-wrap gap-4 text-neutral-500">
        <p className="text-xs font-mono">Build status: SECURE // Node 12-US // CloudRun-v2</p>
        <div className="flex gap-4">
          <Globe className="w-4 h-4 hover:text-indigo-400 cursor-pointer" />
          <Terminal className="w-4 h-4 hover:text-indigo-400 cursor-pointer" />
        </div>
      </div>
    </footer>
  );
}
