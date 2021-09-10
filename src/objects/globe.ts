import {Mesh, MeshStandardMaterial, Scene, SphereGeometry} from "three";

export default class Globe {
  private readonly globe: Mesh;

  constructor(scene: Scene) {
    this.globe = new Mesh(
      new SphereGeometry(1, 16, 10),
      new MeshStandardMaterial({
        wireframe: true,
      }),
    );
    scene.add(this.globe);
  }

  public tick() {
    this.globe.rotateY(0.001);
  }
}
