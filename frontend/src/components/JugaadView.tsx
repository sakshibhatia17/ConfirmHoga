import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { JugaadResult, SuccessLog } from '../types.ts';
import { Search, Route, Sparkles, RefreshCw, AlertTriangle, Coins, CheckCircle, Navigation, Users } from 'lucide-react';
import StationSearch from './StationSearch.tsx';
import { JugaadResultSkeleton } from './Skeleton.tsx';

const RECENT_SUCCESS_LOGS: SuccessLog[] = [
  { id: "1", user: "Rahul M.", route: "ADI → NDLS via JP", time: "Just now" },
  { id: "2", user: "Sneha K.", route: "NDLS → BCT via BRC", time: "5m ago" },
  { id: "3", user: "Amit S.", route: "MAS → SBC via JTJ", time: "12m ago" },
  { id: "4", user: "Priya V.", route: "PNBE → NDLS via DDU", time: "19m ago" }
];

export default function JugaadView() {
  const [source, setSource] = useState('NDLS');
  const [destination, setDestination] = useState('BCT');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<JugaadResult | null>(null);
  const [logs, setLogs] = useState<SuccessLog[]>(RECENT_SUCCESS_LOGS);
  const [swapRotation, setSwapRotation] = useState(0);

  // Initialize with ADI -> NDLS default mock to render timeline instantly
  useEffect(() => {
    setResult({
      trainName: "Mumbai Rajdhani",
      trainNumber: "12952",
      totalDuration: "15h 40m",
      successRate: 92,
      segments: [
        {
          id: "1",
          from: "NDLS",
          to: "AGC",
          trainName: "Shatabdi Express",
          trainNumber: "12002",
          classType: "CC",
          coach: "C4",
          seat: "23",
          status: "Confirmed",
          statusLabel: "Confirmed"
        },
        {
          id: "2",
          from: "AGC",
          to: "BRC",
          trainName: "Mumbai Rajdhani",
          trainNumber: "12952",
          classType: "3A",
          coach: "B2",
          seat: "45",
          status: "RAC",
          statusLabel: "RAC 12"
        },
        {
          id: "3",
          from: "BRC",
          to: "BCT",
          trainName: "Mumbai Rajdhani",
          trainNumber: "12952",
          classType: "3A",
          coach: "B2",
          seat: "12",
          status: "Confirmed",
          statusLabel: "Confirmed"
        }
      ],
      aiStrategy: "Direct trains are heavily waitlisted (WL 150+). By splitting at AGC and BRC, you secure a confirmed seat for 70% of the journey and a high-probability RAC for the middle leg. This route is highly recommended since BRC serves as a major quota refresh point for this train, meaning vacant seats are systematically cataloged here.",
      savings: "Saves ₹420 vs Dynamic Premium Pricing",
      warnings: [
        "Requires platform change at Agra Cantt (AGC). Keep 45 mins buffer.",
        "Requires changing seats (Seat 45 to 12) inside coach B2 at Vadodara."
      ]
    });
  }, []);

  const handleSearch = async () => {
    if (!source || !destination) {
      setError("Please specify both Source and Destination stations.");
      return;
    }
    if (source === destination) {
      setError("Source and Destination cannot be the same station.");
      return;
    }
    setError(null);
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(
`http://127.0.0.1:8000/api/find-jugaad?source=${source}&destination=${destination}`
) 
     if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to search Jugaad routes.");
      }
      const data: JugaadResult = await response.json();
      setResult(data);

      // Add dynamic success log
      const newLog: SuccessLog = {
        id: String(Date.now()),
        user: "You",
        route: `${source.toUpperCase()} → ${destination.toUpperCase()} optimized`,
        time: "Just now"
      };
      setLogs((prev) => [newLog, ...prev.slice(0, 3)]);
    } catch (e: any) {
      setError(e.message || "An error occurred connecting to the Jugaad routing system.");
    } finally {
      setLoading(false);
    }
  };

  const swapStations = () => {
    const temp = source;
    setSource(destination);
    setDestination(temp);
    setSwapRotation((prev) => prev + 180);
  };

  return (
    <div className="flex flex-col gap-12">
      {/* 1. Header description */}
      <div className="flex flex-col gap-2">
        <h1 className="font-geist text-5xl font-extrabold text-neutral-100 tracking-tighter">
          Find Split Seats <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Smartly</span>
        </h1>
        <p className="text-neutral-400 font-sans text-lg max-w-2xl leading-relaxed">
          Discover hidden seat availability by utilizing automatic boarding-point splitting. Stay on the same train or utilize optimal connections.
        </p>
      </div>

      {/* 2. Interactive Route Search form */}
      <section className="glass-panel p-6 sm:p-8 rounded-2xl relative overflow-hidden shadow-2xl" aria-label="Route search form">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none"></div>
        <div className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto] gap-4 sm:gap-6 items-end">
            {/* Source */}
            <StationSearch
              id="jugaad-source"
              label="Source Station"
              value={source}
              onChange={setSource}
              placeholder="Search source station..."
              disabledCode={destination}
            />

            {/* Swap Button */}
            <motion.button
              onClick={swapStations}
              animate={{ rotate: swapRotation }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center h-12 w-12 rounded-full bg-neutral-900 hover:bg-neutral-800 cursor-pointer transition-colors border border-white/5 self-center mx-auto"
              aria-label="Swap source and destination stations"
              type="button"
            >
              <RefreshCw className="w-4 h-4 text-indigo-400" />
            </motion.button>

            {/* Destination */}
            <StationSearch
              id="jugaad-destination"
              label="Destination Station"
              value={destination}
              onChange={setDestination}
              placeholder="Search destination station..."
              disabledCode={source}
            />

            {/* Submit Button */}
            <button 
              onClick={handleSearch}
              disabled={loading}
              className="px-8 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:shadow-[0_0_15px_rgba(160,95,207,0.4)] text-white font-mono text-sm font-bold rounded-lg transition-all h-[46px] flex items-center justify-center gap-2 group active:scale-95 duration-150 disabled:opacity-50"
              aria-label="Search for split seat routes"
              type="button"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  MAPPING...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Find Seats
                </>
              )}
            </button>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="mt-4 p-3.5 rounded-lg bg-rose-500/10 border border-rose-500/25 text-rose-400 text-xs font-mono"
                role="alert"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 3. Loading Skeleton */}
      <AnimatePresence mode="wait">
        {loading && <JugaadResultSkeleton />}
      </AnimatePresence>

      {/* 4. Result Dashboard */}
      <AnimatePresence>
        {!loading && result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Alternate Journey Timeline (Left) */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              <h2 className="font-geist text-2xl md:text-3xl font-extrabold text-neutral-100 flex items-center gap-3">
                <Route className="w-6 h-6 text-indigo-400" />
                Suggested Route Timeline
              </h2>

              {/* Timeline Nodes */}
              <div className="relative pl-8 before:content-[''] before:absolute before:left-3 before:top-4 before:bottom-4 before:w-0.5 before:bg-white/5">
                <AnimatePresence mode="popLayout">
                  {result.segments.map((seg, idx) => (
                    <motion.div 
                      key={seg.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.15 }}
                      className="relative mb-12 last:mb-0"
                    >
                      {/* Glowing Node Dot */}
                      <div className={`absolute -left-[37px] top-4 w-4 h-4 rounded-full bg-neutral-950 border-2 z-10 ${
                        idx === 0 ? "border-indigo-400 pulse-dot" : "border-cyan-400"
                      }`}></div>

                      {/* Glass segment card */}
                      <div className="glass-panel rounded-xl p-4 sm:p-6 hover:border-indigo-500/20 transition-all group flex flex-col gap-4 sm:gap-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                          <Route className="w-16 h-16 text-neutral-300" />
                        </div>

                        <div className="flex justify-between items-start flex-wrap gap-4">
                          <div>
                            <h3 className="font-geist text-xl sm:text-2xl font-bold text-neutral-100 flex items-center gap-3">
                              {seg.from} <span className="text-neutral-500 font-normal">→</span> {seg.to}
                            </h3>
                            <p className="text-neutral-400 text-xs mt-1">
                              Segment {idx + 1}: Confirmed berth block
                            </p>
                          </div>

                          <span className={`font-mono text-xs px-3 py-1 rounded-full border ${
                            seg.status === 'Confirmed' 
                              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                              : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                          }`}>
                            {seg.statusLabel}
                          </span>
                        </div>

                        {/* Meta stats inside segment */}
                        <div className="flex flex-wrap gap-4 sm:gap-6 items-center text-sm">
                          <div className="flex flex-col">
                            <span className="font-mono text-[10px] text-neutral-500 uppercase">Train</span>
                            <span className="font-bold text-neutral-200 mt-1">{seg.trainNumber} - {seg.trainName}</span>
                          </div>
                          <div className="h-8 w-px bg-white/5 hidden sm:block"></div>
                          <div className="flex flex-col">
                            <span className="font-mono text-[10px] text-neutral-500 uppercase">Class</span>
                            <span className="text-neutral-200 mt-1">{seg.classType}</span>
                          </div>
                          <div className="h-8 w-px bg-white/5 hidden sm:block"></div>
                          <div className="flex flex-col">
                            <span className="font-mono text-[10px] text-neutral-500 uppercase">Coach & Berth</span>
                            <span className="font-bold text-indigo-400 mt-1">{seg.coach} / Seat {seg.seat}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* AI Strategy Panel (Right Column) */}
            <aside className="lg:col-span-4 flex flex-col gap-6">
              <div className="glass-panel p-6 rounded-xl border-cyan-400/20 bg-indigo-950/10 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/5 rounded-full blur-[80px]"></div>

                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
                  <h3 className="font-geist text-xl font-bold text-neutral-100">AI Strategy</h3>
                </div>

                <div className="flex flex-col gap-6">
                  <p className="text-neutral-300 text-sm leading-relaxed font-sans">
                    {result.aiStrategy}
                  </p>

                  {/* Progress bar of Success Rate */}
                  <div className="p-4 rounded-xl bg-neutral-900 border border-white/5">
                    <div className="flex justify-between items-center mb-2 font-mono text-xs">
                      <span className="text-neutral-400 uppercase">Route Reliability</span>
                      <span className="text-cyan-400 font-bold">{result.successRate}%</span>
                    </div>
                    <div className="w-full bg-neutral-950 rounded-full h-2 overflow-hidden">
                      <motion.div 
                        className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${result.successRate}%` }}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  {/* Dynamic details */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm text-neutral-300">
                      <Coins className="w-4 h-4 text-emerald-400" />
                      <span>{result.savings}</span>
                    </div>
                    
                    {result.warnings.map((warn, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm text-neutral-400">
                        <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span className="leading-relaxed">{warn}</span>
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-6 py-4 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:shadow-[0_0_20px_rgba(109,40,217,0.4)] text-white font-mono text-sm font-bold uppercase rounded-lg transition-all flex items-center justify-center gap-2" type="button">
                    <Navigation className="w-4 h-4" />
                    Lock & Book Split Seats
                  </button>
                </div>
              </div>

              {/* Success Ticker logs */}
              <div className="glass-panel p-6 rounded-xl">
                <h4 className="font-geist text-sm font-bold text-neutral-200 flex items-center gap-2 mb-4 border-b border-white/5 pb-3">
                  <Users className="w-4 h-4 text-indigo-400" />
                  Recent Jugaad Success
                </h4>
                <div className="space-y-4">
                  {logs.map((log) => (
                    <div key={log.id} className="flex justify-between items-center py-1 border-b border-white/5 last:border-0">
                      <div className="flex flex-col">
                        <span className="font-sans text-xs font-bold text-neutral-200">{log.user}</span>
                        <span className="font-mono text-[10px] text-neutral-400 mt-0.5">{log.route}</span>
                      </div>
                      <span className="font-mono text-[10px] text-indigo-400">{log.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
