import {Mesh, MeshBasicMaterial, Scene, SphereGeometry} from "three";
import {randFloat} from "three/src/math/MathUtils";
import {latLonToCoords} from "../util/coordinates";

const STAR_COUNT = 5000;
const DISTANCE = 500;

export default function addStars(scene: Scene) {
  const geometry = new SphereGeometry(0.25, 4, 4);
  const material = new MeshBasicMaterial({ color: 0xffffff });

  for (let i = 0; i < STAR_COUNT; ++i) {
    // Using arcsin creates a more uniform distribution
    // otherwise stars would group at poles
    const latitude = Math.asin(randFloat(-1, 1));
    const longitude = randFloat(0, 2 * Math.PI);

    const position = latLonToCoords(latitude, longitude);
    position.multiplyScalar(DISTANCE);

    const mesh = new Mesh(geometry, material);
    mesh.position.copy(position);
    scene.add(mesh);
  }
}
