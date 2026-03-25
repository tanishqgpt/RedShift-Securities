import { useRef, useState, useCallback, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import TradingParticles from './TradingParticles';
import DashboardOverlay from './DashboardOverlay';

export default function ChartNarrative() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);

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

  return (
    <div ref={containerRef} className="relative" style={{ height: '400vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Full-screen 3D particle field */}
        <div className="absolute inset-0 z-0">
          <Suspense fallback={null}>
            <Canvas
              camera={{ position: [0, 0, 8], fov: 55 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: true }}
              style={{ background: 'transparent' }}
            >
              <ambientLight intensity={0.2} />
              <TradingParticles scrollProgress={scrollProgress} />
            </Canvas>
          </Suspense>
        </div>

        {/* Dark gradient overlay for readability */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: `radial-gradient(ellipse at center, hsl(230 15% 5% / 0.3) 0%, hsl(230 15% 5% / 0.7) 70%, hsl(230 15% 5% / 0.95) 100%)`,
          }}
        />

        {/* Glassmorphic dashboard overlay */}
        <DashboardOverlay scrollProgress={scrollProgress} currentPhase={currentPhase} />
      </div>
    </div>
  );
}
