import * as THREE from "https://esm.sh/three@0.160.0";
import { grid } from "./grid.js";
import { addCube } from "./addCube.js";
import { changeControls } from "./camera.js";
import { scene } from "./scene.js";
import { updateOutlineObjects } from "./outlines.js";
import { getMouseOver } from "../utils/getMouseOver.js";
import { getObjectOutlineCode } from "../utils/utils.js";
import { layers } from "../config/layers.js";

export const modes = {
  ADD: 0,
  REMOVE: 1,
  MOVE: 2,
  MARK: 3,
  EYEDROPPER: 4,
};

export const MB = {
  LEFT: 0,
  MIDDLE: 1,
  RIGHT: 2,
};

Object.freeze(modes);

let currentColor = 0xffffff;

let moveBuffer = null;

let currentMode = modes.ADD;

export function removeRedOutline(doUpdate = true) {
  scene.traverse((object) => {
    if (getObjectOutlineCode(object) === 0b100) {
      object.layers.disable(layers.outlineRed);
    }
  });
  if (doUpdate) updateOutlineObjects();
}

document.addEventListener("mousemove", (event) => {
  removeRedOutline();
  switch (currentMode) {
    case modes.ADD:
      break;
    case modes.REMOVE:
      const hoveredObject = getMouseOver(event);
      removeRedOutline(!hoveredObject);
      if (hoveredObject) hoveredObject.object.layers.enable(layers.outlineRed);
      updateOutlineObjects();
      break;
    case modes.MOVE:
      if (moveBuffer) break;
      const moveObject = getMouseOver(event);
      if (moveObject) moveObject.object.layers.enable(layers.outlineRed);

      updateOutlineObjects();
      break;
  }
});

document.addEventListener("mouseup", (event) => {
  if (event.button !== MB.RIGHT) return;

  switch (currentMode) {
    case modes.ADD:
      addCube.visible = true;
      addCube.color = currentColor;
      const hoveredObject = getMouseOver(event);
      const coords = hoveredObject?.object?.position.clone();
      const normal = hoveredObject?.face?.normal;
      if (!hoveredObject || !coords || !normal) return;
      grid.addBox({
        x: coords.x + normal.x,
        y: coords.y + normal.y,
        z: coords.z + normal.z,
        color: addCube.color,
      });
      break;
    case modes.REMOVE:
      addCube.visible = false;
      const removeObject = getMouseOver(event);
      const removeCoords = removeObject?.object?.position.clone();
      if (!removeObject || !removeCoords) return;
      grid.removeBox({
        x: removeCoords.x,
        y: removeCoords.y,
        z: removeCoords.z,
      });
      break;
    case modes.MOVE:
      const hoverObject = getMouseOver(event);
      if (!hoverObject) return;

      if (moveBuffer) {
        const coords = hoverObject.object.position.clone();
        const normal = hoverObject.face.normal;
        grid.addBox({
          x: coords.x + normal.x,
          y: coords.y + normal.y,
          z: coords.z + normal.z,
          color: moveBuffer.material.color.getHex(),
        });
        addCube.color = null;
        addCube.visible = false;
        moveBuffer = null;
      } else {
        moveBuffer = hoverObject.object;
        grid.removeBox({
          x: moveBuffer.position.x,
          y: moveBuffer.position.y,
          z: moveBuffer.position.z,
        });
        addCube.visible = true;
        addCube.color = moveBuffer.material.color;
      }
      break;
    case modes.MARK:
      const markObject = getMouseOver(event);
      if (!markObject) return;
      markObject.object.layers.toggle(layers.outlineGreen);
    case modes.EYEDROPPER:
      const eyedropperObject = getMouseOver(event);
      if (!eyedropperObject) return;
      currentColor = eyedropperObject.object.material.color.getHex();
      addCube.color = currentColor;
      setMode(modes.ADD);
  }
});

export function setMode(mode) {
  currentMode = mode;
  removeRedOutline();
  switch (mode) {
    case modes.ADD:
      addCube.visible = true;
      break;
    case modes.REMOVE:
      addCube.visible = false;
      break;
    case modes.MOVE:
      addCube.visible = !!moveBuffer;
      break;
    case modes.MARK:
      addCube.visible = false;
      break;
    case modes.EYEDROPPER:
      addCube.visible = false;
      break;
  }
}

export function changeColorHandler(event) {
  currentColor = parseInt(event.target.value.slice(1), 16);
  addCube.color = currentColor;
}

export function invertControlsHandler(event) {
  if (event.target.checked) {
    MB.LEFT = 2;
    MB.RIGHT = 0;
    changeControls({
      LEFT: THREE.MOUSE.NONE,
      RIGHT: THREE.MOUSE.ROTATE,
    });
  } else {
    MB.LEFT = 0;
    MB.RIGHT = 2;
    changeControls({
      LEFT: THREE.MOUSE.ROTATE,
      RIGHT: THREE.MOUSE.NONE,
    });
  }
}
