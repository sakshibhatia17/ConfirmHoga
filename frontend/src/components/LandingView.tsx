import React from 'react';
import { motion } from 'motion/react';
import { Brain, Route, Activity, ArrowRight, Eye, Sparkles } from 'lucide-react';
import ThreeTrain from './ThreeTrain.tsx';
import SystemLogTerminal from './SystemLogTerminal.tsx';

interface LandingViewProps {
  setView: (view: string) => void;
}

export default function LandingView({ setView }: LandingViewProps) {
  const handleNavClick = (viewId: string) => {
    setView(viewId);
    window.location.hash = `#${viewId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col gap-24 relative">
      {/* 1. Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 pt-4">
        {/* Left Side: Headline & description */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-7 flex flex-col items-start gap-6"
        >
          {/* Active status indicator badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-white/5 font-mono text-[10px] tracking-wider text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            LIVE INTELLIGENCE ENGINE V2.4 ACTIVE
          </div>

          <h1 className="font-geist text-5xl md:text-7xl font-extrabold text-neutral-100 tracking-tighter leading-[1.05]">
            Intelligence for the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500">
              Indian Rail
            </span>
          </h1>

          <p className="font-sans text-neutral-400 text-lg md:text-xl leading-relaxed max-w-xl">
            Predict PNR confirmation with 99% accuracy and find split-seat 'Jugaad' routes automatically. Stop guessing, start traveling with our live neural routing engine.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
            <button
              onClick={() => handleNavClick('pnr')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-mono text-sm font-bold rounded-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all flex items-center justify-center gap-3 active:scale-95 group duration-150"
            >
              <Brain className="w-4 h-4" />
              Analyze PNR
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => handleNavClick('jugaad')}
              className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-neutral-200 border border-white/10 hover:border-cyan-400/30 transition-all font-mono text-sm font-bold rounded-lg flex items-center justify-center gap-2 active:scale-95"
            >
              <Route className="w-4 h-4 text-cyan-400" />
              Find Jugaad Route
            </button>
          </div>
        </motion.div>

        {/* Right Side: Glowing Kinetic ThreeTrain */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-5 h-[350px] md:h-[450px] glass-panel rounded-2xl relative overflow-hidden"
        >
          <ThreeTrain />
        </motion.div>
      </section>

      {/* 2. Stats Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="w-full py-10 border-y border-white/5 border-dashed relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/5 divide-dashed">
          <div className="flex flex-col gap-2 py-4 md:py-0">
            <span className="font-geist text-5xl font-black text-neutral-100 tracking-tight">1M+</span>
            <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">Calculated Predictions</span>
          </div>
          <div className="flex flex-col gap-2 py-4 md:py-0">
            <span className="font-geist text-5xl font-black text-emerald-400 tracking-tight">99.1%</span>
            <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">Statistical Accuracy</span>
          </div>
          <div className="flex flex-col gap-2 py-4 md:py-0">
            <span className="font-geist text-5xl font-black text-cyan-400 tracking-tight">500K+</span>
            <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">Berths Found via Jugaad</span>
          </div>
        </div>
      </motion.section>

      {/* 3. Core Capabilities Bento Grid */}
      <section className="flex flex-col gap-8 relative z-10">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs text-indigo-400 uppercase tracking-widest flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            CORE CAPABILITIES
          </span>
          <h2 className="font-geist text-3xl md:text-4xl font-extrabold text-neutral-100 tracking-tight">
            Designed for travel security & absolute velocity
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Feature 1: AI PNR Prediction */}
          <div className="md:col-span-7 glass-panel rounded-2xl p-8 relative overflow-hidden group hover:border-indigo-500/30 transition-all flex flex-col justify-between min-h-[300px]">
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-600/5 rounded-full blur-[60px] group-hover:bg-indigo-600/10 transition-all"></div>
            
            <div className="flex flex-col gap-4 relative z-10">
              <div className="w-12 h-12 rounded-lg bg-indigo-950/50 border border-indigo-500/15 flex items-center justify-center text-indigo-400">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="font-geist text-2xl font-bold text-neutral-100">AI PNR Prediction</h3>
              <p className="text-neutral-400 font-sans text-sm leading-relaxed max-w-md">
                Our deep neural model analyzes up to 5 years of historical waitlist curves, booking velocities, holiday surges, and cancellation trends to compute your PNR confirmation rate with extreme statistical safety.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-neutral-500 text-xs font-mono">
              <span className="text-indigo-400 font-bold hover:underline cursor-pointer flex items-center gap-1" onClick={() => handleNavClick('pnr')}>
                Predict Your PNR <ArrowRight className="w-3.5 h-3.5" />
              </span>
              <span>NEURAL_v4.2</span>
            </div>
          </div>

          {/* Feature 2: Smart Jugaad Route Finder */}
          <div className="md:col-span-5 glass-panel rounded-2xl p-8 relative overflow-hidden group hover:border-cyan-500/30 transition-all flex flex-col justify-between min-h-[300px]">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-[60px] group-hover:bg-cyan-500/10 transition-all"></div>

            <div className="flex flex-col gap-4 relative z-10">
              <div className="w-12 h-12 rounded-lg bg-cyan-950/50 border border-cyan-500/15 flex items-center justify-center text-cyan-400">
                <Route className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2">
                <h3 className="font-geist text-2xl font-bold text-neutral-100">Jugaad Finder</h3>
                <span className="px-2 py-0.5 rounded bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 font-mono text-[9px] font-bold">BETA</span>
              </div>
              <p className="text-neutral-400 font-sans text-sm leading-relaxed">
                Can't get a direct confirmed ticket? Our smart routing engine automatically maps split seat combinations on the same train or connection routes to bypass waitlist choke points.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-neutral-500 text-xs font-mono">
              <span className="text-cyan-400 font-bold hover:underline cursor-pointer flex items-center gap-1" onClick={() => handleNavClick('jugaad')}>
                Search Split Seats <ArrowRight className="w-3.5 h-3.5" />
              </span>
              <span>MULTI_PERMUTATION_MATRIX</span>
            </div>
          </div>

          {/* Feature 3: Live Seat Monitor */}
          <div className="md:col-span-12 glass-panel rounded-2xl p-8 relative overflow-hidden group hover:border-emerald-500/30 transition-all flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="flex-1 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-950/50 border border-emerald-500/15 flex items-center justify-center text-emerald-400">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="font-geist text-2xl font-bold text-neutral-100">Live Scraper Monitor</h3>
              <p className="text-neutral-400 font-sans text-sm leading-relaxed max-w-xl">
                Real-time monitoring across all available quotas (General, Tatkal, Ladies, Lower Berth). Set active filters and get notified instantly the second a vacant berth is cataloged before charting.
              </p>
              <div className="flex gap-2 flex-wrap mt-2">
                <span className="px-3 py-1 rounded bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 font-mono text-[10px]">REAL-TIME SYNC</span>
                <span className="px-3 py-1 rounded bg-neutral-900 border border-white/5 text-neutral-400 font-mono text-[10px]">LATENCY &lt; 850MS</span>
                <span className="px-3 py-1 rounded bg-neutral-900 border border-white/5 text-neutral-400 font-mono text-[10px]">CLOUD COUPLING</span>
              </div>
            </div>

            <div className="flex-1 w-full grid grid-cols-4 sm:grid-cols-6 gap-2 opacity-60">
              <div className="h-14 bg-neutral-900 border border-white/5 rounded flex items-center justify-center font-mono text-neutral-500 text-[10px]">COACH_S1</div>
              <div className="h-14 bg-neutral-900 border border-white/5 rounded flex items-center justify-center font-mono text-neutral-500 text-[10px]">COACH_S2</div>
              <div className="h-14 bg-emerald-500/10 border border-emerald-500/20 rounded flex flex-col items-center justify-center font-mono text-emerald-400 text-[10px]">
                <span className="font-bold">B3_S24</span>
                <span>CONFIRMED</span>
              </div>
              <div className="h-14 bg-neutral-900 border border-white/5 rounded flex items-center justify-center font-mono text-neutral-500 text-[10px]">COACH_S3</div>
              <div className="h-14 bg-neutral-900 border border-white/5 rounded flex items-center justify-center font-mono text-neutral-500 text-[10px]">COACH_S4</div>
              <div className="h-14 bg-emerald-500/10 border border-emerald-500/20 rounded flex flex-col items-center justify-center font-mono text-emerald-400 text-[10px]">
                <span className="font-bold">B1_S52</span>
                <span>CONFIRMED</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Rolling Logs Section */}
      <section className="relative z-10 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            TELEMETRY & SERVER PIPELINE
          </span>
          <h2 className="font-geist text-2xl font-bold text-neutral-100 tracking-tight">
            Live execution stack logs
          </h2>
        </div>
        <SystemLogTerminal />
      </section>
    </div>
  );
}
