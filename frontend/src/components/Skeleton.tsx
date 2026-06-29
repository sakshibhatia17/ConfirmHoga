import React from 'react';
import { motion } from 'motion/react';

interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
  rounded?: string;
  delay?: number;
}

/** Base shimmer skeleton bar with scanning overlay */
export function Skeleton({
  width = '100%',
  height = '16px',
  className = '',
  rounded = 'rounded-md',
  delay = 0,
}: SkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: delay * 0.06 }}
      className={`skeleton-shimmer ${rounded} ${className} relative overflow-hidden`}
      style={{ width, height }}
      aria-hidden="true"
    >
      <div className="skeleton-scan-line" />
    </motion.div>
  );
}

/** Skeleton layout matching JugaadView timeline segments + AI strategy panel */
export function JugaadResultSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      aria-label="Loading results"
      role="status"
    >
      {/* Left — Timeline skeleton */}
      <div className="lg:col-span-8 flex flex-col gap-8">
        <Skeleton width="280px" height="28px" rounded="rounded-lg" delay={0} />

        <div className="relative pl-8 flex flex-col gap-10">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
              className="glass-panel rounded-xl p-6 flex flex-col gap-5"
            >
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-2">
                  <Skeleton width="180px" height="24px" rounded="rounded-lg" delay={i} />
                  <Skeleton width="140px" height="12px" delay={i + 1} />
                </div>
                <Skeleton width="90px" height="26px" rounded="rounded-full" delay={i + 2} />
              </div>
              <div className="flex gap-6 items-center">
                <div className="flex flex-col gap-1.5">
                  <Skeleton width="40px" height="8px" delay={i + 3} />
                  <Skeleton width="150px" height="14px" delay={i + 4} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Skeleton width="30px" height="8px" delay={i + 5} />
                  <Skeleton width="30px" height="14px" delay={i + 6} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Skeleton width="70px" height="8px" delay={i + 7} />
                  <Skeleton width="90px" height="14px" delay={i + 8} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right — AI Strategy skeleton */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="lg:col-span-4 flex flex-col gap-6"
      >
        <div className="glow-card p-6 flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <Skeleton width="40px" height="40px" rounded="rounded-xl" delay={4} />
            <div className="flex flex-col gap-1.5">
              <Skeleton width="100px" height="18px" rounded="rounded-lg" delay={5} />
              <Skeleton width="140px" height="8px" delay={6} />
            </div>
          </div>
          <div className="pl-4 border-l-2 border-cyan-400/10">
            <Skeleton width="100%" height="60px" rounded="rounded-lg" delay={7} />
          </div>
          <div className="p-5 rounded-xl bg-neutral-900/60 border border-white/5 flex flex-col gap-3">
            <div className="flex justify-between">
              <Skeleton width="140px" height="12px" delay={8} />
              <Skeleton width="40px" height="14px" delay={9} />
            </div>
            <Skeleton width="100%" height="12px" rounded="rounded-full" delay={10} />
          </div>
          <Skeleton width="100%" height="52px" rounded="rounded-xl" delay={11} />
          <Skeleton width="100%" height="52px" rounded="rounded-xl" delay={12} />
          <Skeleton width="100%" height="48px" rounded="rounded-xl" delay={13} />
        </div>

        <div className="glass-panel p-6 rounded-xl flex flex-col gap-4">
          <Skeleton width="180px" height="16px" rounded="rounded-lg" delay={14} />
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex justify-between items-center py-1"
            >
              <div className="flex flex-col gap-1">
                <Skeleton width="80px" height="10px" delay={14 + i} />
                <Skeleton width="150px" height="8px" delay={15 + i} />
              </div>
              <Skeleton width="50px" height="10px" delay={16 + i} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Skeleton layout matching PnrView gauge + analysis panel */
export function PnrResultSkeleton() {
  return (
    <motion.div
      key="pnr-skeleton"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-6"
      aria-label="Loading prediction results"
      role="status"
    >
      {/* Gauge card skeleton */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="glass-panel p-10 rounded-2xl flex flex-col items-center justify-center text-center gap-6 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/10 to-transparent pointer-events-none" />
        <Skeleton width="200px" height="10px" delay={0} />
        <div className="relative">
          <Skeleton width="220px" height="220px" rounded="rounded-full" delay={1} />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/5 to-cyan-500/5 animate-pulse" />
        </div>
        <Skeleton width="150px" height="32px" rounded="rounded-full" delay={2} />
      </motion.div>

      {/* Confidence cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
            className="p-4 rounded-xl border border-white/5 bg-neutral-900/40 flex flex-col gap-2.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton width="14px" height="14px" rounded="rounded-sm" delay={i + 3} />
                <Skeleton width="100px" height="8px" delay={i + 4} />
              </div>
              <Skeleton width="60px" height="16px" rounded="rounded-full" delay={i + 5} />
            </div>
            <Skeleton width="80px" height="18px" delay={i + 6} />
            <Skeleton width="100%" height="10px" delay={i + 7} />
            <Skeleton width="85%" height="10px" delay={i + 8} />
          </motion.div>
        ))}
      </div>

      {/* Analysis card skeleton */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="glass-panel p-8 rounded-2xl flex flex-col gap-6 relative"
      >
        <Skeleton width="200px" height="14px" delay={10} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7 + i * 0.08 }}
              className="p-4 rounded-lg bg-neutral-900 border border-white/5 flex flex-col gap-2"
            >
              <Skeleton width="70px" height="8px" delay={10 + i} />
              <Skeleton width="100%" height="12px" delay={11 + i} />
              <Skeleton width="80%" height="12px" delay={12 + i} />
            </motion.div>
          ))}
        </div>
        <Skeleton width="100%" height="1px" className="bg-white/5" delay={16} />
        <Skeleton width="100%" height="14px" delay={17} />
        <Skeleton width="90%" height="14px" delay={18} />
      </motion.div>
    </motion.div>
  );
}
