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
uniforms.transform.elements[12] = 50; //!!!!!!!!!!
uniforms.transform.elements[13] = 200;

const vertexShader = (vert: Vec3, baseUniforms: BaseUniforms) => {
  const uniforms = baseUniforms as Uniforms;
  const hw = uniforms.resolutionX / 2;
  const hh = uniforms.resolutionY / 2;

  const tx = uniforms.transform.coefficient(0, 3);
  const ty = uniforms.transform.coefficient(1, 3);
  const tz = uniforms.transform.coefficient(2, 3);
  const vertOut: Vec3 = {
    x: (vert.x + tx - hw) / hw,
    y: (-1 * (vert.y + ty - hh)) / hh,
    z: tz,
  };
  return vertOut;
};

const populateGUIFunc = (
  gui: GUI,
  baseUniforms: BaseUniforms,
  render: () => void
) => {
  //   const uniforms = baseUniforms as Uniforms;
  //   gui.add(uniforms, "tx", 0, 300).onChange(render);
  //   gui.add(uniforms, "ty", 0, 300).onChange(render);
  //   gui.add(uniforms, "rotation", radToDegOptions).onChange(render);
  //   gui.add(uniforms, "scaleX", -5, 5).onChange(render);
  //   gui.add(uniforms, "scaleY", -5, 5).onChange(render);
};

export const example2: ApplicationArgs = [
  vertexShader,
  uniforms,
  populateGUIFunc,
];
