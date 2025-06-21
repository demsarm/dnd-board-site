export const cfg = {
  xLimit: 50,
  yLimit: 50,
  zLimit: 50,

  initialGrid: [
    { x: -1, y: -1, z: -1, color: 0xff0000 },
    { x: -1, y: -1, z: 0, color: 0x00ff00 },
    { x: -1, y: -1, z: 1, color: 0x0000ff },
    { x: 0, y: -1, z: -1, color: 0xffff00 },
    { x: 0, y: -1, z: 0, color: 0xff00ff },
    { x: 0, y: -1, z: 1, color: 0x00ffff },
    { x: 1, y: -1, z: -1, color: 0xffffff },
    { x: 1, y: -1, z: 0, color: 0x000000 },
    { x: 1, y: -1, z: 1, color: 0x808080 },
  ],

  lighting: {
    mapSize: 1 << 13,
  },
};
