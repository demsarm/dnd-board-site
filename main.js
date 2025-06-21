import * as THREE from "https://esm.sh/three@0.160.0";
import { createDirectionalLight } from "./lighting.js";
import { renderer } from "./renderer.js";
import { camera, orbitControls } from "./camera.js";

export const scene = new THREE.Scene();
scene.background = new THREE.Color(0x2266dd);

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
  renderer.render(scene, camera);
}
animate();

document.addEventListener("resize", () => {
  document.querySelector("#scene").style.width = window.innerWidth + "px";
  document.querySelector("#scene").style.height = window.innerHeight + "px";
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
