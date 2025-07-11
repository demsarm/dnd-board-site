import {
  modes,
  setMode,
  changeColorHandler,
  invertControlsHandler,
} from "../core/mouse.js";
import { setTimeOfDay } from "../../main.js";
import { sendNotification } from "./notifications.js";

document.querySelector("#menu").append(
  (() => {
    const btn = document.createElement("button");
    btn.addEventListener("click", () => {
      setMode(modes.ADD);
    });
    const img = document.createElement("img");
    img.src = "./src/assets/icons/add.svg";
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
    img.src = "./src/assets/icons/remove.svg";
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
    img.src = "./src/assets/icons/move.svg";
    img.alt = "Move Cube";
    btn.appendChild(img);
    return btn;
  })(),
  (() => {
    const btn = document.createElement("button");
    btn.addEventListener("click", () => {
      setMode(modes.MARK);
    });
    const img = document.createElement("img");
    img.src = "./src/assets/icons/mark.svg";
    img.alt = "Mark Cube";
    btn.appendChild(img);
    return btn;
  })(),
  (() => {
    const btn = document.createElement("button");
    btn.addEventListener("click", () => {
      setMode(modes.EYEDROPPER);
    });
    const img = document.createElement("img");
    img.src = "./src/assets/icons/eyedropper.svg";
    img.alt = "Eyedropper Tool";
    btn.appendChild(img);
    return btn;
  })(),
  (() => {
    const div = document.createElement("div");
    div.append(
      (() => {
        const label = document.createElement("label");
        label.textContent = "Change color";
        return label;
      })()
    );
    const input = document.createElement("input");
    input.type = "color";
    input.value = "#ffffff";
    input.addEventListener("change", changeColorHandler);
    div.appendChild(input);
    return div;
  })(),
  (() => {
    const div = document.createElement("div");
    div.append(
      (() => {
        const label = document.createElement("label");
        label.textContent = "Invert mouse buttons";
        return label;
      })()
    );
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", invertControlsHandler);
    div.appendChild(checkbox);
    return div;
  })(),
  (() => {
    const div = document.createElement("div");
    div.append(
      (() => {
        const label = document.createElement("label");
        label.textContent = "Set time of day";
        return label;
      })()
    );
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

document.addEventListener("keyup", (ev) => {
  switch (ev.key) {
    case "a":
      setMode(modes.ADD);
      sendNotification("Switched to Add mode");
      break;
    case "s":
      setMode(modes.REMOVE);
      sendNotification("Switched to Remove mode");
      break;
    case "d":
      setMode(modes.MOVE);
      sendNotification("Switched to Move mode");
      break;
    case "f":
      setMode(modes.MARK);
      sendNotification("Switched to Mark mode");
      break;
    case "x":
      setMode(modes.EYEDROPPER);
      sendNotification("Switched to Eyedropper mode");
      break;
    case "c":
      const input = document.querySelector("input[type='color']");
      if (input) {
        input.click();
      }
      break;
  }
});
