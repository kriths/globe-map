import {Mesh, MeshBasicMaterial, MeshStandardMaterial, Scene, SphereGeometry, Vector3} from "three";
import {degToRad, randFloat} from "three/src/math/MathUtils";
import {Object3D} from "three/src/core/Object3D";


const AXIS_SOUTH_NORTH = new Vector3(0, 1, 0);
const ROTATION_PER_TICK = degToRad(0.1);

function latLonToCoords(latitude: number, longitude: number): Vector3 {
  const latRad = degToRad(latitude);
  const lonRad = degToRad(longitude);

  const x = Math.cos(latRad) * Math.sin(lonRad);
  const y = Math.sin(latRad);
  const z = Math.cos(latRad) * Math.cos(lonRad);
  return new Vector3(x, y, z);
}

function createDots(count: number): Mesh[] {
  const material = new MeshBasicMaterial();
  const geo = new SphereGeometry(0.01, 4, 4);

  const meshes: Mesh[] = [];
  for (let i = 0; i < count; ++i) {
    const mesh = new Mesh(geo, material);
    const lat = randFloat(-90, 90);
    const lon = randFloat(-180, 180);
    mesh.position.copy(latLonToCoords(lat, lon));
    meshes.push(mesh);
  }

  return meshes;
}

export default class Globe {
  private readonly globe: Mesh;
  private readonly children: Object3D[];

  constructor(scene: Scene) {
    this.globe = new Mesh(
      new SphereGeometry(1, 16, 10),
      new MeshStandardMaterial({
        wireframe: true,
      }),
    );
    scene.add(this.globe);

    this.children = [];
    this.children.push(...createDots(100));

    scene.add(...this.children);
  }

  public tick() {
    this.globe.rotateY(ROTATION_PER_TICK);
    this.children.forEach(dot => dot.position.applyAxisAngle(AXIS_SOUTH_NORTH, ROTATION_PER_TICK));
  }
}
