import * as THREE from "https://esm.sh/three@0.160.0";
import { updateOutlineObjects } from "../outlines.js";
import { clamp, randColor } from "../utils.js";
import { cfg } from "../configs.js";
import { layers } from "../layers.js";

export class Grid {
  constructor(scene, grid) {
    this.__scene = scene;
    this.__grid = [];
    this.__boxes = [];

    grid.forEach((cell) => {
      this.addBox(cell);
    });
  }

  addBox(cell) {
    if (
      this.__grid.some(
        (c) => c.x === cell.x && c.y === cell.y && c.z === cell.z
      )
    ) {
      console.warn("Box already exists at this position:", cell);
      return;
    }

    cell = {
      x: clamp(cell.x, -cfg.xLimit, cfg.xLimit),
      y: clamp(cell.y, -cfg.yLimit, cfg.yLimit),
      z: clamp(cell.z, -cfg.zLimit, cfg.zLimit),
      color: cell.color ?? randColor(),
    };

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
      color: cell.color,
      transparent: true,
    });
    const cube = new THREE.Mesh(geometry, material);

    // you wont get this part (probably), it's GLSL and not JS
    // what it does is slighly changes the brightness of the box sides so they arent the same color
    // which makes them easier to tell apart
    // (though then again, the code isn't THAT compliaccted, so you'll probably at least get the gist)
    cube.material.onBeforeCompile = (shader) => {
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <dithering_fragment>",
        `
        float brightness = dot(normalize(vNormal), vec3(0.0, 1.0, 0.0));
        brightness = 0.8 + 0.2 * brightness;
        gl_FragColor.rgb *= brightness;

        #include <dithering_fragment>
        `
      );
    };

    cube.position.set(cell.x, cell.y, cell.z);

    cube.castShadow = true;
    cube.receiveShadow = true;

    this.__grid.push(cell);
    this.__boxes.push(cube);
    this.__scene.add(cube);
  }

  removeBox(cell) {
    const pos = new THREE.Vector3(cell.x, cell.y, cell.z);
    const index = this.__boxes.findIndex((box) => box.position.equals(pos));

    if (index === -1) return;
    const box = this.__boxes[index];
    this.__scene.remove(box);
    box.geometry.dispose();
    box.material.dispose();

    this.__boxes.splice(index, 1);
    this.__grid.splice(index, 1);

    if (this.__boxes.length === 0) {
      console.warn("No boxes left in the grid.");
      this.__grid = [];
      this.__boxes = [];

      this.addBox({
        x: 0,
        y: 0,
        z: 0,
        color: 0xffffff,
      });
    }
  }

  changeBoxColor(cell, color) {
    const box = this.getBoxAt(cell);
    if (box) {
      box.material.color.set(color);
    }
  }

  getBoxAt(cell) {
    const pos = new THREE.Vector3(cell.x, cell.y, cell.z);
    return this.__boxes.find((box) => box.position.equals(pos));
  }

  getData() {
    return this.__grid.slice();
  }

  getBoxes() {
    return this.__boxes.slice();
  }
}
