import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

// Generate realistic-looking price data
function generatePriceData(count: number, startPrice: number, volatility: number, trend: number) {
  const data: number[] = [startPrice];
  for (let i = 1; i < count; i++) {
    const change = (Math.random() - 0.5) * volatility + trend;
    data.push(data[i - 1] + change);
  }
  return data;
}

function generateEquityCurve(count: number) {
  const data: number[] = [100];
  for (let i = 1; i < count; i++) {
    const change = (Math.random() - 0.45) * 1.5;
    data.push(Math.max(data[i - 1] + change, data[i - 1] * 0.995));
  }
  return data;
}

const phases = [
  { title: 'Market Noise', desc: 'Price discovery in action — volatility is the natural state of markets.' },
  { title: 'Stress & Uncertainty', desc: 'Drawdowns test conviction. Without discipline, noise becomes destruction.' },
  { title: 'Strategy Overlay', desc: 'Systematic process separates signal from noise. Risk controls contain exposure.' },
  { title: 'Resolution', desc: 'Discipline compounds. The process is the edge — not any single trade.' },
];

const labels = [
  { text: 'Risk Controls', x: 0.25, y: 0.3 },
  { text: 'Execution', x: 0.5, y: 0.2 },
  { text: 'Discipline', x: 0.75, y: 0.35 },
];

export default function ChartNarrative() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const isInView = useInView(containerRef, { amount: 0.1 });

  const priceData = useRef(generatePriceData(200, 100, 3, 0));
  const stressData = useRef(generatePriceData(200, 100, 5, -0.15));
  const equityCurve = useRef(generateEquityCurve(200));

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isInView) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, w, h);

    const drawLine = (
      data: number[],
      color: string,
      opacity: number,
      lineWidth: number,
      visiblePct: number
    ) => {
      const len = Math.floor(data.length * visiblePct);
      if (len < 2) return;

      const slice = data.slice(0, len);
      const min = Math.min(...data) - 5;
      const max = Math.max(...data) + 5;

      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.globalAlpha = opacity;
      ctx.lineWidth = lineWidth;
      ctx.lineJoin = 'round';

      for (let i = 0; i < slice.length; i++) {
        const x = (i / (data.length - 1)) * w;
        const y = h - ((slice[i] - min) / (max - min)) * h * 0.8 - h * 0.1;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    // Grid lines
    ctx.strokeStyle = 'hsl(230, 10%, 15%)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = (h / 4) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Phase-based drawing
    const p = scrollProgress;

    if (p < 0.25) {
      // Phase 1: Market noise
      const phasePct = p / 0.25;
      drawLine(priceData.current, '#667788', 0.6, 1.5, phasePct);
    } else if (p < 0.5) {
      // Phase 2: Stress
      drawLine(priceData.current, '#667788', 0.3, 1, 1);
      const phasePct = (p - 0.25) / 0.25;
      drawLine(stressData.current, '#d44040', 0.7, 2, phasePct);
    } else if (p < 0.75) {
      // Phase 3: Strategy overlay
      drawLine(priceData.current, '#667788', 0.15, 1, 1);
      drawLine(stressData.current, '#d44040', 0.3, 1.5, 1);
      const phasePct = (p - 0.5) / 0.25;
      drawLine(equityCurve.current, '#50cc80', 0.8, 2.5, phasePct);

      // Risk bands
      if (phasePct > 0.3) {
        const bandOpacity = Math.min(0.1, (phasePct - 0.3) * 0.15);
        ctx.fillStyle = `rgba(80, 204, 128, ${bandOpacity})`;
        ctx.fillRect(0, h * 0.25, w * phasePct, h * 0.5);
      }
    } else {
      // Phase 4: Resolution
      drawLine(priceData.current, '#667788', 0.1, 1, 1);
      drawLine(stressData.current, '#d44040', 0.15, 1, 1);
      drawLine(equityCurve.current, '#50cc80', 0.9, 3, 1);

      ctx.fillStyle = 'rgba(80, 204, 128, 0.06)';
      ctx.fillRect(0, h * 0.25, w, h * 0.5);

      // Labels
      const labelOpacity = Math.min(1, (p - 0.75) / 0.15);
      ctx.globalAlpha = labelOpacity;
      ctx.font = '12px "JetBrains Mono", monospace';
      ctx.fillStyle = 'hsl(220, 10%, 70%)';
      labels.forEach((l) => {
        ctx.fillText(l.text, l.x * w, l.y * h);
      });
      ctx.globalAlpha = 1;
    }
  }, [scrollProgress, isInView]);

  return (
    <div ref={containerRef} className="relative" style={{ height: '400vh' }}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center section-padding">
        {/* Phase indicator */}
        <div className="absolute top-24 right-6 md:right-12 flex flex-col gap-2 z-10">
          {phases.map((phase, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 transition-all duration-500 ${
                currentPhase === i ? 'opacity-100' : 'opacity-30'
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentPhase === i ? 'bg-primary scale-125' : 'bg-muted-foreground'
                }`}
              />
              <span className="text-xs mono-text hidden md:block">{phase.title}</span>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="w-full max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          >
            <canvas
              ref={canvasRef}
              className="w-full rounded-lg"
              style={{ height: '400px', background: 'hsl(230, 15%, 5%)' }}
            />
          </motion.div>

          {/* Current phase text */}
          <div className="mt-8 text-center">
            <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-2">
              {phases[currentPhase].title}
            </h3>
            <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto">
              {phases[currentPhase].desc}
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="absolute bottom-8 text-xs text-muted-foreground opacity-50 mono-text text-center px-6">
          Illustrative / hypothetical visualization only. Not representative of actual trading results.
        </p>
      </div>
    </div>
  );
}
