// @flow

/**
 * Bitmap - really a byte matrix internally.
 */
export default class Bitmap {
  width: number;
  height: number;
  _bitmap: Array<Uint8Array>;

  /**
   * Initialize Bitmap with a `width` and `height`
   */
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this._bitmap = new Array(height).fill(null).map(() => new Uint8Array(width).fill(32));
  }

  /**
   * Determine if `x` and `y` are in bounds of the matrix.
   */
  _inBounds(x: number, y: number): boolean {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  /**
   * Wrtie a number at position (x, y).
   */
  write(x: number, y: number, n: number) {
    if (!this._inBounds(x, y)) {
      throw new Error(`Bitmap: Position out of bounds`);
    }
    this._bitmap[y][x] = n;
  }

  /**
   * Write a string starting at position (x, y).
   */
  writeString(x: number, y: number, str: string) {
    for (let i = 0; i < str.length; i++) {
      if (!this._inBounds(x + i, y)) {
        throw new Error(`Bitmap: Character ${i} in "${str}" is out of bounds (${x + i}, ${y})`);
      }
      this.write(x + i, y, str.charCodeAt(i));
    }
  }

  /**
   * Get the string representation of the `Bitmap`.
   */
  toString(): string {
    return this._bitmap.map(intArr => {
      return intArr.reduce((s, c) => s + String.fromCharCode(c), '');
    }).join('\n');
  }
}
