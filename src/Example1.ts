import { Application, ApplicationArgs } from "./Application.js";
import { GUI, radToDegOptions } from "./GUI.js";
import { BaseUniforms, Vec3f } from "./Renderer.js";

type Uniforms = BaseUniforms & {
  tx: number;
  ty: number;
  rotation: number; // in rad
  scaleX: number;
  scaleY: number;
};

const uniforms: Uniforms = {
  resolutionX: -1,
  resolutionY: -1,
  tx: 0,
  ty: 0,
  rotation: 0,
  scaleX: 1,
  scaleY: 1,
};

const vertexShader = (vert: Vec3f, baseUniforms: BaseUniforms) => {
  const uniforms = baseUniforms as Uniforms;
  // My version of just translation...
  // const hw = uniforms.resolutionX / 2;
  // const hh = uniforms.resolutionY / 2;
  // const vertOut: Vertex = {
  //   x: (vert.x + uniforms.tx - hw) / hw,
  //   y: (-1 * (vert.y + uniforms.ty - hh)) / hh,
  //   z: vert.z,
  // };

  // Replicated webgpufundamentals...

  // Scale the position
  const scaledX = vert.x * uniforms.scaleX;
  const scaledY = vert.y * uniforms.scaleY;

  // Rotate the position
  const rotX = Math.cos(uniforms.rotation);
  const rotY = Math.sin(uniforms.rotation);
  const rotatedPositionX = scaledX * rotX - scaledY * rotY;
  const rotatedPositionY = scaledX * rotY + scaledY * rotX;

  // Add in the translation
  const posX = rotatedPositionX + uniforms.tx;
  const posY = rotatedPositionY + uniforms.ty;

  // convert the position from pixels to a 0.0 to 1.0 value
  const zeroToOneX = posX / uniforms.resolutionX;
  const zeroToOneY = posY / uniforms.resolutionY;

  // convert from 0 <-> 1 to 0 <-> 2
  const zeroToTwoX = zeroToOneX * 2;
  const zeroToTwoY = zeroToOneY * 2;

  // covert from 0 <-> 2 to -1 <-> +1 (clip space)
  const flippedClipSpaceX = zeroToTwoX - 1;
  const flippedClipSpaceY = zeroToTwoY - 1;

  // flip Y
  const clipSpaceX = flippedClipSpaceX;
  const clipSpaceY = -1 * flippedClipSpaceY;

  return {
    x: clipSpaceX,
    y: clipSpaceY,
    z: vert.z,
  };
};

const populateGUIFunc = (
  gui: GUI,
  baseUniforms: BaseUniforms,
  render: () => void
) => {
  const uniforms = baseUniforms as Uniforms;
  gui.add(uniforms, "tx", 0, 300).onChange(render);
  gui.add(uniforms, "ty", 0, 300).onChange(render);
  gui.add(uniforms, "rotation", radToDegOptions).onChange(render);
  gui.add(uniforms, "scaleX", -5, 5).onChange(render);
  gui.add(uniforms, "scaleY", -5, 5).onChange(render);
};

export const example1: ApplicationArgs = [
  vertexShader,
  uniforms,
  populateGUIFunc,
];
