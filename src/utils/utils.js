import { colorLayers } from "../core/outlines.js";

export function randColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return (r << 16) | (g << 8) | b;
}

export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function getObjectOutlineCode(object) {
  let code = 0;
  if (object.layers.test(colorLayers[0])) {
    code |= 0b100; // bit 2
  }
  if (object.layers.test(colorLayers[1])) {
    code |= 0b010; // bit 1
  }
  if (object.layers.test(colorLayers[2])) {
    code |= 0b001; // bit 0
  }
  return code;
}
