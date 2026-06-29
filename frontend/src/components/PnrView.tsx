import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'motion/react';
import { PnrResult } from '../types.ts';
import {
  Sparkles,
  Train,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  RefreshCw,
  Calendar,
  Users,
  PartyPopper,
  Clock,
  Trash2,
  History,
  Zap,
  Database,
  Brain,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';

// ─── Prediction History Types ────────────────────────────────────────────────
interface PredictionHistoryEntry {
  id: string;
  pnr: string;
  probability: number;
  status: string;
  statusColor: string;
  daysLeft: string;
  wlPosition: string;
  festival: boolean;
  timestamp: number;
}

const HISTORY_KEY = 'confirmhoga_pnr_history';
const MAX_HISTORY = 10;

function loadHistory(): PredictionHistoryEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveHistory(entries: PredictionHistoryEntry[]) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(entries.slice(0, MAX_HISTORY)));
}

// ─── Loading Step Sequence ───────────────────────────────────────────────────
const LOADING_STEPS = [
  { icon: Database, text: 'Reading Railway Database...', color: 'text-cyan-400' },
  { icon: Brain, text: 'Running ML Model...', color: 'text-indigo-400' },
  { icon: TrendingUp, text: 'Checking Historical Trends...', color: 'text-purple-400' },
  { icon: ShieldCheck, text: 'Generating Prediction...', color: 'text-emerald-400' },
];

// ─── Animated Count-Up Number ────────────────────────────────────────────────
function AnimatedCounter({ value, duration = 1.8 }: { value: number; duration?: number }) {
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(motionVal, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    const unsub = rounded.on('change', (v) => setDisplay(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [value, duration, motionVal, rounded]);

  return <>{display}</>;
}

// ─── SVG Gauge with Glow ─────────────────────────────────────────────────────
const GAUGE_RADIUS = 80;
const GAUGE_CIRCUMFERENCE = GAUGE_RADIUS * 2 * Math.PI;
const GAUGE_SIZE = 220;
const GAUGE_CENTER = GAUGE_SIZE / 2;

function ProbabilityGauge({
  probability,
  status,
  statusColor,
}: {
  probability: number;
  status: string;
  statusColor: string;
}) {
  const strokeColor =
    statusColor === 'emerald'
      ? { main: '#34d399', glow: 'rgba(52,211,153,0.35)' }
      : statusColor === 'amber'
      ? { main: '#fbbf24', glow: 'rgba(251,191,36,0.35)' }
      : { main: '#f43f5e', glow: 'rgba(244,63,94,0.35)' };

  const trackGradientId = `gauge-track-${statusColor}`;
  const glowFilterId = `gauge-glow-${statusColor}`;
  const offset = GAUGE_CIRCUMFERENCE - (probability / 100) * GAUGE_CIRCUMFERENCE;

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer ambient glow ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: GAUGE_SIZE + 40,
          height: GAUGE_SIZE + 40,
          background: `radial-gradient(circle, ${strokeColor.glow} 0%, transparent 70%)`,
          filter: 'blur(20px)',
        }}
      />

      <svg
        width={GAUGE_SIZE}
        height={GAUGE_SIZE}
        className="transform -rotate-90"
        role="img"
        aria-label={`Confirmation probability: ${probability}%`}
      >
        <defs>
          <linearGradient id={trackGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={strokeColor.main} stopOpacity="1" />
            <stop offset="100%" stopColor={strokeColor.main} stopOpacity="0.4" />
          </linearGradient>
          <filter id={glowFilterId}>
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background track */}
        <circle
          cx={GAUGE_CENTER}
          cy={GAUGE_CENTER}
          r={GAUGE_RADIUS}
          fill="transparent"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="10"
        />

        {/* Tick marks */}
        {Array.from({ length: 40 }).map((_, i) => {
          const angle = (i / 40) * 360;
          const rad = (angle * Math.PI) / 180;
          const r1 = GAUGE_RADIUS - 16;
          const r2 = GAUGE_RADIUS - (i % 5 === 0 ? 12 : 14);
          return (
            <line
              key={i}
              x1={GAUGE_CENTER + r1 * Math.cos(rad)}
              y1={GAUGE_CENTER + r1 * Math.sin(rad)}
              x2={GAUGE_CENTER + r2 * Math.cos(rad)}
              y2={GAUGE_CENTER + r2 * Math.sin(rad)}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth={i % 5 === 0 ? 1.5 : 0.5}
            />
          );
        })}

        {/* Progress arc */}
        <motion.circle
          cx={GAUGE_CENTER}
          cy={GAUGE_CENTER}
          r={GAUGE_RADIUS}
          fill="transparent"
          stroke={`url(#${trackGradientId})`}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={GAUGE_CIRCUMFERENCE}
          initial={{ strokeDashoffset: GAUGE_CIRCUMFERENCE }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          filter={`url(#${glowFilterId})`}
        />
      </svg>

      {/* Center text */}
      <div className="absolute flex flex-col items-center">
        <span className="font-geist text-[3.2rem] leading-none font-extrabold text-neutral-100 tabular-nums">
          <AnimatedCounter value={probability} />
          <span className="text-3xl text-neutral-400 font-bold">%</span>
        </span>
        <span className="font-mono text-[10px] text-neutral-500 mt-2 uppercase tracking-[0.2em]">
          CONFIRM CHANCE
        </span>
      </div>
    </div>
  );
}

// ─── Sequenced Loading Overlay ───────────────────────────────────────────────
function PredictionLoadingSequence() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    LOADING_STEPS.forEach((_, idx) => {
      if (idx > 0) {
        timers.push(setTimeout(() => setActiveStep(idx), idx * 900));
      }
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-6"
      role="status"
      aria-label="Generating prediction"
    >
      {/* Pulsing orb */}
      <div className="glass-panel p-10 rounded-2xl flex flex-col items-center justify-center text-center min-h-[380px] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 to-transparent pointer-events-none" />

        <motion.div
          className="w-36 h-36 rounded-full mb-8 relative"
          animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-xl" />
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 border border-white/5" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Brain className="w-10 h-10 text-indigo-400 animate-pulse" />
          </div>
        </motion.div>

        {/* Step list */}
        <div className="flex flex-col gap-3 w-full max-w-xs">
          {LOADING_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = idx === activeStep;
            const isComplete = idx < activeStep;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -12 }}
                animate={{
                  opacity: isActive || isComplete ? 1 : 0.25,
                  x: 0,
                }}
                transition={{ duration: 0.4, delay: idx * 0.15 }}
                className="flex items-center gap-3"
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  isComplete
                    ? 'bg-emerald-500/15 border border-emerald-500/20'
                    : isActive
                    ? 'bg-indigo-500/15 border border-indigo-500/20'
                    : 'bg-neutral-900 border border-white/5'
                }`}>
                  {isComplete ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Icon className={`w-3.5 h-3.5 ${isActive ? step.color + ' animate-pulse' : 'text-neutral-600'}`} />
                  )}
                </div>
                <span
                  className={`font-mono text-xs transition-colors ${
                    isComplete
                      ? 'text-emerald-400/70 line-through'
                      : isActive
                      ? step.color + ' font-bold'
                      : 'text-neutral-600'
                  }`}
                >
                  {step.text}
                </span>
                {isActive && (
                  <motion.div
                    className="w-1 h-1 rounded-full bg-indigo-400 ml-auto"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// ─── AI Confidence Cards ─────────────────────────────────────────────────────
function ConfidenceCards({
  days,
  wl,
  festival,
  probability,
  statusColor,
}: {
  days: string;
  wl: string;
  festival: boolean;
  probability: number;
  statusColor: string;
}) {
  const daysNum = parseInt(days) || 0;
  const wlNum = parseInt(wl) || 0;

  const daysImpact =
    daysNum >= 15 ? { label: 'Positive', color: 'text-emerald-400', bg: 'bg-emerald-500/8', border: 'border-emerald-500/15' }
    : daysNum >= 5 ? { label: 'Neutral', color: 'text-amber-400', bg: 'bg-amber-500/8', border: 'border-amber-500/15' }
    : { label: 'Negative', color: 'text-rose-400', bg: 'bg-rose-500/8', border: 'border-rose-500/15' };

  const wlImpact =
    wlNum <= 20 ? { label: 'Positive', color: 'text-emerald-400', bg: 'bg-emerald-500/8', border: 'border-emerald-500/15' }
    : wlNum <= 60 ? { label: 'Moderate', color: 'text-amber-400', bg: 'bg-amber-500/8', border: 'border-amber-500/15' }
    : { label: 'High Risk', color: 'text-rose-400', bg: 'bg-rose-500/8', border: 'border-rose-500/15' };

  const festivalImpact = festival
    ? { label: 'Negative', color: 'text-rose-400', bg: 'bg-rose-500/8', border: 'border-rose-500/15' }
    : { label: 'Positive', color: 'text-emerald-400', bg: 'bg-emerald-500/8', border: 'border-emerald-500/15' };

  const cards = [
    {
      icon: Calendar,
      title: 'Days Until Journey',
      value: `${days} days`,
      desc:
        daysNum >= 15
          ? 'Ample time for cancellations to clear your waitlist position.'
          : daysNum >= 5
          ? 'Moderate window. Most clearances happen in the final 72 hours.'
          : 'Very limited time. Chart preparation imminent.',
      impact: daysImpact,
    },
    {
      icon: Users,
      title: 'Waitlist Position',
      value: `WL ${wl}`,
      desc:
        wlNum <= 20
          ? 'Low waitlist position. High probability of clearing during routine cancellations.'
          : wlNum <= 60
          ? 'Medium position. Clearance depends on route demand and cancellation velocity.'
          : 'Deep waitlist. Historically difficult to clear without extraordinary cancellation events.',
      impact: wlImpact,
    },
    {
      icon: PartyPopper,
      title: 'Festival Season',
      value: festival ? 'Active' : 'Inactive',
      desc: festival
        ? 'Peak travel demand reduces cancellation rates by ~30%. Very high occupancy expected.'
        : 'Non-peak period. Standard cancellation curves apply with normal clearance velocity.',
      impact: festivalImpact,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.6 + idx * 0.12 }}
            className={`p-4 rounded-xl border ${card.impact.bg} ${card.impact.border} flex flex-col gap-2.5 relative overflow-hidden group`}
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-white/[0.02] rounded-full blur-2xl group-hover:bg-white/[0.04] transition-all" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon className={`w-3.5 h-3.5 ${card.impact.color}`} />
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
                  {card.title}
                </span>
              </div>
              <span
                className={`font-mono text-[9px] px-2 py-0.5 rounded-full border ${card.impact.bg} ${card.impact.border} ${card.impact.color} font-bold uppercase`}
              >
                {card.impact.label}
              </span>
            </div>

            <span className={`font-geist text-lg font-bold ${card.impact.color}`}>
              {card.value}
            </span>

            <p className="text-neutral-400 text-[11px] leading-relaxed font-sans">
              {card.desc}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Main PNR View ───────────────────────────────────────────────────────────
export default function PnrView() {
  const [pnr, setPnr] = useState('');
  const [days, setDays] = useState('14');
  const [wl, setWl] = useState('45');
  const [festival, setFestival] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PnrResult | null>(null);
  const [history, setHistory] = useState<PredictionHistoryEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  // Load history on mount
  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  // Initialize with a beautiful placeholder to show the gauge immediately
  useEffect(() => {
    setResult({
      pnr: '1234567890',
      probability: 90,
      status: 'Safe Zone',
      statusColor: 'emerald',
      logic: [
        'Historical trends show high cancellation rates during final 48 hours.',
        'Current waitlist dynamics depict robust depletion velocity (4.2/hr).',
        'Primary General Quota remains below structural saturation boundaries.',
        'Current non-holiday weekend clusters minimize charting pressure.',
      ],
      explanation:
        'Historical trends indicate a high cancellation rate during the final 48 hours before departure. Coupled with the current non-festival season context, the algorithm determines a strong probability of movement from Waitlist 45 to Confirmed. Keep this ticket active.',
    });
  }, []);

  // Save prediction to history
  const addToHistory = useCallback(
    (predResult: PnrResult) => {
      const entry: PredictionHistoryEntry = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        pnr: predResult.pnr,
        probability: predResult.probability,
        status: predResult.status,
        statusColor: predResult.statusColor,
        daysLeft: days,
        wlPosition: wl,
        festival,
        timestamp: Date.now(),
      };
      const updated = [entry, ...history.filter((h) => h.pnr !== predResult.pnr)].slice(0, MAX_HISTORY);
      setHistory(updated);
      saveHistory(updated);
    },
    [days, wl, festival, history]
  );

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  const handlePredict = async () => {
    if (!pnr || pnr.length !== 10 || isNaN(Number(pnr))) {
      setError('Please enter a valid 10-digit PNR number.');
      return;
    }
    setError(null);
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/predict-pnr?days_left=${days}&current_wl=${wl}&is_festival=${festival ? 1 : 0}`
      );
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to calculate prediction.');
      }
      const apiData = await response.json();

      const predResult: PnrResult = {
        pnr,
        probability: parseFloat(apiData.confirmation_probability),
        status: apiData.prediction_status,
        statusColor:
          apiData.prediction_status === 'Safe Zone'
            ? 'emerald'
            : apiData.prediction_status === 'Risky'
            ? 'amber'
            : 'rose',
        logic: [
          `Days Left: ${apiData.days_left}`,
          `Current Waitlist: ${apiData.current_waitlist}`,
          `Festival Season: ${apiData.is_festival_season}`,
          'Prediction generated by Random Forest ML model.',
        ],
        explanation: 'Prediction received successfully from the FastAPI backend.',
      };

      setResult(predResult);
      addToHistory(predResult);

      // Scroll to result on mobile
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    } catch (e: any) {
      setError(e.message || 'An error occurred connecting to the neural prediction server.');
    } finally {
      setLoading(false);
    }
  };

  const loadFromHistory = (entry: PredictionHistoryEntry) => {
    setPnr(entry.pnr);
    setDays(entry.daysLeft);
    setWl(entry.wlPosition);
    setFestival(entry.festival);
    setShowHistory(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Safe Zone':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'Moderate Zone':
        return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-rose-500" />;
    }
  };

  const getStatusStyles = (color: string) => {
    switch (color) {
      case 'emerald':
        return { bg: 'bg-emerald-500/10', border: 'border-emerald-500/25', text: 'text-emerald-400' };
      case 'amber':
        return { bg: 'bg-amber-500/10', border: 'border-amber-500/25', text: 'text-amber-400' };
      default:
        return { bg: 'bg-rose-500/10', border: 'border-rose-500/25', text: 'text-rose-400' };
    }
  };

  const formatTime = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: true });
  };

  return (
    <div className="flex flex-col gap-10">
      {/* ─── Header ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-3"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-white/5 font-mono text-[10px] tracking-wider text-indigo-400 w-fit">
          <Zap className="w-3 h-3" />
          NEURAL PREDICTION ENGINE V4.2
        </div>
        <h1 className="font-geist text-4xl sm:text-5xl font-extrabold text-neutral-100 tracking-tighter leading-[1.1]">
          Predict Your{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
            Journey
          </span>
        </h1>
        <p className="text-neutral-400 font-sans text-base sm:text-lg max-w-2xl leading-relaxed">
          Access server-side neural prediction models. We check charting velocities, waitlist cancel logs, and holiday
          traffic trends to deliver high-precision confirmation rates.
        </p>
      </motion.div>

      {/* ─── Grid Dashboard ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* ─── Left Column: Input Panel ─── */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-panel p-6 sm:p-8 rounded-2xl relative overflow-hidden flex flex-col gap-5"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

            <h2 className="font-geist text-xl font-bold text-neutral-100 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/15 flex items-center justify-center">
                <Train className="w-4 h-4 text-indigo-400" />
              </div>
              Journey Parameters
            </h2>

            {/* PNR input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="pnr-input" className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                10-Digit PNR Number
              </label>
              <input
                id="pnr-input"
                value={pnr}
                onChange={(e) => setPnr(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="w-full bg-neutral-950 border border-white/5 focus:border-cyan-400/60 rounded-lg py-3 px-4 font-mono text-lg text-neutral-100 focus:outline-none focus:ring-1 focus:ring-cyan-400/20 transition-all placeholder:text-neutral-700"
                placeholder="e.g. 1234567890"
                type="text"
                autoComplete="off"
                aria-describedby="pnr-hint"
              />
              <span id="pnr-hint" className="font-mono text-[10px] text-neutral-600">
                {pnr.length}/10 digits
              </span>
            </div>

            {/* Grid for Days Left & Current WL */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="days-input" className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                  Days Left
                </label>
                <input
                  id="days-input"
                  value={days}
                  onChange={(e) => setDays(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-neutral-950 border border-white/5 focus:border-cyan-400/60 rounded-lg py-3 px-4 font-mono text-lg text-neutral-100 focus:outline-none focus:ring-1 focus:ring-cyan-400/20 transition-all"
                  type="text"
                  placeholder="14"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="wl-input" className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                  WL Position
                </label>
                <input
                  id="wl-input"
                  value={wl}
                  onChange={(e) => setWl(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-neutral-950 border border-white/5 focus:border-cyan-400/60 rounded-lg py-3 px-4 font-mono text-lg text-neutral-100 focus:outline-none focus:ring-1 focus:ring-cyan-400/20 transition-all"
                  type="text"
                  placeholder="45"
                />
              </div>
            </div>

            {/* Festival Season toggle */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-900/80 border border-white/5">
              <div className="flex flex-col gap-0.5">
                <span className="font-sans text-sm font-bold text-neutral-200">Festival Season / Peak Time</span>
                <span className="font-sans text-xs text-neutral-500">Increases traffic load weights</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" htmlFor="festival-toggle">
                <input
                  id="festival-toggle"
                  type="checkbox"
                  checked={festival}
                  onChange={(e) => setFestival(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500" />
              </label>
            </div>

            {/* Error messaging */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="p-3.5 rounded-lg bg-rose-500/10 border border-rose-500/25 text-rose-400 text-xs font-mono flex items-center gap-2"
                  role="alert"
                >
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action button */}
            <button
              onClick={handlePredict}
              disabled={loading}
              type="button"
              className="w-full py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white font-mono text-sm font-bold uppercase tracking-wider rounded-xl hover:shadow-[0_0_25px_rgba(109,40,217,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex justify-center items-center gap-2.5 group active:scale-[0.98] duration-150"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  ANALYZING...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  PREDICT MY PNR
                </>
              )}
            </button>
          </motion.div>

          {/* ─── Prediction History ─── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-panel rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setShowHistory(!showHistory)}
              type="button"
              className="w-full p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
              aria-expanded={showHistory}
            >
              <div className="flex items-center gap-2.5">
                <History className="w-4 h-4 text-indigo-400" />
                <span className="font-geist text-sm font-bold text-neutral-200">Prediction History</span>
                {history.length > 0 && (
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                    {history.length}
                  </span>
                )}
              </div>
              <motion.div animate={{ rotate: showHistory ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="w-4 h-4 text-neutral-500" />
              </motion.div>
            </button>

            <AnimatePresence>
              {showHistory && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-white/5">
                    {history.length === 0 ? (
                      <div className="p-6 text-center">
                        <Clock className="w-6 h-6 text-neutral-600 mx-auto mb-2" />
                        <p className="font-mono text-xs text-neutral-500">No predictions yet</p>
                      </div>
                    ) : (
                      <>
                        <div className="max-h-[260px] overflow-y-auto station-dropdown">
                          {history.map((entry) => {
                            const styles = getStatusStyles(entry.statusColor);
                            return (
                              <button
                                key={entry.id}
                                type="button"
                                onClick={() => loadFromHistory(entry)}
                                className="w-full flex items-center gap-3 p-3.5 hover:bg-white/[0.03] transition-colors text-left border-b border-white/5 last:border-0"
                              >
                                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                                  entry.statusColor === 'emerald' ? 'bg-emerald-400' :
                                  entry.statusColor === 'amber' ? 'bg-amber-400' : 'bg-rose-500'
                                }`} />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono text-xs text-neutral-200 font-bold">
                                      PNR {entry.pnr}
                                    </span>
                                    <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded ${styles.bg} ${styles.border} ${styles.text} border`}>
                                      {entry.probability}%
                                    </span>
                                  </div>
                                  <span className="font-mono text-[10px] text-neutral-500 block mt-0.5">
                                    WL{entry.wlPosition} • {entry.daysLeft}d • {formatTime(entry.timestamp)}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                        <div className="p-2 border-t border-white/5">
                          <button
                            type="button"
                            onClick={clearHistory}
                            className="w-full p-2 flex items-center justify-center gap-1.5 text-neutral-500 hover:text-rose-400 transition-colors font-mono text-[10px] rounded-lg hover:bg-rose-500/5"
                          >
                            <Trash2 className="w-3 h-3" />
                            Clear All History
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ─── Info Card ─── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-panel p-5 rounded-xl border-l-4 border-l-cyan-400/50"
          >
            <div className="flex gap-3 items-start">
              <Zap className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-sans text-sm font-bold text-neutral-100">Deterministic Confidence</h4>
                <p className="font-sans text-xs text-neutral-400 leading-normal mt-1">
                  Predictive calculations incorporate seasonal cancellation coefficients and waitlist volatility index
                  (WVI) updated every 10 minutes.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ─── Right Column: Results ─── */}
        <div className="lg:col-span-7 flex flex-col gap-5" ref={resultRef}>
          <AnimatePresence mode="wait">
            {/* Loading Sequence */}
            {loading && <PredictionLoadingSequence key="loading" />}

            {/* Result Dashboard */}
            {!loading && result && (
              <motion.div
                key={result.pnr + result.probability}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-5"
              >
                {/* ─── Gauge Card ─── */}
                <div className="glass-panel p-6 sm:p-10 rounded-2xl relative overflow-hidden bg-gradient-to-br from-indigo-950/10 via-neutral-950 to-neutral-950">
                  <div
                    className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] pointer-events-none"
                    style={{
                      background:
                        result.statusColor === 'emerald'
                          ? 'rgba(52,211,153,0.04)'
                          : result.statusColor === 'amber'
                          ? 'rgba(251,191,36,0.04)'
                          : 'rgba(244,63,94,0.04)',
                    }}
                  />

                  <div className="relative z-10 flex flex-col items-center justify-center text-center">
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="font-mono text-[10px] text-neutral-500 uppercase tracking-[0.25em] mb-6"
                    >
                      Estimated Probability Result
                    </motion.span>

                    <ProbabilityGauge
                      probability={result.probability}
                      status={result.status}
                      statusColor={result.statusColor}
                    />

                    {/* Status Badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2, duration: 0.4 }}
                      className="mt-8"
                    >
                      {(() => {
                        const s = getStatusStyles(result.statusColor);
                        return (
                          <div
                            className={`inline-flex items-center gap-2 border px-6 py-2.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider ${s.bg} ${s.border} ${s.text}`}
                          >
                            {getStatusIcon(result.status)}
                            {result.status}
                          </div>
                        );
                      })()}
                    </motion.div>
                  </div>
                </div>

                {/* ─── AI Confidence Cards ─── */}
                <ConfidenceCards
                  days={days}
                  wl={wl}
                  festival={festival}
                  probability={result.probability}
                  statusColor={result.statusColor}
                />

                {/* ─── Neural Analysis ─── */}
                <div className="glass-panel p-5 sm:p-8 rounded-2xl relative flex flex-col gap-5">
                  <div className="absolute -top-3.5 -left-3.5 bg-indigo-600 text-white w-9 h-9 rounded-full flex items-center justify-center shadow-lg border border-white/10">
                    <Sparkles className="w-4 h-4" />
                  </div>

                  <div className="pl-4">
                    <h3 className="font-mono text-xs text-indigo-300 font-bold uppercase tracking-widest mb-4">
                      Neural Analysis Logic
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                      {result.logic.map((bullet, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 1.4 + idx * 0.1 }}
                          className="p-3.5 rounded-lg bg-neutral-900/80 border border-white/5 flex flex-col gap-1.5"
                        >
                          <span className="font-mono text-[10px] text-indigo-400 font-bold uppercase">
                            FACTOR {idx + 1}
                          </span>
                          <p className="font-sans text-[11px] text-neutral-300 leading-relaxed">{bullet}</p>
                        </motion.div>
                      ))}
                    </div>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.9 }}
                      className="font-sans text-sm text-neutral-300 leading-relaxed border-t border-white/5 pt-4"
                    >
                      {result.explanation}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Re-exported for the chevron in history
function ChevronDown(props: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
