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

  // Coefficients are named n<i><j> where <i> is the 1-based row number, and <j> the column 1-based number.
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
        s += this.getElement(i, j).toFixed(numDigits) + " ";
      }
      s += "\n";
    }
    return s;
  }

  getElement(zeroBasedRowNum: number, zeroBasedColNum: number): number {
    return this.elements[zeroBasedColNum * 4 + zeroBasedRowNum];
  }

  setElement(zeroBasedRowNum: number, zeroBasedColNum: number, value: number) {
    this.elements[zeroBasedColNum * 4 + zeroBasedRowNum] = value;
  }

  static makeZero(): Mat4 {
    // prettier-ignore
    return new Mat4(
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0
    )
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
      1, 0, 0, x,
      0, 1, 0, y,
      0, 0, 1, z,
      0, 0, 0, 1
    )
  }

  static makeScale(sx: number, sy: number, sz: number): Mat4 {
    // prettier-ignore
    return new Mat4(
      sx, 0,  0,  0,
      0,  sy, 0,  0,
      0,  0,  sz, 0,
      0,  0,  0,  1
    )
  }

  /**
   * Calculate a * b, and store and return it into o.
   * If o is not provided, a new Mat4 is allocated as result.
   * It is ok to use a as output, but not b.
   * @param a
   * @param b
   */
  // prettier-ignore
  static multiply(a: Mat4, b: Mat4, o?:Mat4) {
    o = o ?? Mat4.makeZero();
    const oe = o.elements;

    const ae = a.elements;
    // read the elements from a in sequence from memory (visually this is transposed!)
    const a11 = ae[0];  const a21 = ae[1];  const a31 = ae[2];  const a41 = ae[3];
    const a12 = ae[4];  const a22 = ae[5];  const a32 = ae[6];  const a42 = ae[7];
    const a13 = ae[8];  const a23 = ae[9];  const a33 = ae[10]; const a43 = ae[11];
    const a14 = ae[12]; const a24 = ae[13]; const a34 = ae[14]; const a44 = ae[15];

    // Same with b, though we technically don't need these intermediate variables,
    // they're probably removed by tsc when generating js
    const be = b.elements;
    const b11 = be[0];  const b21 = be[1];  const b31 = be[2];  const b41 = be[3];
    const b12 = be[4];  const b22 = be[5];  const b32 = be[6];  const b42 = be[7];
    const b13 = be[8];  const b23 = be[9];  const b33 = be[10]; const b43 = be[11];
    const b14 = be[12]; const b24 = be[13]; const b34 = be[14]; const b44 = be[15];

    // first column of result
    oe[0]=a11*b11 + a12*b21 + a13*b31 + a14*b41;  
    oe[1]=a21*b11 + a22*b21 + a23*b31 + a24*b41;  
    oe[2]=a31*b11 + a32*b21 + a33*b31 + a34*b41;  
    oe[3]=a41*b11 + a42*b21 + a43*b31 + a44*b41;  

    // second
    oe[4]=a11*b12 + a12*b22 + a13*b32 + a14*b42;  
    oe[5]=a21*b12 + a22*b22 + a23*b32 + a24*b42;  
    oe[6]=a31*b12 + a32*b22 + a33*b32 + a34*b42;  
    oe[7]=a41*b12 + a42*b22 + a43*b32 + a44*b42; 

    // third
    oe[8]=a11*b13 + a12*b23 + a13*b33 + a14*b43;  
    oe[9]=a21*b13 + a22*b23 + a23*b33 + a24*b43;  
    oe[10]=a31*b13 + a32*b23 + a33*b33 + a34*b43;  
    oe[11]=a41*b13 + a42*b23 + a43*b33 + a44*b43; 

    // fourth
    oe[12]=a11*b14 + a12*b24 + a13*b34 + a14*b44;  
    oe[13]=a21*b14 + a22*b24 + a23*b34 + a24*b44;  
    oe[14]=a31*b14 + a32*b24 + a33*b34 + a34*b44;  
    oe[15]=a41*b14 + a42*b24 + a43*b34 + a44*b44; 

    return o;
  }

  static copy(source: Mat4, target: Mat4) {
    const n = source.elements.length;
    const se = source.elements;
    const te = target.elements;
    for (let i = 0; i < n; i++) {
      te[i] = se[i];
    }
  }
}
