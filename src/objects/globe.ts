import {Mesh, MeshBasicMaterial, MeshStandardMaterial, Scene, SphereGeometry, Vector3} from "three";
import {degToRad} from "three/src/math/MathUtils";
import {Object3D} from "three/src/core/Object3D";
import countries from "../data/countries.json";
import {Country} from "../data/country";
import {latLonToCoords} from "../util/coordinates";

const AXIS_SOUTH_NORTH = new Vector3(0, 1, 0);
const ROTATION_PER_TICK = degToRad(0.1);

function createCountries(): Mesh[] {
  const material = new MeshBasicMaterial();
  const geo = new SphereGeometry(0.01, 4, 4);

  return (countries as Country[]).map(country => {
    const mesh = new Mesh(geo, material);
    const latitude = degToRad(country.lat);
    const longitude = degToRad(country.lon);
    mesh.position.copy(latLonToCoords(latitude, longitude));
    return mesh;
  })
}

export default class Globe {
  private readonly globe: Mesh;
  private readonly children: Object3D[];

  constructor(scene: Scene) {
    this.globe = new Mesh(
      new SphereGeometry(1, 160, 100),
      new MeshStandardMaterial({
        wireframe: true,
      }),
    );
    scene.add(this.globe);

    this.children = [];
    this.children.push(...createCountries());

    scene.add(...this.children);
  }

  public tick() {
    this.globe.rotateY(ROTATION_PER_TICK);
    this.children.forEach(dot => dot.position.applyAxisAngle(AXIS_SOUTH_NORTH, ROTATION_PER_TICK));
  }
}
