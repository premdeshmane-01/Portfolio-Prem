// "use client";
// import { useRef, Suspense } from "react";
// import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import { useGLTF, Environment } from "@react-three/drei";
// import * as THREE from "three";

// function ScrollModel({ url }: { url: string }) {
//   const { scene } = useGLTF(url);
//   const ref = useRef<any>(null);

//   useFrame((state) => {
//     if (ref.current) {
//       // Just a slow idle float
//       ref.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
//       // Slow idle rotation
//       ref.current.rotation.y += 0.001;
//     }
//   });

//   return <primitive object={scene} ref={ref} scale={1.5} />;
// }

// function SceneEffects() {
//   const { scene } = useThree();
//   scene.fog = new THREE.Fog("#DEDEDE", 5, 20); 
//   return null;
// }

// // export default function Background3D() {
// //   const modelPath = "/models/model1.glb"; 

// //   return (
// //     <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[#DEDEDE] transition-opacity duration-1000">
// //       <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
// //         <SceneEffects />
// //         <ambientLight intensity={0.8} /> 
// //         <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" />
// //         <Suspense fallback={null}>
// //            <Environment preset="studio" />
// //            <ScrollModel url={modelPath} />
// //         </Suspense>
// //       </Canvas>
// //     </div>
// //   );
// // }