import { getMouseOver } from "./getMouseOver.js";
import { grid } from "./grid.js";
import { addCube } from "./addCube.js";
import * as THREE from "https://esm.sh/three@0.160.0";
import { changeControls } from "./main.js";

const modes = {
  ADD: 0,
  REMOVE: 1,
  MOVE: 2,
};

const MB = {
  LEFT: 0,
  MIDDLE: 1,
  RIGHT: 2,
};

let currentColor = 0xffffff;

let moveBuffer = null;

let currentMode = modes.ADD;

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
  }
});

document.querySelector("#menu").append(
  (() => {
    const btn = document.createElement("button");
    btn.addEventListener("click", () => {
      currentMode = modes.ADD;
      addCube.visible = true;
    });
    const img = document.createElement("img");
    img.src = "./assets/icons/add.svg";
    img.alt = "Add Cube";
    btn.appendChild(img);
    return btn;
  })(),
  (() => {
    const btn = document.createElement("button");
    btn.addEventListener("click", () => {
      currentMode = modes.REMOVE;
      addCube.visible = false;
    });
    const img = document.createElement("img");
    img.src = "./assets/icons/remove.svg";
    img.alt = "Remove Cube";
    btn.appendChild(img);
    return btn;
  })(),
  (() => {
    const btn = document.createElement("button");
    btn.addEventListener("click", () => {
      currentMode = modes.MOVE;
      addCube.visible = !!moveBuffer;
    });
    const img = document.createElement("img");
    img.src = "./assets/icons/move.svg";
    img.alt = "Move Cube";
    btn.appendChild(img);
    return btn;
  })(),
  (() => {
    const div = document.createElement("div");
    div.textContent = "Change color";
    const input = document.createElement("input");
    input.type = "color";
    input.value = "#ffffff";
    input.addEventListener("change", (event) => {
      currentColor = parseInt(event.target.value.slice(1), 16);
      addCube.color = currentColor;
    });
    div.appendChild(input);
    return div;
  })(),
  (() => {
    const div = document.createElement("div");
    div.textContent = "Invert mouse buttons";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", (event) => {
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
    });
    div.appendChild(checkbox);
    return div;
  })()
);
