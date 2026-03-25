import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const phases = [
  { title: 'Market Noise', desc: 'Price discovery in action — volatility is the natural state of markets.' },
  { title: 'Stress & Uncertainty', desc: 'Drawdowns test conviction. Without discipline, noise becomes destruction.' },
  { title: 'Strategy Overlay', desc: 'Systematic process separates signal from noise. Risk controls contain exposure.' },
  { title: 'Resolution', desc: 'Discipline compounds. The process is the edge — not any single trade.' },
];

// Mini sparkline SVG
function Sparkline({ data, color, glow }: { data: number[]; color: string; glow?: boolean }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 120;
  const h = 32;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(' ');

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      {glow && (
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="4"
          opacity="0.2"
          strokeLinejoin="round"
        />
      )}
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Generate sparkline data
function genSpark(len: number, trend: number, vol: number) {
  const d = [50];
  for (let i = 1; i < len; i++) d.push(d[i - 1] + (Math.random() - 0.5 + trend) * vol);
  return d;
}

// Heatmap cell
function HeatCell({ intensity, delay }: { intensity: number; delay: number }) {
  const hue = intensity > 0.5 ? 140 : 0;
  const sat = Math.abs(intensity - 0.5) * 160;
  const light = 20 + Math.abs(intensity - 0.5) * 30;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.3, delay }}
      className="rounded-sm"
      style={{
        width: '100%',
        aspectRatio: '1',
        background: `hsl(${hue} ${sat}% ${light}%)`,
      }}
    />
  );
}

interface MetricProps {
  label: string;
  value: string;
  trend?: string;
  sparkData?: number[];
  sparkColor?: string;
  delay?: number;
}

function MetricCard({ label, value, trend, sparkData, sparkColor, delay = 0 }: MetricProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.5, delay }}
      className="glass-panel rounded-xl p-5 flex flex-col justify-between"
    >
      <p className="mono-text text-[10px] tracking-[0.2em] text-muted-foreground uppercase">{label}</p>
      <div className="mt-2 flex items-end justify-between gap-3">
        <div>
          <p className="font-display text-2xl md:text-3xl font-bold text-foreground leading-none">{value}</p>
          {trend && (
            <p className={`mono-text text-xs mt-1.5 ${
              trend.startsWith('+') || trend.includes('↑') ? 'text-green-400' :
              trend.startsWith('-') || trend.includes('↓') ? 'text-red-400' :
              'text-muted-foreground'
            }`}>
              {trend}
            </p>
          )}
        </div>
        {sparkData && sparkColor && (
          <Sparkline data={sparkData} color={sparkColor} glow />
        )}
      </div>
    </motion.div>
  );
}

// Static spark data per phase
const sparkSets = {
  noise: [genSpark(20, 0, 4), genSpark(20, 0, 5), genSpark(20, 0.05, 3)],
  stress: [genSpark(20, -0.15, 5), genSpark(20, -0.1, 6), genSpark(20, -0.05, 4)],
  strategy: [genSpark(20, 0.05, 2), genSpark(20, 0.08, 2.5), genSpark(20, 0.1, 1.5)],
  resolve: [genSpark(20, 0.12, 1.5), genSpark(20, 0.15, 1), genSpark(20, 0.1, 1.2)],
};

const phaseConfigs: Record<number, { metrics: MetricProps[]; heatValues: number[] }> = {
  0: {
    metrics: [
      { label: 'Implied Vol', value: '28.4%', trend: '↑ Elevated', sparkData: sparkSets.noise[0], sparkColor: '#8899aa' },
      { label: 'Signal / Noise', value: '0.12', trend: '— Weak', sparkData: sparkSets.noise[1], sparkColor: '#667788' },
      { label: 'Regime', value: 'Unstable', sparkData: sparkSets.noise[2], sparkColor: '#7788aa' },
      { label: 'Open Signals', value: '3', trend: '— Filtering' },
    ],
    heatValues: Array.from({ length: 16 }, () => 0.4 + Math.random() * 0.2),
  },
  1: {
    metrics: [
      { label: 'Max Drawdown', value: '-8.7%', trend: '-3.2% today', sparkData: sparkSets.stress[0], sparkColor: '#d44040' },
      { label: 'VaR Utilization', value: '187%', trend: '↑ Breach', sparkData: sparkSets.stress[1], sparkColor: '#e05050' },
      { label: 'Correlation', value: '0.91', trend: '↑ Contagion', sparkData: sparkSets.stress[2], sparkColor: '#cc3030' },
      { label: 'Risk Status', value: 'Critical', trend: '↓ Degraded' },
    ],
    heatValues: Array.from({ length: 16 }, () => 0.05 + Math.random() * 0.35),
  },
  2: {
    metrics: [
      { label: 'Net Exposure', value: '42%', trend: '— Controlled', sparkData: sparkSets.strategy[0], sparkColor: '#50cc80' },
      { label: 'Risk Score', value: '3 / 10', trend: '+2 improved', sparkData: sparkSets.strategy[1], sparkColor: '#60bb70' },
      { label: 'Active Signals', value: '17', trend: '↑ Converging', sparkData: sparkSets.strategy[2], sparkColor: '#40bb60' },
      { label: 'Position Sizing', value: 'Optimal', trend: '+0.3σ edge' },
    ],
    heatValues: Array.from({ length: 16 }, () => 0.5 + Math.random() * 0.25),
  },
  3: {
    metrics: [
      { label: 'Sharpe Ratio', value: '2.41', trend: '+0.8 YTD', sparkData: sparkSets.resolve[0], sparkColor: '#50cc80' },
      { label: 'Win Rate', value: '64%', trend: '+12% vs avg', sparkData: sparkSets.resolve[1], sparkColor: '#60dd90' },
      { label: 'Alpha', value: '+340bps', trend: '↑ Compounding', sparkData: sparkSets.resolve[2], sparkColor: '#70eea0' },
      { label: 'System Status', value: 'Optimal', trend: '+99.9% uptime' },
    ],
    heatValues: Array.from({ length: 16 }, () => 0.6 + Math.random() * 0.4),
  },
};

export default function ChartNarrative() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const isInView = useInView(containerRef, { amount: 0.05 });

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
    const progress = Math.max(0, Math.min(1, -rect.top / totalHeight));
    setScrollProgress(progress);
    setCurrentPhase(Math.min(3, Math.floor(progress * 4)));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const config = phaseConfigs[currentPhase];

  return (
    <div ref={containerRef} className="relative" style={{ height: '400vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Subtle animated background gradient */}
        <div
          className="absolute inset-0 transition-colors duration-1000"
          style={{
            background: currentPhase === 1
              ? 'radial-gradient(ellipse at 60% 50%, hsl(0 30% 8% / 0.5) 0%, hsl(230 15% 5%) 70%)'
              : currentPhase >= 2
              ? 'radial-gradient(ellipse at 40% 50%, hsl(140 20% 7% / 0.3) 0%, hsl(230 15% 5%) 70%)'
              : 'radial-gradient(ellipse at 50% 50%, hsl(230 15% 8%) 0%, hsl(230 15% 5%) 70%)',
          }}
        />

        <div className="relative z-10 w-full max-w-6xl px-6 md:px-12">
          {/* Top row: phase info + dots */}
          <div className="flex items-start justify-between mb-8 md:mb-12">
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
                <h3 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
                  {phases[currentPhase].title}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base max-w-lg mt-3 leading-relaxed">
                  {phases[currentPhase].desc}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-col gap-3 mt-3 ml-6">
              {phases.map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                    currentPhase === i
                      ? 'bg-primary scale-125 shadow-[0_0_10px_hsl(var(--primary)/0.5)]'
                      : currentPhase > i
                      ? 'bg-primary/40'
                      : 'bg-muted-foreground/20'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Metrics grid + heatmap */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Main metrics */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPhase}
                  className="contents"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {config.metrics.map((m, i) => (
                    <MetricCard key={`${currentPhase}-${i}`} {...m} delay={i * 0.08} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Heatmap panel */}
            <div className="glass-panel rounded-xl p-4 hidden lg:block">
              <p className="mono-text text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-3">
                Sector Heatmap
              </p>
              <div className="grid grid-cols-4 gap-1.5">
                <AnimatePresence mode="wait">
                  {config.heatValues.map((v, i) => (
                    <HeatCell key={`${currentPhase}-${i}`} intensity={v} delay={i * 0.02} />
                  ))}
                </AnimatePresence>
              </div>
              <div className="flex justify-between mt-3">
                <span className="mono-text text-[9px] text-red-400/60">Sell</span>
                <span className="mono-text text-[9px] text-green-400/60">Buy</span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-8 md:mt-12 h-[2px] bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${scrollProgress * 100}%`,
                background: 'var(--gradient-redshift)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
