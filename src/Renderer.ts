import { Vec4 } from "./Vec4.js";

export type BaseUniforms = {
  resolutionX: number;
  resolutionY: number;
};

export type VertexShader = (vert: Vec4, uniforms: BaseUniforms) => Vec4;

export class Renderer {
  constructor(private canvas: HTMLCanvasElement) {}

  render(verts: Array<number>, uniforms: BaseUniforms, vs: VertexShader) {
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;

    const context = this.canvas.getContext("2d");
    if (!context) {
      throw new Error("can't get context");
    }

    context.fillStyle = "#90baf4ff";
    context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    context.strokeStyle = "#1068c5ff";
    context.strokeRect(0, 0, this.canvas.width, this.canvas.height);

    // prettier-ignore
    // verts = [
    //   0, 0, 0,
    //   0.1, 0.3, 0,
    //   0, 0.7, 0];

    const numFloatPerTri = 3 * 3;
    const n = verts.length / numFloatPerTri;
    let i = 0;
    for (let tri = 0; tri < n; tri++) {
      const v0 = new Vec4(verts[i++], verts[i++], verts[i++], 1);
      const v0clip = vs(v0, uniforms);

      const v1 = new Vec4(verts[i++], verts[i++], verts[i++], 1);
      const v1clip = vs(v1, uniforms);

      const v2 = new Vec4(verts[i++], verts[i++], verts[i++], 1);
      const v2clip = vs(v2, uniforms);

      context.beginPath();
      context.strokeStyle = "black";
      context.fillStyle = "blue";
      const v0px = this.clipspaceToPixel(v0clip);
      const v1px = this.clipspaceToPixel(v1clip);
      const v2px = this.clipspaceToPixel(v2clip);
      context.moveTo(v0px.x, v0px.y);
      context.lineTo(v1px.x, v1px.y);
      context.lineTo(v2px.x, v2px.y);
      context.closePath();
      context.fill();
      context.stroke();
    }
  }

  private clipspaceToPixel(v: Vec4): Vec4 {
    const hw = this.canvas.width / 2;
    const hh = this.canvas.height / 2;
    const vOut = new Vec4(hw + v.x * hw, hh - v.y * hh, v.z, 1);
    return vOut;
  }
}
