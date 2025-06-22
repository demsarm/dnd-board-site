import * as THREE from "https://esm.sh/three@0.160.0";
import { cfg } from "./configs.js";

export function createDirectionalLight() {
  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(100, 100, 100);
  light.target.position.set(0, 0, 0);
  light.castShadow = true;

  // this math we did together
  const a = 100; // cube size
  const sqrt6 = Math.sqrt(6);
  const sqrt2 = Math.sqrt(2);

  const left = -(a * sqrt6) / 2;
  const right = (a * sqrt6) / 2;

  const top = (2 * a * sqrt2) / 2;
  const bottom = -(2 * a * sqrt2) / 2;

  light.shadow.camera.left = left;
  light.shadow.camera.right = right;
  light.shadow.camera.top = top;
  light.shadow.camera.bottom = bottom;

  light.shadow.camera.near = 0.1;
  light.shadow.camera.far = 300;
  light.shadow.mapSize.set(cfg.lighting.mapSize, cfg.lighting.mapSize);

  const helper = new THREE.CameraHelper(light.shadow.camera);

  return { light, target: light.target, helper };
}

export function directionalLightTimeOfDay(light, hour) {
  hour -= 6;
  hour = hour % 24;
  const angle = (hour / 24) * Math.PI * 2; // convert hour to radians
  light.position.set(
    100 * Math.cos(angle),
    100 * Math.sin(angle),
    100 * Math.sin(angle)
  );
  light.target.position.set(0, 0, 0);
  light.updateMatrixWorld();
}
