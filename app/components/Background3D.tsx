"use client";
import { useRef, useState, Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";
import * as THREE from "three";

function StarField(props: any) {
  const ref = useRef<any>(null);
  
  // Initialize with null or empty array to avoid server/client mismatch
  const [sphere, setSphere] = useState<Float32Array | null>(null);

  useEffect(() => {
    // Generate stars ONLY on the client side after mount
    const data = new Float32Array(8000 * 3);
    setSphere(random.inSphere(data, { radius: 1.5 }));
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      // 1. Scroll Interaction
      const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
      
      // 2. Mouse Interaction
      // We use state.pointer which is normalized (-1 to 1)
      const mouseX = state.pointer.x; 
      const mouseY = state.pointer.y; 

      // Target rotation: Scroll affects Z (twist) and X (tilt). Mouse affects Y (pan) and X (tilt).
      const targetRotationZ = scrollY * 0.0005; 
      const targetRotationY = mouseX * 0.05; 
      const targetRotationX = (scrollY * 0.0002) + (mouseY * 0.05);

      // 3. Smooth Interpolation
      ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, targetRotationZ, 0.05);
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, targetRotationX, 0.05);
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetRotationY, 0.05);
    }
  });

  // Don't render points until sphere data is generated (fixes hydration error)
  if (!sphere) return null;

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#CCCCCC" // Bright Gray
          size={0.0025}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={1}
        />
      </Points>
    </group>
  );
}

function SceneEffects() {
  const { scene } = useThree();
  // Deep black fog for depth
  scene.fog = new THREE.Fog("#050505", 1, 2.8);
  return null;
}

export default function Background3D() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[#050505]">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <SceneEffects />
        <Suspense fallback={null}>
          <StarField />
        </Suspense>
      </Canvas>
    </div>
  );
}