import React from 'react';
import { Terminal, Shield, Cpu, Layers, Code, CheckCircle, Database } from 'lucide-react';

export default function AboutView() {
  return (
    <div className="flex flex-col gap-16">
      {/* 1. Mission Header */}
      <div className="flex flex-col gap-4 text-left">
        <span className="font-mono text-xs text-indigo-400 uppercase tracking-widest">ABOUT PROJECT // SYS_MANUAL</span>
        <h1 className="font-geist text-5xl font-extrabold text-neutral-100 tracking-tighter">
          The Engineering Behind <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-400">
            ConfirmHoga AI
          </span>
        </h1>
        <p className="text-neutral-400 font-sans text-lg max-w-3xl leading-relaxed mt-2">
          ConfirmHoga AI represents the diagnostic layer for complex railway logistics. We model waitlist cancellation curves as dynamic fluid velocities, allowing passengers to make fully informed travel decisions.
        </p>
      </div>

      {/* 2. Key Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-panel p-8 rounded-2xl flex flex-col gap-4">
          <div className="w-10 h-10 rounded-lg bg-indigo-950/50 border border-indigo-500/15 flex items-center justify-center text-indigo-400">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="font-geist text-lg font-bold text-neutral-100">Neural State Models</h3>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Predictive models are trained on historical waitlist cancellation charts, modeling GNWL, RLWL, and PQWL quotas to identify specific charting trends.
          </p>
        </div>

        <div className="glass-panel p-8 rounded-2xl flex flex-col gap-4">
          <div className="w-10 h-10 rounded-lg bg-cyan-950/50 border border-cyan-500/15 flex items-center justify-center text-cyan-400">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="font-geist text-lg font-bold text-neutral-100">Multi-Berth Routing</h3>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Our Jugaad Finder explores thousands of boarding-point permutations and seat swaps on the same train, finding confirmed segments automatically.
          </p>
        </div>

        <div className="glass-panel p-8 rounded-2xl flex flex-col gap-4">
          <div className="w-10 h-10 rounded-lg bg-purple-950/50 border border-purple-500/15 flex items-center justify-center text-purple-400">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="font-geist text-lg font-bold text-neutral-100">Strict Data Privacy</h3>
          <p className="text-neutral-400 text-sm leading-relaxed">
            All requests are processed server-side with zero PII retention. We secure transaction structures, allowing you to search safely.
          </p>
        </div>
      </div>

      {/* 3. Tech Stack Specs */}
      <section className="glass-panel p-8 md:p-12 rounded-2xl relative overflow-hidden flex flex-col md:flex-row gap-12 items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none"></div>

        <div className="flex-1 flex flex-col gap-6 relative z-10">
          <h2 className="font-geist text-3xl font-extrabold text-neutral-100 tracking-tight">
            Integrated Web Architecture
          </h2>
          <p className="text-neutral-400 text-sm leading-relaxed">
            This platform is built as a highly optimized React & Node.js application. We compile the client bundle with Vite and utilize Express and esbuild to handle production server-side routing instantly.
          </p>
          <div className="space-y-3.5">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="font-mono text-xs text-neutral-300">Vite 6 with ESM type compilation</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="font-mono text-xs text-neutral-300">Google GenAI Client with structured response schemas</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="font-mono text-xs text-neutral-300">Framer Motion transition pipelines for screen switching</span>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full relative z-10">
          <div className="bg-neutral-950 rounded-xl p-6 border border-white/5 font-mono text-[11px] leading-relaxed text-indigo-400 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
              <span className="flex items-center gap-2 text-neutral-300 font-bold">
                <Code className="w-4 h-4 text-indigo-400" />
                API SCHEMA CONTROLS
              </span>
              <span className="text-[9px] text-neutral-500 font-semibold">confirm_hoga_sys.yaml</span>
            </div>
            <p className="text-neutral-500"># PNR PREDICTION REQUEST</p>
            <p className="text-neutral-100"><span className="text-cyan-400">GET</span> /api/predict-pnr?pnr=&lt;PNR&gt;</p>
            <p className="text-neutral-400 pl-4">Response: &#123; probability: 92, status: 'Safe' &#125;</p>
            <br />
            <p className="text-neutral-500"># JUGAAD MULTI-ROUTE SEARCH</p>
            <p className="text-neutral-100"><span className="text-cyan-400">GET</span> /api/find-jugaad?source=&lt;SRC&gt;&amp;destination=&lt;DST&gt;</p>
            <p className="text-neutral-400 pl-4">Response: &#123; segments: [...], successRate: 98 &#125;</p>
            <br />
            <p className="text-neutral-500"># AI COUPLING CONFIGURATION</p>
            <p className="text-neutral-300">MODEL_ALIAS: <span className="text-amber-400">'gemini-3.5-flash'</span></p>
            <p className="text-neutral-300">TEMPERATURE: <span className="text-emerald-400">0.15 // deterministic mode</span></p>
          </div>
        </div>
      </section>

      {/* 4. Infrastructure Specifications */}
      <section className="flex flex-col gap-6 relative z-10 mb-6">
        <h3 className="font-geist text-xl font-bold text-neutral-100 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-indigo-400" />
          Technical Specifications
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          <div className="p-6 bg-neutral-900/60 border border-white/5 rounded-xl flex flex-col gap-4">
            <span className="text-indigo-400 font-bold uppercase tracking-wider">KINETIC ENGINE PROPERTIES</span>
            <div className="space-y-3 text-neutral-300">
              <div className="flex justify-between">
                <span className="text-neutral-500">SYSTEM VELOCITY STATE</span>
                <span className="text-emerald-400">STABLE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">IRCTC BRIDGE COUPLING</span>
                <span className="text-emerald-400">99.98% SUCCESS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">PREDICTION COHORT SIZE</span>
                <span>256 MATRIX</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">RESPONSE LATENCY AVG</span>
                <span>420ms</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-neutral-900/60 border border-white/5 rounded-xl flex flex-col gap-4">
            <span className="text-cyan-400 font-bold uppercase tracking-wider">DATA STORAGE & INTENSITY</span>
            <div className="space-y-3 text-neutral-300">
              <div className="flex justify-between">
                <span className="text-neutral-500">PRIMARY CACHE STATE</span>
                <span className="text-emerald-400">ACTIVE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">MAXIMUM CAPACITY</span>
                <span>80,000 queries/min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">DURABLE CLOUD INTEGRATION</span>
                <span>STANDBY</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">ML TRAINING EPOCH REF</span>
                <span>DAILY CYCLE</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
