import { Application, ApplicationArgs } from "./Application.js";
import { GUI, radToDegOptions } from "./GUI.js";
import { BaseUniforms, Vec3f } from "./Renderer.js";

type Uniforms = BaseUniforms & {
  tx: number;
  ty: number;
};

const uniforms: Uniforms = {
  resolutionX: -1,
  resolutionY: -1,
  tx: 0,
  ty: 0,
};

const vertexShader = (vert: Vec3f, baseUniforms: BaseUniforms) => {
  const uniforms = baseUniforms as Uniforms;
  const hw = uniforms.resolutionX / 2;
  const hh = uniforms.resolutionY / 2;
  const vertOut: Vec3f = {
    x: (vert.x + uniforms.tx - hw) / hw,
    y: (-1 * (vert.y + uniforms.ty - hh)) / hh,
    z: vert.z,
  };
  return vertOut;
};

const populateGUIFunc = (
  gui: GUI,
  baseUniforms: BaseUniforms,
  render: () => void
) => {
  const uniforms = baseUniforms as Uniforms;
  gui.add(uniforms, "tx", 0, 300).onChange(render);
  gui.add(uniforms, "ty", 0, 300).onChange(render);
};

export const example0: ApplicationArgs = [
  vertexShader,
  uniforms,
  populateGUIFunc,
];
