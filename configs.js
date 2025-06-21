const initialGridSize = 11;

export const cfg = {
  xLimit: 50,
  yLimit: 50,
  zLimit: 50,

  initialCameraPosition: {
    x: 0,
    y: 5,
    z: 7,
  },

  initialGridSize,
  initialGrid: Array.from({ length: initialGridSize }, (_, i) =>
    Array.from({ length: initialGridSize }, (_, j) => ({
      x: i - Math.floor(initialGridSize / 2),
      y: 0,
      z: j - Math.floor(initialGridSize / 2),
      color: (i + j) % 2 === 0 ? 0xffffff : 0xcccccc,
    }))
  ).flat(Infinity),

  lighting: {
    mapSize: 1 << 13,
  },
};
