import React, { useState } from 'react';
import { Train, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  setView: (view: string) => void;
}

export default function Navbar({ currentView, setView }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'landing', label: 'Home' },
    { id: 'pnr', label: 'PNR Prediction' },
    { id: 'jugaad', label: 'Jugaad Finder' },
    { id: 'about', label: 'About' },
  ];

  const handleNavClick = (viewId: string) => {
    setView(viewId);
    setMobileMenuOpen(false);
    window.location.hash = viewId === 'landing' ? '' : `#${viewId}`;
  };

  return (
    <nav className="sticky top-0 w-full z-50 bg-neutral-950/75 backdrop-blur-xl border-b border-white/5 h-20 transition-all duration-300">
      <div className="flex justify-between items-center w-full px-6 md:px-12 max-w-7xl mx-auto h-full">
        {/* Brand */}
        <div 
          onClick={() => handleNavClick('landing')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-lg bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-all">
            <Train className="w-5 h-5" />
          </div>
          <span className="font-geist text-2xl font-bold text-neutral-100 tracking-tight group-hover:text-cyan-400 transition-colors">
            ConfirmHoga <span className="text-indigo-400 font-medium text-lg">AI</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 font-mono text-sm">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`pb-1 transition-all relative ${
                currentView === item.id
                  ? 'text-indigo-300 font-bold border-b-2 border-indigo-400'
                  : 'text-neutral-400 hover:text-cyan-400'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Trailing Action */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={() => handleNavClick('pnr')}
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-mono text-sm rounded-lg hover:shadow-[0_0_20px_rgba(109,40,217,0.4)] transition-all flex items-center gap-2 border border-white/5 active:scale-95 duration-150"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-neutral-400 hover:text-cyan-400 transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-neutral-950 border-b border-white/5 p-6 flex flex-col gap-4 font-mono text-sm animate-fade-in z-40">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`py-3 text-left pl-3 rounded-lg transition-all ${
                currentView === item.id
                  ? 'bg-indigo-600/10 text-indigo-300 font-bold border-l-2 border-indigo-400'
                  : 'text-neutral-400 hover:text-cyan-400 hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => handleNavClick('pnr')}
            className="w-full mt-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-center rounded-lg font-bold flex items-center justify-center gap-2"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </nav>
  );
}
