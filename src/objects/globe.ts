import {Color, Mesh, MeshBasicMaterial, MeshStandardMaterial, Scene, SphereGeometry, Vector3} from "three";
import {degToRad} from "three/src/math/MathUtils";
import {Object3D} from "three/src/core/Object3D";
import countries from "../data/countries.json";
import {Country} from "../data/country";
import {latLonToCoords} from "../util/coordinates";

const AXIS_SOUTH_NORTH = new Vector3(0, 1, 0);
const ROTATION_PER_TICK = degToRad(0.1);
const COLOR_BLANK = new Color(0xffffff);
const COLOR_FOUND = new Color(0x00ff00);

interface CountryMarker {
  country: Country;
  mesh: Mesh;
}

export default class Globe {
  private readonly globe: Mesh;
  private readonly children: Object3D[];
  private readonly countries: CountryMarker[];
  public rotating = true;

  constructor(scene: Scene) {
    this.globe = new Mesh(
      new SphereGeometry(1, 160, 100),
      new MeshStandardMaterial({
        wireframe: true,
      }),
    );
    scene.add(this.globe);

    this.children = [];
    this.countries = [];
    this.createCountries();
    scene.add(...this.children);

    this.findCountry = this.findCountry.bind(this);
  }

  private createCountries() {
    const geo = new SphereGeometry(0.01, 4, 4);

    for (let country of (countries as Country[])) {
      const material = new MeshBasicMaterial({ color: COLOR_BLANK });
      const mesh = new Mesh(geo, material);
      const latitude = degToRad(country.lat);
      const longitude = degToRad(country.lon);
      mesh.position.copy(latLonToCoords(latitude, longitude));

      this.children.push(mesh);
      this.countries.push({country, mesh})
    }
  }

  public findCountry(countryAlpha2: string) {
    const marker = this.countries.find(marker => countryAlpha2 === marker.country.alpha2);
    if (!marker) return;

    const material = marker.mesh.material as MeshBasicMaterial;
    material.color = COLOR_FOUND;
  }

  public tick() {
    if (this.rotating) {
      this.globe.rotateY(ROTATION_PER_TICK);
      this.children.forEach(dot => dot.position.applyAxisAngle(AXIS_SOUTH_NORTH, ROTATION_PER_TICK));
    }
  }
}
