import * as THREE from "https://esm.sh/three@0.160.0";
import { OutlinePass } from "https://esm.sh/three@0.160.0/examples/jsm/postprocessing/OutlinePass.js";
import { composer } from "./composer.js";
import { camera } from "./camera.js";
import { scene } from "./scene.js";
import { getObjectOutlineCode } from "../utils/utils.js";
import { layers } from "../config/layers.js";
import { cfg } from "../config/configs.js";

const colors = {
  0b111: new THREE.Color(0xffffff),
  0b110: new THREE.Color(0xffff00),
  0b101: new THREE.Color(0xff00ff),
  0b011: new THREE.Color(0x00ffff),
  0b100: new THREE.Color(0xff0000),
  0b010: new THREE.Color(0x00ff00),
  0b001: new THREE.Color(0x0000ff),
};

const passes = Object.fromEntries(
  Object.entries(colors).map(([layer, color]) => {
    const outlinePass = new OutlinePass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      scene,
      camera
    );
    outlinePass.edgeStrength = 3;
    outlinePass.edgeGlow = 0;
    outlinePass.edgeThickness = 1;
    outlinePass.visibleEdgeColor.set(
      color.clone().multiplyScalar(cfg.outlines.visibleEdgeColorFactor)
    );
    outlinePass.hiddenEdgeColor.set(
      color.clone().multiplyScalar(cfg.outlines.hiddenEdgeColorFactor)
    );

    outlinePass.selectedObjects = [];
    composer.addPass(outlinePass);
    return [layer, outlinePass];
  })
);

export const colorLayers = [
  new THREE.Layers(),
  new THREE.Layers(),
  new THREE.Layers(),
];
colorLayers[0].set(layers.outlineRed);
colorLayers[1].set(layers.outlineGreen);
colorLayers[2].set(layers.outlineBlue);

Object.freeze(colors);
Object.freeze(colorLayers);
Object.freeze(passes);

export function updateOutlineObjects() {
  Object.entries(passes).forEach(([, pass]) => {
    pass.selectedObjects = [];
  });
  scene.traverse((object) => {
    if (!object.isMesh) return;
    const activeLayers = getObjectOutlineCode(object);
    if (activeLayers === 0) return;
    const pass = passes[activeLayers];
    if (!pass) return;
    pass.selectedObjects.push(object);
  });
}
