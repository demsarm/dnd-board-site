import * as THREE from "https://esm.sh/three@0.160.0";
import {
  createDirectionalLight,
  directionalLightTimeOfDay,
} from "./src/core/lighting.js";
import { scene } from "./src/core/scene.js";
import { composer } from "./src/core/composer.js";
import { camera, orbitControls } from "./src/core/camera.js";
import { layers } from "./src/config/layers.js";

const loader = new THREE.TextureLoader();
loader.load("./src/assets/sky-final.png", (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;
});

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const {
  light: directionalLight,
  target: lightTarget,
  helper: lightHelper,
} = createDirectionalLight();
scene.add(directionalLight);
scene.add(lightTarget);
directionalLightTimeOfDay(directionalLight, 12);
// if you need help visualizing the light
// scene.add(lightHelper);

export function setTimeOfDay(hour) {
  directionalLightTimeOfDay(directionalLight, hour);
  lightHelper.update();
}

function animate() {
  requestAnimationFrame(animate);
  orbitControls.update();

  // Enable all layers you want visible
  camera.layers.enable(layers.default);
  camera.layers.enable(layers.hoverCube);
  camera.layers.enable(layers.outlineRed);
  camera.layers.enable(layers.outlineGreen);
  camera.layers.enable(layers.outlineBlue);

  composer.render();
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  composer.setSize(window.innerWidth, window.innerHeight);
});
