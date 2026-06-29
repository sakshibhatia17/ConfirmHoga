import React from 'react';
import { motion } from 'motion/react';

interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
  rounded?: string;
}

/** Base shimmer skeleton bar */
export function Skeleton({
  width = '100%',
  height = '16px',
  className = '',
  rounded = 'rounded-md',
}: SkeletonProps) {
  return (
    <div
      className={`skeleton-shimmer ${rounded} ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}

/** Skeleton layout matching JugaadView timeline segments + AI strategy panel */
export function JugaadResultSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      aria-label="Loading results"
      role="status"
    >
      {/* Left — Timeline skeleton */}
      <div className="lg:col-span-8 flex flex-col gap-8">
        <Skeleton width="280px" height="28px" rounded="rounded-lg" />

        <div className="relative pl-8 flex flex-col gap-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-panel rounded-xl p-6 flex flex-col gap-5">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-2">
                  <Skeleton width="180px" height="24px" rounded="rounded-lg" />
                  <Skeleton width="140px" height="12px" />
                </div>
                <Skeleton width="90px" height="26px" rounded="rounded-full" />
              </div>
              <div className="flex gap-6 items-center">
                <div className="flex flex-col gap-1.5">
                  <Skeleton width="40px" height="8px" />
                  <Skeleton width="150px" height="14px" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Skeleton width="30px" height="8px" />
                  <Skeleton width="30px" height="14px" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Skeleton width="70px" height="8px" />
                  <Skeleton width="90px" height="14px" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — AI Strategy skeleton */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        <div className="glass-panel p-6 rounded-xl flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <Skeleton width="20px" height="20px" rounded="rounded-full" />
            <Skeleton width="120px" height="20px" rounded="rounded-lg" />
          </div>
          <Skeleton width="100%" height="60px" rounded="rounded-lg" />
          <div className="p-4 rounded-xl bg-neutral-900 border border-white/5 flex flex-col gap-2">
            <div className="flex justify-between">
              <Skeleton width="120px" height="10px" />
              <Skeleton width="40px" height="10px" />
            </div>
            <Skeleton width="100%" height="8px" rounded="rounded-full" />
          </div>
          <Skeleton width="100%" height="14px" />
          <Skeleton width="100%" height="14px" />
          <Skeleton width="100%" height="46px" rounded="rounded-lg" />
        </div>

        <div className="glass-panel p-6 rounded-xl flex flex-col gap-4">
          <Skeleton width="180px" height="16px" rounded="rounded-lg" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex justify-between items-center py-1">
              <div className="flex flex-col gap-1">
                <Skeleton width="80px" height="10px" />
                <Skeleton width="150px" height="8px" />
              </div>
              <Skeleton width="50px" height="10px" />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/** Skeleton layout matching PnrView gauge + analysis panel */
export function PnrResultSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-6"
      aria-label="Loading prediction results"
      role="status"
    >
      {/* Gauge card skeleton */}
      <div className="glass-panel p-10 rounded-2xl flex flex-col items-center justify-center text-center gap-6">
        <Skeleton width="200px" height="10px" />
        <Skeleton width="256px" height="256px" rounded="rounded-full" />
        <Skeleton width="150px" height="32px" rounded="rounded-full" />
      </div>

      {/* Analysis card skeleton */}
      <div className="glass-panel p-8 rounded-2xl flex flex-col gap-6">
        <Skeleton width="200px" height="14px" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-4 rounded-lg bg-neutral-900 border border-white/5 flex flex-col gap-2">
              <Skeleton width="70px" height="8px" />
              <Skeleton width="100%" height="12px" />
              <Skeleton width="80%" height="12px" />
            </div>
          ))}
        </div>
        <Skeleton width="100%" height="1px" className="bg-white/5" />
        <Skeleton width="100%" height="14px" />
        <Skeleton width="90%" height="14px" />
      </div>
    </motion.div>
  );
}
