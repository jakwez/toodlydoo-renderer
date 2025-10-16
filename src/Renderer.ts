export type Uniforms = {
  resolutionX: number;
  resolutionY: number;
  tx: number;
  ty: number;
  rotation: number; // in rad
  scaleX: number;
  scaleY: number;
};

export type Vec3f = {
  x: number;
  y: number;
  z: number;
};

export type VertexShader = (vert: Vec3f, uniforms: Uniforms) => Vec3f;

export class Renderer {
  constructor(private canvas: HTMLCanvasElement) {}

  render(verts: Array<number>, uniforms: Uniforms, vs: VertexShader) {
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
      const v0: Vec3f = {
        x: verts[i++],
        y: verts[i++],
        z: verts[i++],
      };
      const v0clip = vs(v0, uniforms);

      const v1: Vec3f = {
        x: verts[i++],
        y: verts[i++],
        z: verts[i++],
      };
      const v1clip = vs(v1, uniforms);

      const v2: Vec3f = {
        x: verts[i++],
        y: verts[i++],
        z: verts[i++],
      };
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

  private clipspaceToPixel(v: Vec3f): Vec3f {
    const hw = this.canvas.width / 2;
    const hh = this.canvas.height / 2;
    const vOut = {
      x: hw + v.x * hw,
      y: hh - v.y * hh,
      z: v.z,
    };
    return vOut;
  }
}
