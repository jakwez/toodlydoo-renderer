// prettier-ignore
type SixteenNumbers = [
    number, number, number, number,
    number, number, number, number,
    number, number, number, number,
    number, number, number, number
];

export class Mat4 {
  // Column-major layout in memory
  // prettier-ignore
  elements: SixteenNumbers = [
    0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,
  ]

  // Coefficients are named n<i><j> where is it the row number, and j the column number.
  // The constructor takes them in row-major order making the code easier to read, just like in Three.js
  // prettier-ignore
  constructor(
    n11: number, n12: number, n13: number, n14: number,
    n21: number, n22: number, n23: number, n24: number,
    n31: number, n32: number, n33: number, n34: number,
    n41: number, n42: number, n43: number, n44: number
  ) {
    const e = this.elements;
    e[0] = n11; e[1] = n21; e[2] = n31; e[3] = n41;
    e[4] = n12; e[5] = n22; e[6] = n32; e[7] = n42;
    e[8] = n13; e[9] = n23; e[10] = n33; e[11] = n43;
    e[12] = n14; e[13] = n24; e[14] = n34; e[15] = n44;
  }

  toString(numDigits: number = 2) {
    let s = "";
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        s += this.coefficient(i, j).toFixed(numDigits);
      }
      s += "\n";
    }
    return s;
  }

  coefficient(zeroBasedRowNum: number, zeroBasedColNum: number) {
    return this.elements[zeroBasedColNum * 4 + zeroBasedRowNum];
  }

  static makeIdentity(): Mat4 {
    // prettier-ignore
    return new Mat4(
      1, 0, 0, 0,
      0, 1, 0, 1,
      0, 0, 1, 0,
      0, 0, 0, 1
    )
  }

  static makeTranslation(x: number, y: number, z: number): Mat4 {
    // prettier-ignore
    return new Mat4(
      0, 0, 0, x,
      0, 0, 0, y,
      0, 0, 0, z,
      0, 0, 0, 1
    )
  }
}
