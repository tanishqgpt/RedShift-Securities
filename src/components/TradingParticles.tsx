import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Props {
  scrollProgress: number;
}

export default function TradingParticles({ scrollProgress }: Props) {
  const meshRef = useRef<THREE.Points>(null);
  const count = 600;

  const [positions, basePositions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const base = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 16;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 8;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      base[i * 3] = x;
      base[i * 3 + 1] = y;
      base[i * 3 + 2] = z;

      // Default: cool blue-white
      col[i * 3] = 0.5 + Math.random() * 0.3;
      col[i * 3 + 1] = 0.55 + Math.random() * 0.3;
      col[i * 3 + 2] = 0.7 + Math.random() * 0.3;

      siz[i] = Math.random() * 2.5 + 0.5;
    }
    return [pos, base, col, siz];
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const posAttr = meshRef.current.geometry.attributes.position;
    const colAttr = meshRef.current.geometry.attributes.color;
    const arr = posAttr.array as Float32Array;
    const colArr = colAttr.array as Float32Array;
    const p = scrollProgress;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const bx = basePositions[ix];
      const by = basePositions[ix + 1];
      const bz = basePositions[ix + 2];

      if (p < 0.25) {
        // Phase 1: chaotic drift
        const chaos = p / 0.25;
        arr[ix] = bx + Math.sin(time * 0.5 + i * 0.1) * chaos * 1.5;
        arr[ix + 1] = by + Math.cos(time * 0.3 + i * 0.05) * chaos * 1.2;
        arr[ix + 2] = bz + Math.sin(time * 0.4 + i * 0.08) * chaos * 0.8;
        // Noisy warm colors
        colArr[ix] = 0.5 + chaos * 0.3;
        colArr[ix + 1] = 0.5 - chaos * 0.15;
        colArr[ix + 2] = 0.6 - chaos * 0.2;
      } else if (p < 0.5) {
        // Phase 2: stress — particles pulled down, red shift
        const stress = (p - 0.25) / 0.25;
        arr[ix] = bx + Math.sin(time * 0.8 + i * 0.1) * 1.5;
        arr[ix + 1] = by - stress * 2 + Math.sin(time * 0.6 + i * 0.03) * (1 - stress) * 1.5;
        arr[ix + 2] = bz;
        colArr[ix] = 0.8 + stress * 0.2;
        colArr[ix + 1] = 0.35 - stress * 0.2;
        colArr[ix + 2] = 0.3 - stress * 0.15;
      } else if (p < 0.75) {
        // Phase 3: organizing — particles form flowing streams
        const order = (p - 0.5) / 0.25;
        const streamY = Math.sin((bx + time * 0.5) * 0.5) * 3 * (1 - order * 0.5);
        arr[ix] = bx + Math.sin(time * 0.3 + i * 0.02) * (1 - order) * 1.5;
        arr[ix + 1] = by * (1 - order) + streamY * order;
        arr[ix + 2] = bz * (1 - order * 0.5);
        // Transition to green
        colArr[ix] = 0.3 + (1 - order) * 0.5;
        colArr[ix + 1] = 0.5 + order * 0.3;
        colArr[ix + 2] = 0.3 + order * 0.2;
      } else {
        // Phase 4: resolved — smooth upward flow, green/gold
        const resolve = (p - 0.75) / 0.25;
        const wave = Math.sin((bx + time * 0.4) * 0.4) * 2;
        arr[ix] = bx + Math.sin(time * 0.15 + i * 0.01) * 0.3;
        arr[ix + 1] = by * 0.3 + wave + resolve * 1.5;
        arr[ix + 2] = bz * 0.3;
        colArr[ix] = 0.2 + resolve * 0.6;
        colArr[ix + 1] = 0.7 + resolve * 0.1;
        colArr[ix + 2] = 0.3 + resolve * 0.2;
      }
    }
    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;

    meshRef.current.rotation.y = time * 0.015;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={count} array={sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
