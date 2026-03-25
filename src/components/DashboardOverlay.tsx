import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  scrollProgress: number;
  currentPhase: number;
}

const phases = [
  { title: 'Market Noise', desc: 'Price discovery in action — volatility is the natural state of markets.' },
  { title: 'Stress & Uncertainty', desc: 'Drawdowns test conviction. Without discipline, noise becomes destruction.' },
  { title: 'Strategy Overlay', desc: 'Systematic process separates signal from noise. Risk controls contain exposure.' },
  { title: 'Resolution', desc: 'Discipline compounds. The process is the edge — not any single trade.' },
];

function MetricCard({ label, value, trend, delay }: { label: string; value: string; trend?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, delay: delay || 0 }}
      className="glass-panel rounded-lg p-4 min-w-[140px]"
    >
      <p className="mono-text text-[10px] tracking-widest text-muted-foreground uppercase mb-1">{label}</p>
      <p className="font-display text-xl font-bold text-foreground">{value}</p>
      {trend && (
        <p className={`mono-text text-xs mt-1 ${trend.startsWith('+') ? 'text-green-400' : trend.startsWith('-') ? 'text-red-400' : 'text-muted-foreground'}`}>
          {trend}
        </p>
      )}
    </motion.div>
  );
}

const phaseMetrics: Record<number, { label: string; value: string; trend?: string }[]> = {
  0: [
    { label: 'Volatility', value: '24.3%', trend: '↑ Elevated' },
    { label: 'Signal Ratio', value: '0.12', trend: '— Weak' },
    { label: 'Noise Level', value: 'High' },
  ],
  1: [
    { label: 'Drawdown', value: '-8.7%', trend: '-3.2% today' },
    { label: 'VaR Breach', value: '2x', trend: '↑ Warning' },
    { label: 'Correlation', value: '0.91', trend: '↑ Contagion' },
  ],
  2: [
    { label: 'Exposure', value: '42%', trend: '— Controlled' },
    { label: 'Risk Score', value: '3/10', trend: '+2 improved' },
    { label: 'Signals', value: '17 active' },
  ],
  3: [
    { label: 'Sharpe', value: '2.4', trend: '+0.8 YTD' },
    { label: 'Win Rate', value: '64%', trend: '+12% vs avg' },
    { label: 'Alpha', value: '+340bps', trend: '↑ Compounding' },
  ],
};

export default function DashboardOverlay({ scrollProgress, currentPhase }: Props) {
  const metrics = phaseMetrics[currentPhase] || phaseMetrics[0];

  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-6 md:p-12">
      {/* Top: phase dots + title */}
      <div className="flex items-start justify-between">
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhase}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
            >
              <p className="mono-text text-[10px] tracking-[0.3em] text-primary uppercase mb-2">
                Phase {currentPhase + 1} / 4
              </p>
              <h3 className="font-display text-2xl md:text-4xl font-bold text-foreground">
                {phases[currentPhase].title}
              </h3>
              <p className="text-muted-foreground text-sm md:text-base max-w-md mt-2">
                {phases[currentPhase].desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Phase indicator dots */}
        <div className="flex flex-col gap-3 mt-2">
          {phases.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                currentPhase === i
                  ? 'bg-primary scale-150 shadow-[0_0_8px_hsl(var(--primary)/0.6)]'
                  : currentPhase > i
                  ? 'bg-primary/40'
                  : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom: floating metric cards */}
      <div className="flex flex-wrap gap-3 justify-center md:justify-start">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhase}
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {metrics.map((m, i) => (
              <MetricCard key={`${currentPhase}-${i}`} {...m} delay={i * 0.1} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Scroll progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-muted">
        <motion.div
          className="h-full bg-primary"
          style={{ width: `${scrollProgress * 100}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </div>
  );
}
