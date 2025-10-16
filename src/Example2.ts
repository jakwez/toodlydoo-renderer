import { ApplicationArgs } from "./Application.js";
import { GUI, radToDegOptions } from "./GUI.js";
import { Mat4 } from "./Mat4.js";
import { BaseUniforms, Vec3 } from "./Renderer.js";

type Uniforms = BaseUniforms & {
  transform: Mat4;
};
const uniforms: Uniforms = {
  resolutionX: -1,
  resolutionY: -1,
  transform: Mat4.makeIdentity(),
};

type Controls = {
  tx: number;
  ty: number;
};
const controls: Controls = {
  tx: 0,
  ty: 0,
};

const vertexShader = (vert: Vec3, baseUniforms: BaseUniforms) => {
  const uniforms = baseUniforms as Uniforms;
  const hw = uniforms.resolutionX / 2;
  const hh = uniforms.resolutionY / 2;

  const tx = uniforms.transform.getElement(0, 3);
  const ty = uniforms.transform.getElement(1, 3);
  const tz = uniforms.transform.getElement(2, 3);
  const vertOut: Vec3 = {
    x: (vert.x + tx - hw) / hw,
    y: (-1 * (vert.y + ty - hh)) / hh,
    z: tz,
  };
  return vertOut;
};

const declareControlsToGUI = (
  gui: GUI,
  _controls: any,
  onChange: () => void
) => {
  const controls = _controls as Controls;
  gui.add(controls, "tx", 0, 300).onChange(onChange);
  gui.add(controls, "ty", 0, 300).onChange(onChange);
};

const convertControlsToUniforms = (
  controls: any,
  baseUniforms: BaseUniforms
) => {
  const uniforms = baseUniforms as Uniforms;
  uniforms.transform.setElement(0, 3, controls.tx);
  uniforms.transform.setElement(1, 3, controls.ty);
};

export const example2: ApplicationArgs = [
  vertexShader,
  uniforms,
  controls,
  declareControlsToGUI,
  convertControlsToUniforms,
];
