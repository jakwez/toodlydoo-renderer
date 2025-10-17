import { ApplicationArgs } from "./Application.js";
import { GUI, radToDegOptions } from "./GUI.js";
import { Mat4 } from "./Mat4.js";
import { BaseUniforms, Vec4 } from "./Renderer.js";

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
  sx: number;
  sy: number;
};
const controls: Controls = {
  tx: 0,
  ty: 0,
  sx: 1,
  sy: 1,
};

const vertexShader = (vert: Vec4, baseUniforms: BaseUniforms) => {
  const uniforms = baseUniforms as Uniforms;
  const hw = uniforms.resolutionX / 2;
  const hh = uniforms.resolutionY / 2;

  const tx = uniforms.transform.getElement(0, 3);
  const ty = uniforms.transform.getElement(1, 3);
  const tz = uniforms.transform.getElement(2, 3);

  const sx = uniforms.transform.getElement(0, 0);
  const sy = uniforms.transform.getElement(1, 1);
  const sz = uniforms.transform.getElement(2, 2);
  const vertOut: Vec4 = {
    x: (vert.x * sx + tx - hw) / hw,
    y: (-1 * (vert.y * sy + ty - hh)) / hh,
    z: tz,
    w: 1,
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
  gui.add(controls, "sx", -4, 4).onChange(onChange);
  gui.add(controls, "sy", -4, 4).onChange(onChange);
};

const convertControlsToUniforms = (
  controls: any,
  baseUniforms: BaseUniforms
) => {
  const uniforms = baseUniforms as Uniforms;
  const scale = Mat4.makeScale(controls.sx, controls.sy, 1);
  const translate = Mat4.makeTranslation(controls.tx, controls.ty, 0);

  Mat4.multiply(translate, scale);
  Mat4.copy(translate, uniforms.transform);

  // const mat = Mat4.multiply2(scale, translate);
  // Mat4.copy(mat, uniforms.transform);
};

export const example2: ApplicationArgs = [
  vertexShader,
  uniforms,
  controls,
  declareControlsToGUI,
  convertControlsToUniforms,
];
