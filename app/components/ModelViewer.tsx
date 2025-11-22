"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls, Float, Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const ref = useRef<any>(null);

  useFrame((state) => {
    if (ref.current) {
      // Simple idle rotation only
      ref.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  // RESET POSITION: X=0, Y=0, Z=0. We will move the CAMERA/CONTAINER instead.
  return <primitive object={scene} ref={ref} scale={5.0} position={[0, 0, 0]} />;
}

export default function ModelViewer({ modelPath }: { modelPath: string }) {
  return (
    <div className="w-full h-full relative z-20 cursor-grab active:cursor-grabbing">
      <Canvas dpr={[1, 2]} shadows={false} camera={{ fov: 45, position: [0, 0, 10] }}>
        <Suspense fallback={null}>
          <Environment preset="studio" />
          
          <PresentationControls 
            speed={1.5} 
            global 
            zoom={1.0} 
            polar={[-0.1, Math.PI / 4]}
            rotation={[0, -0.3, 0]}
          >
            <Stage environment={null} intensity={1} adjustCamera={false} shadows={false}>
              <Model url={modelPath} />
            </Stage>
          </PresentationControls>
          
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#blue" /> 
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}