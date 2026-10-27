import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { motion, sceneAt } from "./config";

function Core({
  progress,
  reduced,
  mobile,
}: {
  progress: number;
  reduced: boolean;
  mobile: boolean;
}) {
  const root = useRef<THREE.Group>(null);
  const nodeGroup = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const move = (e: PointerEvent) => {
      pointer.current = {
        x: (e.clientX / innerWidth) * 2 - 1,
        y: 1 - (e.clientY / innerHeight) * 2,
      };
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);
  const points = useMemo(
    () =>
      Array.from(
        { length: mobile ? motion.mobileNodes : motion.desktopNodes },
        (_, i) => {
          const n = mobile ? motion.mobileNodes : motion.desktopNodes;
          const y = 1 - (i / (n - 1)) * 2;
          const r = Math.sqrt(1 - y * y),
            theta = i * Math.PI * (3 - Math.sqrt(5));
          return new THREE.Vector3(
            Math.cos(theta) * r * 1.7,
            y * 1.7,
            Math.sin(theta) * r * 1.7,
          );
        },
      ),
    [mobile],
  );
  const connections = useMemo(
    () =>
      points.flatMap((p, i) =>
        points
          .slice(i + 1)
          .filter((q) => p.distanceTo(q) < 0.76)
          .map((q) => [p, q] as [THREE.Vector3, THREE.Vector3]),
      ),
    [points],
  );
  const frame = sceneAt(progress);
  useFrame((state, dt) => {
    if (!root.current) return;
    camera.position.z = THREE.MathUtils.lerp(
      camera.position.z,
      frame.camera,
      0.08,
    );
    if (!reduced) {
      root.current.rotation.y += Math.min(dt, 0.05) * motion.rotationSpeed;
      root.current.rotation.x = THREE.MathUtils.lerp(
        root.current.rotation.x,
        pointer.current.y * motion.pointerStrength,
        0.025,
      );
      root.current.position.x = THREE.MathUtils.lerp(
        root.current.position.x,
        pointer.current.x * 0.1,
        0.025,
      );
    }
    nodeGroup.current?.children.forEach((node, i) => {
      const p = points[i];
      const angle = ((i % 4) * Math.PI) / 2;
      const cluster = new THREE.Vector3(
        Math.cos(angle) * 1.5,
        Math.sin(angle) * 1.5,
        0,
      );
      node.position.copy(
        p
          .clone()
          .lerp(
            cluster.clone().add(p.clone().multiplyScalar(0.28)),
            frame.spread,
          ),
      );
    });
  });
  return (
    <group ref={root} rotation={[0.18, 0, -0.15]}>
      <mesh>
        <sphereGeometry args={[1.48, mobile ? 24 : 48, mobile ? 16 : 32]} />
        <meshBasicMaterial
          color="#1363DF"
          transparent
          opacity={0.055}
          wireframe
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.36, 1]} />
        <meshStandardMaterial
          color="#c2faff"
          emissive="#28DFFF"
          emissiveIntensity={2}
          wireframe
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshBasicMaterial color="#e8feff" />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[i * 0.75 + 0.4, i * 0.6, 0.35]}>
          <torusGeometry
            args={[1.85 + i * 0.12, 0.006, 6, mobile ? 80 : 160]}
          />
          <meshBasicMaterial
            color={i === 1 ? "#1363DF" : "#28DFFF"}
            transparent
            opacity={0.45}
          />
        </mesh>
      ))}
      <group ref={nodeGroup}>
        {points.map((p, i) => (
          <mesh key={i} position={p}>
            <sphereGeometry args={[i % 7 === 0 ? 0.04 : 0.02, 8, 8]} />
            <meshBasicMaterial color={i % 3 === 0 ? "#ffffff" : "#28DFFF"} />
          </mesh>
        ))}
      </group>
      {connections.map(([a, b], i) => (
        <Line
          key={i}
          points={[a, b]}
          color="#429cc8"
          transparent
          opacity={0.18 * (1 - frame.spread)}
          lineWidth={0.6}
        />
      ))}
    </group>
  );
}
export default function Scene({
  progress,
  reduced,
  active,
  mobile,
  onFailure,
}: {
  progress: number;
  reduced: boolean;
  active: boolean;
  mobile: boolean;
  onFailure: () => void;
}) {
  return (
    <Canvas
      dpr={[1, motion.maxDpr]}
      camera={{ position: [0, 0, 5.3], fov: 48 }}
      frameloop={active && !reduced ? "always" : "demand"}
      gl={{ alpha: true, antialias: !mobile, powerPreference: "low-power" }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", onFailure, {
          once: true,
        });
      }}
    >
      <ambientLight intensity={0.8} />
      <Core progress={progress} reduced={reduced} mobile={mobile} />
    </Canvas>
  );
}
