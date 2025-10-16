import { GUI } from "./GUI.js";
import { Renderer, BaseUniforms, Vec3f, VertexShader } from "./Renderer.js";
import { createFVerts } from "./createFVerts.js";

export type ApplicationArgs = ConstructorParameters<typeof Application>;

export type PopulateGUIFunc = (
  gui: typeof GUI,
  uniforms: BaseUniforms,
  renderFunc: () => void
) => void;

export class Application {
  private renderer: Renderer;
  private gui: GUI;
  private uniforms: BaseUniforms;
  private mesh: Array<number>;
  private vertexShader: VertexShader;

  constructor(
    vertexShader: VertexShader,
    uniforms: BaseUniforms,
    populateGUIFunc: PopulateGUIFunc
  ) {
    this.vertexShader = vertexShader;
    this.uniforms = uniforms;

    const canvas = document.getElementById(
      "canvas"
    ) as HTMLCanvasElement | null;
    if (!canvas) {
      throw new Error(`can't find canvas`);
    }
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    this.renderer = new Renderer(canvas);

    this.uniforms.resolutionX = canvas.width;
    this.uniforms.resolutionY = canvas.height;
    this.mesh = createFVerts();

    this.gui = new GUI();
    const render = this.render.bind(this);
    populateGUIFunc(this.gui, this.uniforms, render);
  }

  render() {
    this.renderer.render(this.mesh, this.uniforms, this.vertexShader);
  }
}
