import { useRef, useEffect, useCallback } from 'react';

interface Props {
  scrollProgress: number;
  phase: number;
}

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  speed: number;
  hue: number;
  sat: number;
  light: number;
  alpha: number;
  drift: number;
}

export default function CosmicParticles({ scrollProgress, phase }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);

  const initParticles = useCallback((w: number, h: number) => {
    const particles: Particle[] = [];
    const count = Math.min(80, Math.floor((w * h) / 15000));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        baseX: Math.random() * w,
        baseY: Math.random() * h,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.5 + 0.2,
        hue: Math.random() > 0.6 ? 0 + Math.random() * 20 : 220 + Math.random() * 30,
        sat: 40 + Math.random() * 40,
        light: 40 + Math.random() * 30,
        alpha: Math.random() * 0.4 + 0.1,
        drift: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      if (particlesRef.current.length === 0) initParticles(w, h);
    };
    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      timeRef.current += 0.016;
      const t = timeRef.current;

      ctx.clearRect(0, 0, w, h);

      for (const p of particlesRef.current) {
        // Scroll-driven vertical drift
        const scrollOffset = scrollProgress * h * 0.3;
        const driftX = Math.sin(t * p.speed + p.drift) * 30;
        const driftY = Math.cos(t * p.speed * 0.7 + p.drift) * 20 - scrollOffset * p.speed;

        p.x = ((p.baseX + driftX) % w + w) % w;
        p.y = ((p.baseY + driftY) % h + h) % h;

        // Phase-based color shift
        let hue = p.hue;
        let alpha = p.alpha;
        if (phase === 1) {
          hue = p.hue < 100 ? 0 : p.hue;
          alpha = p.alpha * 1.3;
        } else if (phase >= 2) {
          hue = p.hue < 100 ? 140 + Math.random() * 10 : p.hue;
          alpha = p.alpha * (phase === 3 ? 1.5 : 1.1);
        }

        // Draw glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        gradient.addColorStop(0, `hsla(${hue}, ${p.sat}%, ${p.light}%, ${alpha})`);
        gradient.addColorStop(1, `hsla(${hue}, ${p.sat}%, ${p.light}%, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Draw core
        ctx.fillStyle = `hsla(${hue}, ${p.sat}%, ${p.light + 20}%, ${alpha * 1.5})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [scrollProgress, phase, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}
