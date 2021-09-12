import {AmbientLight, Mesh, MeshBasicMaterial, PointLight, Scene, SphereGeometry, Vector3} from "three";

const COLOR = 0xeeddaa;
const POSITION = new Vector3(100, 50, 100);

export default function addSun(scene: Scene) {
  const sun = new Mesh(
    new SphereGeometry(3, 8, 8),
    new MeshBasicMaterial({ color: COLOR }),
  );
  sun.position.copy(POSITION);
  scene.add(sun);

  const sunLight = new PointLight(COLOR, 0.7);
  sunLight.position.copy(POSITION);
  scene.add(sunLight);

  const ambientLight = new AmbientLight(COLOR, 0.1);
  scene.add(ambientLight);
}
