import {PerspectiveCamera, Scene, WebGLRenderer} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

class Canvas {
  readonly camera: PerspectiveCamera;
  readonly scene: Scene;

  private readonly renderer: WebGLRenderer;

  constructor(camera: PerspectiveCamera, renderer: WebGLRenderer, scene: Scene) {
    this.camera = camera;
    this.renderer = renderer;
    this.scene = scene;

    this.render = this.render.bind(this);

    window.addEventListener("resize", this.onResize.bind(this));
    this.onResize();
  }

  public render() {
    this.renderer.render(this.scene, this.camera);
  }

  private onResize() {
    const height = window.innerHeight;
    const width = window.innerWidth;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
}

export default function setupCanvas(): Canvas {
  const camera = new PerspectiveCamera(80);
  camera.position.set(0, 1, 3);

  const scene = new Scene();

  const renderer = new WebGLRenderer({
    antialias: true,
  });
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableKeys = false;
  controls.enablePan = false;

  return new Canvas(camera, renderer, scene);
}
