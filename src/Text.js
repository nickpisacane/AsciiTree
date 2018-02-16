// @flow

export default class Text {
  lines: Array<string>;
  width: number;
  height: number;

  constructor(value: string) {
    this.lines = value.replace(/\t/g, ' ').split(/\n/)
      .map(line => line.trim());
    this.width = Math.max(...this.lines.map(s => s.length));
    this.height = this.lines.length;
  }
}
