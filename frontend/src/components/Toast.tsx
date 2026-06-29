import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, X, Info } from 'lucide-react';

// ─── Toast Types ─────────────────────────────────────────────────────────────
export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextValue {
  addToast: (toast: Omit<Toast, 'id'>) => void;
}

const ToastContext = React.createContext<ToastContextValue>({ addToast: () => {} });

export function useToast() {
  return React.useContext(ToastContext);
}

// ─── Toast Item ──────────────────────────────────────────────────────────────
function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), toast.duration || 4000);
    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onDismiss]);

  const config = {
    success: {
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />,
      border: 'border-emerald-500/20',
      glow: 'shadow-[0_0_15px_rgba(52,211,153,0.08)]',
      accent: 'bg-emerald-500/5',
    },
    error: {
      icon: <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />,
      border: 'border-rose-500/20',
      glow: 'shadow-[0_0_15px_rgba(244,63,94,0.08)]',
      accent: 'bg-rose-500/5',
    },
    info: {
      icon: <Info className="w-4 h-4 text-cyan-400 flex-shrink-0" />,
      border: 'border-cyan-500/20',
      glow: 'shadow-[0_0_15px_rgba(0,240,255,0.08)]',
      accent: 'bg-cyan-500/5',
    },
  }[toast.type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`glass-panel rounded-xl px-4 py-3 ${config.border} ${config.glow} ${config.accent} flex items-start gap-3 min-w-[280px] max-w-[400px] pointer-events-auto`}
      role="alert"
      aria-live="polite"
    >
      <div className="mt-0.5">{config.icon}</div>
      <div className="flex-1 min-w-0">
        <p className="font-geist text-sm font-bold text-neutral-100">{toast.title}</p>
        {toast.message && (
          <p className="font-sans text-xs text-neutral-400 mt-0.5 leading-relaxed">{toast.message}</p>
        )}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-neutral-500 hover:text-neutral-300 transition-colors flex-shrink-0 mt-0.5"
        aria-label="Dismiss notification"
        type="button"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
}

// ─── Toast Provider & Container ──────────────────────────────────────────────
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast container */}
      <div
        className="fixed top-24 right-4 z-[100] flex flex-col gap-2 pointer-events-none"
        aria-label="Notifications"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} onDismiss={dismissToast} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
