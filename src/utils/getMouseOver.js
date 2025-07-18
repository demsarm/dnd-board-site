import * as THREE from "https://esm.sh/three@0.160.0";
import { scene } from "../core/scene.js";
import { camera } from "../core/camera.js";
import { layers } from "../config/layers.js";

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
raycaster.layers.set(layers.default);
export function getMouseOver(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    return intersects[0];
  }

  return null;
}
