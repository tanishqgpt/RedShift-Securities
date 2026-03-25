import { useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleField() {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const count = 800;

  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;

      // Redshift-inspired: mix between warm red/coral and cool blue-white
      const t = Math.random();
      if (t < 0.3) {
        // Redshift particles
        col[i * 3] = 0.85 + Math.random() * 0.15;
        col[i * 3 + 1] = 0.2 + Math.random() * 0.2;
        col[i * 3 + 2] = 0.15 + Math.random() * 0.15;
      } else if (t < 0.6) {
        // Coral / infrared
        col[i * 3] = 0.9 + Math.random() * 0.1;
        col[i * 3 + 1] = 0.35 + Math.random() * 0.15;
        col[i * 3 + 2] = 0.25 + Math.random() * 0.1;
      } else {
        // Cool white/blue distant stars
        col[i * 3] = 0.6 + Math.random() * 0.4;
        col[i * 3 + 1] = 0.65 + Math.random() * 0.35;
        col[i * 3 + 2] = 0.75 + Math.random() * 0.25;
      }

      siz[i] = Math.random() * 3 + 0.5;
    }

    return [pos, col, siz];
  }, []);

  const handlePointerMove = useCallback((e: { clientX: number; clientY: number }) => {
    mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }, []);

  // Attach listener
  useMemo(() => {
    window.addEventListener('mousemove', handlePointerMove);
    return () => window.removeEventListener('mousemove', handlePointerMove);
  }, [handlePointerMove]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    meshRef.current.rotation.y = time * 0.02 + mouseRef.current.x * 0.1;
    meshRef.current.rotation.x = mouseRef.current.y * 0.05;

    const posAttr = meshRef.current.geometry.attributes.position;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      arr[ix + 1] += Math.sin(time * 0.3 + i * 0.01) * 0.002;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function OrbitalRing({ radius, speed, color }: { radius: number; speed: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.getElapsedTime() * speed;
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.005, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.15} />
    </mesh>
  );
}

export default function CosmicScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <ParticleField />
        <OrbitalRing radius={3.5} speed={0.05} color="#d44040" />
        <OrbitalRing radius={4.2} speed={-0.03} color="#e07050" />
        <OrbitalRing radius={5} speed={0.02} color="#a03535" />
      </Canvas>
    </div>
  );
}
