import { scene } from "./scene.js";
import { Grid } from "../classes/Grid.js";
import { cfg } from "../config/configs.js";

const { initialGrid } = cfg;

export const grid = new Grid(scene, initialGrid);
