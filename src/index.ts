import setupCanvas from "./canvas";
import "./index.css";
import addSun from "./objects/sun";
import Globe from "./objects/globe";

const canvas = setupCanvas();
const globe = new Globe(canvas.scene);
addSun(canvas.scene);

function animate() {
  requestAnimationFrame(animate);
  canvas.render();

  globe.tick();
}

animate();
