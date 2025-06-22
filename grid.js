import { scene } from "./scene.js";
import { Grid } from "./classes/Grid.js";
import { cfg } from "./configs.js";

const { initialGrid } = cfg;

export const grid = new Grid(scene, initialGrid);
