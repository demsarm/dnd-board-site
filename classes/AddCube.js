import * as THREE from "https://esm.sh/three@0.160.0";
import { layers } from "../layers.js";
import { getMouseOver } from "../getMouseOver.js";
import { cfg } from "../configs.js";

export class AddCube {
  constructor(scene, changeOpacity = true) {
    this.__forceHide = false;
    this.__scene = scene;
    this.__forcedColor = null;

    this.__hoverCube = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({
        color: 0xff0000,
        transparent: true,
        opacity: 0.5,
      })
    );

    this.__hoverCube.layers.set(layers.hoverCube);
    this.__hoverCube.visible = false;

    this.__scene.add(this.__hoverCube);

    if (changeOpacity) {
      setInterval(() => {
        this.__hoverCube.material.opacity =
          Math.abs(Math.sin(Date.now() / 2000)) * 0.4 + 0.3;
      }, 100);
    }

    document.addEventListener("mousemove", (event) => {
      this.update(event);
    });
  }

  update(event) {
    const hoveredObject = getMouseOver(event);
    if (hoveredObject && hoveredObject.face && hoveredObject.object) {
      const normal = hoveredObject.face.normal;
      const coords = hoveredObject.object.position.clone();
      if (this.__forcedColor) {
        this.__hoverCube.material.color.set(this.__forcedColor);
      } else {
        this.__hoverCube.material.color.copy(
          hoveredObject.object.material.color
        );
      }

      this.__hoverCube.material.color.convertSRGBToLinear();
      const pos = coords.add(normal);
      if (
        Math.abs(pos.x) > cfg.xLimit ||
        Math.abs(pos.y) > cfg.yLimit ||
        Math.abs(pos.z) > cfg.zLimit
      ) {
        this.__hoverCube.visible = false;
        return;
      } else {
        this.__hoverCube.visible = true;
      }

      this.__hoverCube.position.copy(pos);
      this.__hoverCube.visible = true && !this.__forceHide;
    } else {
      this.__hoverCube.visible = false;
    }
  }

  /**
   * @param {THREE.Color | number | string} value
   */
  set forcedColor(value) {
    this.__forcedColor = value;
  }

  /**
   * @param {boolean} value
   */
  set visible(value) {
    this.__forceHide = !value;
  }
}
