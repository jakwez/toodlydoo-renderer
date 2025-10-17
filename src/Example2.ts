import { ApplicationArgs } from "./Application.js";
import { GUI, radToDegOptions } from "./GUI.js";
import { Mat4 } from "./Mat4.js";
import { BaseUniforms } from "./Renderer.js";
import { Vec4 } from "./Vec4.js";

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
  angleDeg: number;
  sx: number;
  sy: number;
};
const controls: Controls = {
  tx: 0,
  ty: 0,
  angleDeg: 0,
  sx: 1,
  sy: 1,
};

const make2DRotationAroundZ = (angleRad: number): Mat4 => {
  const c = Math.cos(angleRad);
  const s = Math.sin(angleRad);
  // prettier-ignore
  return new Mat4(
    c, -s,  0,  0,
    s,  c,  0,  0,
    0,  0,  1,  0,
    0,  0,  0,  1
  );
};

const worldToClip = (w: Vec4, halfWidth: number, halfHeight: number): Vec4 => {
  const vertOut = new Vec4(
    (w.x - halfWidth) / halfWidth,
    (-1 * (w.y - halfHeight)) / halfHeight,
    w.z,
    w.w
  );
  return vertOut;
};

const vertexShader = (vert: Vec4, baseUniforms: BaseUniforms): Vec4 => {
  const uniforms = baseUniforms as Uniforms;
  const hw = uniforms.resolutionX / 2;
  const hh = uniforms.resolutionY / 2;
  const v = Vec4.multiply(uniforms.transform, vert);
  const vertOut = worldToClip(v, hw, hh);
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
  gui.add(controls, "angleDeg", -360, 360).onChange(onChange);
  gui.add(controls, "sx", -4, 4).onChange(onChange);
  gui.add(controls, "sy", -4, 4).onChange(onChange);
};

const convertControlsToUniforms = (
  controls: any,
  baseUniforms: BaseUniforms
) => {
  const uniforms = baseUniforms as Uniforms;
  const scale = Mat4.makeScale(controls.sx, controls.sy, 1);
  const rotate = make2DRotationAroundZ((controls.angleDeg / 180) * Math.PI);
  const translate = Mat4.makeTranslation(controls.tx, controls.ty, 0);
  const mat = Mat4.multiply(rotate, scale);
  const mat2 = Mat4.multiply(translate, mat);
  Mat4.copy(mat2, uniforms.transform);
};

export const example2: ApplicationArgs = [
  vertexShader,
  uniforms,
  controls,
  declareControlsToGUI,
  convertControlsToUniforms,
];
