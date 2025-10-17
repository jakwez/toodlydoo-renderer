import { Mat4 } from "./Mat4.js";

export class Vec4 {
  constructor(
    public x: number,
    public y: number,
    public z: number,
    public w: number
  ) {}

  // ugly, just for having a method... should store these in an array
  getElement(i: number): number {
    if (i === 0) {
      return this.x;
    } else if (i === 1) {
      return this.y;
    } else if (i === 2) {
      return this.z;
    } else if (i === 3) {
      return this.w;
    }
    throw new Error("invalid element index");
  }

  static makeZero(): Vec4 {
    return new Vec4(0, 0, 0, 0);
  }

  /**
   * Calculate m * v, and store and return it into o.
   * If o is not provided, a new Vec4 is allocated as result.
   * It is ok to use v as output.
   * @param a
   * @param b
   */
  static multiply(m: Mat4, v: Vec4, o?: Vec4) {
    o = o ?? Vec4.makeZero();
    const me = m.elements;
    const x = v.x;
    const y = v.y;
    const z = v.z;
    const w = v.w;
    o.x = me[0] * x + me[4] * y + me[8] * z + me[12] * w;
    o.y = me[1] * x + me[5] * y + me[9] * z + me[13] * w;
    o.z = me[2] * x + me[6] * y + me[10] * z + me[14] * w;
    o.w = me[3] * x + me[7] * y + me[11] * z + me[15] * w;
    return o;
  }
}
