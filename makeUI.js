import {
  modes,
  setMode,
  changeColorHandler,
  invertControlsHandler,
} from "./mouse.js";
import { setTimeOfDay } from "./main.js";

document.querySelector("#menu").append(
  (() => {
    const btn = document.createElement("button");
    btn.addEventListener("click", () => {
      setMode(modes.ADD);
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
      setMode(modes.REMOVE);
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
      setMode(modes.MOVE);
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
    input.addEventListener("change", changeColorHandler);
    div.appendChild(input);
    return div;
  })(),
  (() => {
    const div = document.createElement("div");
    div.textContent = "Invert mouse buttons";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", invertControlsHandler);
    div.appendChild(checkbox);
    return div;
  })(),
  (() => {
    const div = document.createElement("div");
    div.textContent = "Set time of day";
    const input = document.createElement("input");
    input.type = "number";
    input.value = "12";
    input.min = "0";
    input.max = "25";
    input.step = "1";
    input.addEventListener("change", (event) => {
      const time = event.target.value;
      let hours = parseInt(time, 10);
      if (isNaN(hours)) hours = 12;
      if (hours <= 0) hours += 24;
      if (hours >= 25) hours -= 24;
      input.value = hours;
      setTimeOfDay(hours - 1);
    });
    div.appendChild(input);
    return div;
  })()
);
