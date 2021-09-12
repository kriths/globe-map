import setupCanvas from "./canvas";
import "./index.css";
import addSun from "./objects/sun";
import Globe from "./objects/globe";
import addStars from "./objects/stars";
import Game from "./game";

const canvas = setupCanvas();
const globe = new Globe(canvas.scene);
addSun(canvas.scene);
addStars(canvas.scene);

function animate() {
  requestAnimationFrame(animate);
  canvas.render();

  globe.tick();
}

animate();

// TODO Add state management / reset
new Game(globe);

document.getElementById("toggle-rotation").onclick = () => {
  globe.rotating = !globe.rotating;
}
