import React, { useEffect, useState, useRef } from 'react';

const LOG_TEMPLATES = [
  { text: "Loading ML matrix parameters...", status: "OK", statusColor: "text-emerald-400" },
  { text: "Connecting to IRCTC primary node...", status: "CONNECTED", statusColor: "text-emerald-400" },
  { text: "Fetching historical probability database...", status: "4.2M RECS LOADED", statusColor: "text-indigo-400" },
  { text: "Analyzing waitlist trends for Saturday schedules...", status: "98% ACCURACY MATCHED", statusColor: "text-indigo-400" },
  { text: "Checking seat swap parameters at Vadodara (BRC)...", status: "VALID", statusColor: "text-emerald-400" },
  { text: "Predicting cancellation cascades inside final 48h...", status: "CALCULATED", statusColor: "text-cyan-400" },
  { text: "Optimizing split-seat permutations for NDLS <-> BCT...", status: "SUCCESS", statusColor: "text-emerald-400" },
  { text: "Recalibrating model weights for festival rush...", status: "ADJUSTED", statusColor: "text-amber-400" },
  { text: "System idle.", status: "AWAITING USER INPUT", statusColor: "text-cyan-400 animate-pulse" }
];

export default function SystemLogTerminal() {
  const [logs, setLogs] = useState<{ id: number; text: string; status: string; statusColor: string; timestamp: string }[]>([]);
  const logIdRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Bootstrap initial logs
    const initialLogs = LOG_TEMPLATES.slice(0, 4).map((tpl, i) => {
      const now = new Date().toLocaleTimeString('en-US', { hour12: false });
      logIdRef.current++;
      return {
        id: logIdRef.current,
        text: tpl.text,
        status: tpl.status,
        statusColor: tpl.statusColor,
        timestamp: now
      };
    });
    setLogs(initialLogs);

    // Roll new logs
    let templateIndex = 4;
    const interval = setInterval(() => {
      const tpl = LOG_TEMPLATES[templateIndex];
      const now = new Date().toLocaleTimeString('en-US', { hour12: false });
      logIdRef.current++;

      setLogs((prev) => {
        const next = [
          ...prev,
          {
            id: logIdRef.current,
            text: tpl.text,
            status: tpl.status,
            statusColor: tpl.statusColor,
            timestamp: now
          }
        ];
        // Limit max logs to 30 to prevent overflow
        if (next.length > 25) {
          next.shift();
        }
        return next;
      });

      templateIndex = (templateIndex + 1) % LOG_TEMPLATES.length;
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="glass-panel rounded-xl overflow-hidden flex flex-col w-full font-mono text-xs border border-white/5 shadow-2xl">
      <div className="bg-neutral-900 px-4 py-2.5 border-b border-white/5 flex items-center justify-between">
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
        </div>
        <span className="text-neutral-400 font-semibold tracking-wider text-[10px]">
          system_status.log // CLIENT_BRIDGE
        </span>
      </div>
      <div 
        ref={containerRef}
        className="p-4 bg-neutral-950/90 h-48 overflow-y-auto flex flex-col gap-2 scrollbar-none relative"
      >
        <div className="text-neutral-500 text-[10px] pb-2 border-b border-white/5 flex justify-between">
          <span>LOGGER STREAMS ACTIVE</span>
          <span>BAUD_RATE: 115200</span>
        </div>
        
        {logs.map((log) => (
          <div key={log.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-0.5 border-b border-white/5 border-dashed last:border-0">
            <div className="flex items-start sm:items-center gap-2">
              <span className="text-indigo-400/70 font-semibold select-none">[{log.timestamp}]</span>
              <span className="text-neutral-300"><span className="text-indigo-500 font-bold">&gt;</span> {log.text}</span>
            </div>
            {log.status && (
              <span className={`${log.statusColor} font-bold text-[10px] self-end sm:self-auto px-1.5 py-0.5 rounded bg-white/5 border border-white/5`}>
                {log.status}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
