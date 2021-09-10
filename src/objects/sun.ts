import {AmbientLight, Mesh, MeshBasicMaterial, PointLight, Scene, SphereGeometry, Vector3} from "three";

const color = 0xeeddaa;
const position = new Vector3(50, 50, 100);

export default function addSun(scene: Scene) {
  const sun = new Mesh(
    new SphereGeometry(3, 8, 8),
    new MeshBasicMaterial({ color }),
  );
  sun.position.copy(position);
  scene.add(sun);

  const sunLight = new PointLight(color, 0.7);
  sunLight.position.copy(position);
  scene.add(sunLight);

  const ambientLight = new AmbientLight(color, 0.1);
  scene.add(ambientLight);
}
