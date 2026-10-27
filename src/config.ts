// Only publish URLs that the Academy has verified. Null destinations show an honest notice.
export const site = {
  logoUrl: null as string | null,
  facebook: null as string | null,
  instagram: null as string | null,
  contactEmail: null as string | null,
};
export const motion = {
  desktopNodes: 64,
  mobileNodes: 28,
  rotationSpeed: 0.055,
  pointerStrength: 0.12,
  maxDpr: 1.5,
};
export const sceneFrames = [
  { at: 0, camera: 5.3, spread: 0, opacity: 1 },
  { at: 0.16, camera: 6, spread: 1, opacity: 0.65 },
  { at: 0.27, camera: 6.5, spread: 0.4, opacity: 0.16 },
  { at: 0.43, camera: 5.8, spread: 0.2, opacity: 0.12 },
  { at: 0.56, camera: 6.3, spread: 0.6, opacity: 0.12 },
  { at: 0.68, camera: 6, spread: 0.35, opacity: 0.12 },
  { at: 0.8, camera: 5.7, spread: 0.2, opacity: 0.18 },
  { at: 0.9, camera: 5.3, spread: 0, opacity: 0.7 },
  { at: 1, camera: 5.3, spread: 0, opacity: 0.8 },
];
export function sceneAt(value: number) {
  const p = Math.max(0, Math.min(1, Number.isFinite(value) ? value : 0));
  const end = sceneFrames.findIndex((f) => f.at > p);
  if (end < 0) return sceneFrames[sceneFrames.length - 1];
  const a = sceneFrames[Math.max(0, end - 1)],
    b = sceneFrames[end];
  const t = Math.max(0, Math.min(1, (p - a.at) / (b.at - a.at || 1)));
  return {
    at: p,
    camera: a.camera + (b.camera - a.camera) * t,
    spread: a.spread + (b.spread - a.spread) * t,
    opacity: a.opacity + (b.opacity - a.opacity) * t,
  };
}
