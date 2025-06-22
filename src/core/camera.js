import * as THREE from "https://esm.sh/three@0.160.0";
import { OrbitControls } from "https://esm.sh/three@0.160.0/examples/jsm/controls/OrbitControls.js";
import { layers } from "../config/layers.js";
import { cfg } from "../config/configs.js";
import { renderer } from "./renderer.js";

export const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(...Object.values(cfg.initialCameraPosition));
camera.layers.enable(layers.default);
camera.layers.enable(layers.hoverCube);

export const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enablePan = true;
orbitControls.enableDamping = true;
orbitControls.mouseButtons = {
  LEFT: THREE.MOUSE.ROTATE,
  MIDDLE: THREE.MOUSE.PAN,
  RIGHT: THREE.MOUSE.NONE,
};

camera.position.z = 5;
orbitControls.update();

export function changeControls(controls) {
  orbitControls.mouseButtons = {
    ...orbitControls.mouseButtons,
    LEFT: controls.LEFT,
    MIDDLE: controls.MIDDLE,
    RIGHT: controls.RIGHT,
  };
  orbitControls.update();
}
