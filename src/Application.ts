import { Renderer, Uniforms, Vec3f, VertexShader } from "./Renderer.js";
import { createFVerts } from "./createFVerts.js";
declare const GUI: any;

// const degToRad = (d: number) => (d * Math.PI) / 180;
const radToDegOptions = {
  min: -360,
  max: 360,
  step: 1,
  converters: GUI.converters.radToDeg,
};

export class Application {
  private renderer: Renderer;
  private gui: typeof GUI;
  private uniforms: Uniforms;
  private mesh: Array<number>;
  private vs: VertexShader;

  constructor() {
    const canvas = document.getElementById(
      "canvas"
    ) as HTMLCanvasElement | null;
    if (!canvas) {
      throw new Error(`can't find canvas`);
    }
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    this.renderer = new Renderer(canvas);

    this.uniforms = {
      resolutionX: canvas.width,
      resolutionY: canvas.height,
      tx: 0,
      ty: 0,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
    };

    this.mesh = createFVerts();
    this.vs = (vert: Vec3f, uniforms: Uniforms) => {
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

    this.gui = new GUI();
    const render = this.render.bind(this);
    this.gui.add(this.uniforms, "tx", 0, 300).onChange(render);
    this.gui.add(this.uniforms, "ty", 0, 300).onChange(render);
    this.gui.add(this.uniforms, "rotation", radToDegOptions).onChange(render);
    this.gui.add(this.uniforms, "scaleX", -5, 5).onChange(render);
    this.gui.add(this.uniforms, "scaleY", -5, 5).onChange(render);
    this.render();
  }

  render() {
    this.renderer.render(this.mesh, this.uniforms, this.vs);
  }
}
