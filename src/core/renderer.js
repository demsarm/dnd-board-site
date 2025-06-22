import * as THREE from "https://esm.sh/three@0.160.0";

export const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.querySelector("#scene").appendChild(renderer.domElement);
