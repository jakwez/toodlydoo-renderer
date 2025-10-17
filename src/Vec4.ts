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
}
