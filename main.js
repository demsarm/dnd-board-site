import * as THREE from "https://esm.sh/three@0.160.0";
import { OrbitControls } from "https://esm.sh/three@0.160.0/examples/jsm/controls/OrbitControls.js";
import { layers } from "./layers.js";
import { createDirectionalLight } from "./lighting.js";
import { cfg } from "./configs.js";

export const scene = new THREE.Scene();
scene.background = new THREE.Color(0x2266dd);

const loader = new THREE.TextureLoader();
loader.load("./assets/sky-final.png", (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;
});

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.querySelector("#scene").appendChild(renderer.domElement);

export const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(...Object.values(cfg.initialCameraPosition));
camera.layers.enable(layers.default);
camera.layers.enable(layers.hoverCube);

const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enablePan = true;
orbitControls.enableDamping = true;
orbitControls.mouseButtons = {
  LEFT: THREE.MOUSE.ROTATE,
  MIDDLE: THREE.MOUSE.PAN,
  RIGHT: THREE.MOUSE.NONE,
};

export function changeControls(controls) {
  orbitControls.mouseButtons = {
    LEFT: controls.LEFT,
    MIDDLE: controls.MIDDLE,
    RIGHT: controls.RIGHT,
    ...orbitControls.mouseButtons,
  };
  orbitControls.update();
}

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

camera.position.z = 5;
orbitControls.update();

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
