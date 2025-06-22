import * as THREE from "https://esm.sh/three@0.160.0";
import { createDirectionalLight } from "./lighting.js";
import { scene } from "./scene.js";
import { composer } from "./composer.js";
import { camera, orbitControls } from "./camera.js";
import { layers } from "./layers.js";

const loader = new THREE.TextureLoader();
loader.load("./assets/sky-final.png", (texture) => {
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
// if you need help visualizing the light
// scene.add(lightHelper);

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
