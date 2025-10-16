import { GUI } from "./GUI.js";
import { Renderer, BaseUniforms, Vec3, VertexShader } from "./Renderer.js";
import { createFVerts } from "./createFVerts.js";

export type ApplicationArgs = ConstructorParameters<typeof Application>;

export type DeclareControlsToGUI = (
  gui: typeof GUI,
  controls: any,
  onChange: () => void
) => void;

export type ConvertControlsToUniforms = (
  controls: any,
  uniforms: BaseUniforms
) => void;

export class Application {
  private renderer: Renderer;
  private gui: GUI;
  private uniforms: BaseUniforms;
  private controls: object;
  private mesh: Array<number>;
  private vertexShader: VertexShader;

  constructor(
    vertexShader: VertexShader,
    uniforms: BaseUniforms,
    controls: object,
    declareControlsToUI: DeclareControlsToGUI,
    convertControlsToUniforms: ConvertControlsToUniforms
  ) {
    this.vertexShader = vertexShader;
    this.uniforms = uniforms;
    this.controls = controls;

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
    const onChange = () => {
      convertControlsToUniforms(this.controls, this.uniforms);
      this.render();
    };
    declareControlsToUI(this.gui, this.controls, onChange);
  }

  render() {
    this.renderer.render(this.mesh, this.uniforms, this.vertexShader);
  }
}
