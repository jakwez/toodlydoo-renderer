import { ApplicationArgs } from "./Application.js";
import { GUI } from "./GUI.js";
import { BaseUniforms } from "./Renderer.js";
import { Vec4 } from "./Vec4.js";

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

const vertexShader = (vert: Vec4, baseUniforms: BaseUniforms): Vec4 => {
  const uniforms = baseUniforms as Uniforms;
  const hw = uniforms.resolutionX / 2;
  const hh = uniforms.resolutionY / 2;
  const vertOut = new Vec4(
    (vert.x + uniforms.tx - hw) / hw,
    (-1 * (vert.y + uniforms.ty - hh)) / hh,
    vert.z,
    1
  );
  return vertOut;
};

const declareControlsToGUI = (
  gui: GUI,
  _controls: any,
  onChange: () => void
) => {
  const controls = _controls as Uniforms;
  gui.add(controls, "tx", 0, 300).onChange(onChange);
  gui.add(controls, "ty", 0, 300).onChange(onChange);
};

export const example0: ApplicationArgs = [
  vertexShader,
  uniforms,
  uniforms,
  declareControlsToGUI,
  () => {},
];
