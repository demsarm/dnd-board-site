export function randColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return (r << 16) | (g << 8) | b;
}

export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
