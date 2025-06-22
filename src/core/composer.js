import { EffectComposer } from "https://esm.sh/three@0.160.0/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "https://esm.sh/three@0.160.0/examples/jsm/postprocessing/RenderPass.js";
import { scene } from "./scene.js";
import { renderer } from "./renderer.js";
import { camera } from "./camera.js";

export const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);
