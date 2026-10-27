import { Component, lazy, Suspense, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { sceneAt } from "./config";
const Scene = lazy(() => import("./Scene"));
class SceneBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
export function StaticCore() {
  return (
    <svg className="static-core" viewBox="0 0 600 600" aria-hidden="true">
      <defs>
        <radialGradient id="core-glow">
          <stop stopColor="#28DFFF" stopOpacity=".35" />
          <stop offset="1" stopColor="#1363DF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="300" cy="300" r="250" fill="url(#core-glow)" />
      {[0, 60, 120].map((a) => (
        <ellipse
          key={a}
          cx="300"
          cy="300"
          rx="205"
          ry="80"
          transform={`rotate(${a} 300 300)`}
          fill="none"
          stroke="#28DFFF"
          strokeOpacity=".5"
        />
      ))}
      <circle cx="300" cy="300" r="160" fill="none" stroke="#1363DF" />
      {Array.from({ length: 32 }, (_, i) => (
        <circle
          key={i}
          cx={300 + Math.sin(i * 2.4) * 180 * Math.sin(i)}
          cy={300 + Math.cos(i * 2.4) * 180}
          r={i % 4 === 0 ? 4 : 2}
          fill="#80efff"
        />
      ))}
      <circle cx="300" cy="300" r="12" fill="#d4fbff" />
    </svg>
  );
}
export default function Visual() {
  const [progress, setProgress] = useState(0),
    [active, setActive] = useState(!document.hidden),
    [reduced, setReduced] = useState(false),
    [mobile, setMobile] = useState(false),
    [ready, setReady] = useState(false),
    [failed, setFailed] = useState(false);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)"),
      small = matchMedia("(max-width: 767px)");
    const update = () => {
      setReduced(media.matches);
      setMobile(small.matches);
    };
    update();
    media.addEventListener("change", update);
    small.addEventListener("change", update);
    let raf = 0;
    const scroll = () => {
      if (!raf)
        raf = requestAnimationFrame(() => {
          setProgress(
            window.scrollY /
              Math.max(1, document.documentElement.scrollHeight - innerHeight),
          );
          raf = 0;
        });
    };
    const visibility = () => setActive(!document.hidden);
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll);
    document.addEventListener("visibilitychange", visibility);
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    const saveData = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection?.saveData;
    setReady(!!gl && !saveData);
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
    scroll();
    return () => {
      cancelAnimationFrame(raf);
      media.removeEventListener("change", update);
      small.removeEventListener("change", update);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", scroll);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  return (
    <div
      className="knowledge-scene"
      aria-hidden="true"
      style={{ opacity: mobile ? 0.5 : sceneAt(progress).opacity }}
    >
      <div className="scene-aura" />
      {ready && !failed && !reduced ? (
        <SceneBoundary fallback={<StaticCore />}>
          <Suspense fallback={<StaticCore />}>
            <Scene
              progress={progress}
              reduced={reduced}
              mobile={mobile}
              active={active}
              onFailure={() => setFailed(true)}
            />
          </Suspense>
        </SceneBoundary>
      ) : (
        <StaticCore />
      )}
    </div>
  );
}
