"use client";

import { ContactShadows, Float, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

function Laptop() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, -0.28 + state.pointer.x * 0.08, 0.04);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 0.03 - state.pointer.y * 0.025, 0.04);
  });
  return (
    <group ref={group} rotation={[0.03, -0.28, 0]} position={[0, -0.1, 0]}>
      <RoundedBox args={[3.35, 2.08, 0.13]} radius={0.09} smoothness={4} position={[0, 1.05, -0.25]}>
        <meshStandardMaterial color="#071529" metalness={0.65} roughness={0.22} />
      </RoundedBox>
      <mesh position={[0, 1.05, -0.17]}>
        <planeGeometry args={[3.05, 1.78]} />
        <meshStandardMaterial color="#eef4ff" emissive="#1163df" emissiveIntensity={0.1} />
      </mesh>
      <mesh position={[-0.97, 1.45, -0.15]}>
        <planeGeometry args={[0.72, 0.5]} />
        <meshBasicMaterial color="#1363df" />
      </mesh>
      <mesh position={[0.32, 1.45, -0.15]}>
        <planeGeometry args={[1.64, 0.5]} />
        <meshBasicMaterial color="#dce8fa" />
      </mesh>
      {[0, 1, 2].map((item) => (
        <mesh key={item} position={[-0.4 + item * 0.62, 0.75, -0.15]}>
          <planeGeometry args={[0.48, 0.52]} />
          <meshBasicMaterial color={item === 1 ? "#28dfff" : item === 2 ? "#f4b544" : "#ffffff"} />
        </mesh>
      ))}
      <group rotation={[-0.12, 0, 0]} position={[0, -0.02, 0.77]}>
        <RoundedBox args={[3.7, 1.76, 0.12]} radius={0.12} smoothness={4}>
          <meshStandardMaterial color="#142238" metalness={0.75} roughness={0.26} />
        </RoundedBox>
        <RoundedBox args={[1.25, 0.68, 0.025]} radius={0.08} smoothness={3} position={[0, 0.1, 0.075]}>
          <meshStandardMaterial color="#26364d" roughness={0.4} />
        </RoundedBox>
        {Array.from({ length: 7 }).map((_, x) => Array.from({ length: 4 }).map((__, z) => (
          <mesh key={`${x}-${z}`} position={[-1.35 + x * 0.45, 0.55 - z * 0.28, 0.075]}>
            <boxGeometry args={[0.34, 0.17, 0.025]} />
            <meshStandardMaterial color="#314258" />
          </mesh>
        )))}
      </group>
    </group>
  );
}

function FloatingPanels() {
  return (
    <>
      <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.3}>
        <group position={[-2.45, 1.9, 0.8]} rotation={[0, 0.35, -0.06]}>
          <RoundedBox args={[1.25, 0.72, 0.06]} radius={0.08} smoothness={3}><meshStandardMaterial color="#ffffff" /></RoundedBox>
          <mesh position={[-0.3, 0.08, 0.04]}><circleGeometry args={[0.13, 24]} /><meshBasicMaterial color="#f4b544" /></mesh>
          <mesh position={[0.25, 0.12, 0.04]}><planeGeometry args={[0.48, 0.08]} /><meshBasicMaterial color="#a6b8d1" /></mesh>
          <mesh position={[0.12, -0.12, 0.04]}><planeGeometry args={[0.75, 0.07]} /><meshBasicMaterial color="#d5dfeb" /></mesh>
        </group>
      </Float>
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.24}>
        <group position={[2.35, 1.3, 0.45]} rotation={[0, -0.4, 0.06]}>
          <RoundedBox args={[1.25, 1.05, 0.06]} radius={0.08} smoothness={3}><meshStandardMaterial color="#071b38" /></RoundedBox>
          {[0, 1, 2].map((n) => <mesh key={n} position={[-0.3 + n * 0.3, -0.15 + n * 0.22, 0.04]}><boxGeometry args={[0.18, 0.18 + n * 0.16, 0.03]} /><meshBasicMaterial color={n === 2 ? "#28dfff" : "#1363df"} /></mesh>)}
        </group>
      </Float>
    </>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#ecf3fb"]} />
      <ambientLight intensity={1.55} />
      <directionalLight position={[4, 6, 5]} intensity={3.2} color="#ffffff" />
      <pointLight position={[-4, 2, 3]} intensity={25} color="#28dfff" distance={8} />
      <Suspense fallback={null}>
        <Laptop />
        <FloatingPanels />
        <ContactShadows position={[0, -1.22, 0]} opacity={0.28} scale={8} blur={2.8} far={4} />
      </Suspense>
    </>
  );
}

function StaticFallback() {
  return (
    <div className="workspace-fallback" role="img" aria-label="Illustration of an AI creative workspace moving from idea to build to review">
      <div className="fallback-chip">IDEA</div><div className="fallback-arrow">→</div><div className="fallback-chip active">BUILD</div><div className="fallback-arrow">→</div><div className="fallback-chip">REVIEW</div>
      <div className="fallback-laptop"><div className="fallback-screen"><i /><i /><i /></div><div className="fallback-base" /></div>
    </div>
  );
}

export function WorkspaceVisual() {
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(motionQuery.matches);
    updateMotion();
    motionQuery.addEventListener("change", updateMotion);
    try {
      const canvas = document.createElement("canvas");
      setWebgl(Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl")));
    } catch { setWebgl(false); }
    return () => motionQuery.removeEventListener("change", updateMotion);
  }, []);
  if (!webgl || reducedMotion) return <StaticFallback />;
  return (
    <div className="workspace-canvas" aria-hidden="true">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 1.8, 7.2], fov: 39 }} gl={{ antialias: true, powerPreference: "high-performance" }}>
        <Scene />
      </Canvas>
    </div>
  );
}
