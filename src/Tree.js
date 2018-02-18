// @flow

import Bitmap from './Bitmap';

import type {SimpleNode} from './Node';
import Node from './Node';

// Alignment type for tree nodes.
export type Alignment = 'left' | 'center';

// Tree options type
export type Options = {
  root: SimpleNode,
  vertical?: string;
  horizontal?: string;
  space?: number;
  verticalHeight?: number;
  align?: Alignment;
};

export default class Tree {
  _root: Node;
  _levels: Array<Array<Node>>;
  _dirty: boolean;

  space: number;
  vertical: string;
  horizontal: string;
  verticalHeight: number;
  alignment: Alignment;

  /**
   * Tree constructor.
   * @param {Options} options
   * @param {SimpleNode} options.root The root node of the tree.
   * @param {Number} [options.space = 1] The space between nodes (to the right).
   * @param {String} [options.vertical = '\'] The vertical branch character.
   * @param {String} [options.horizontal = '_'] The horizontal branch character.
   * @param {Alignment} [options.align = 'center'] The text/branch alignment.
   * @param {Number} [options.verticalHeight = 1] The number of vertical
   *                                              characters between a node and
   *                                              a horizontal branch.
   *
   */
  constructor(options: Options) {
    this.space = options.space || 1;
    this.vertical = (options.vertical || '|')[0];
    this.horizontal = (options.horizontal || '_')[0];
    this.verticalHeight = options.verticalHeight || 1;
    this.alignment = options.align || 'center';

    this._root = Node.fromSimpleNode(options.root);
    this._levels = this._root.getLevels();
    this._dirty = true;
  }

  /**
   * Get the horizontal alignment for a given `node`, based on `alignment`.
   * @param {Node} node The node to calculate alignmemt for.
   */
  _alignX(node: Node, width?: number = node.text.width): number {
    if (this.alignment === 'left') {
      return node.left;
    }
    return node.left + Math.floor((node.width - width) / 2);
  }

  /**
   * Get the vertical alignment for a given `node`'s vertical branch connector,
   * based on `alignment`.
   * @param  {Node} node The node to calculate a vertical branch for.
   * @return {Number}      Horizontal position of the vertical branch.
   */
  _alignVertical(node: Node): number {
    const x = this._alignX(node);
    if (this.alignment === 'left') {
      return x;
    }
    return x + Math.floor(node.text.width / 2);
  }

  /**
   * Draws a vertical branch starting at `y` for the given `node`.
   * @param  {Bitmap} bitmap Bitmap to draw to.
   * @param  {Node} node   The node to connect.
   * @param  {Number} y      The vertical starting point for the branch.
   */
  _drawVertical(bitmap: Bitmap, node: Node, y: number, extra?: number = 0) {
    const x = this._alignVertical(node);
    const len = this.verticalHeight + extra;
    for (let i = 0; i < len; i++) {
      bitmap.writeString(x, y + i, this.vertical);
    }
  }

  /**
   * Draws a horiztonal branch at `y` from `start` to `end` based on
   * `alignment`.
   * @param  {Bitmap} bitmap The bitmap to draw to.
   * @param  {Number} y      The vertical position to draw on.
   * @param  {Number} start  The position to start at.
   * @param  {Number} end    The position to end at.
   */
  _drawHorizontal(
    bitmap: Bitmap,
    y: number,
    start: number,
    end: number
  ) {
    for (let i = start; i <= end; i++) {
      bitmap.writeString(i, y, this.horizontal);
    }
  }

  /**
   * Get the height of the tree including the branches.
   * @return {Number}
   */
  height(): number {
    const levelLen = this._levels.length;
    const levelHeight = this._levels.reduce((a, level) => {
      return a + Math.max(...level.map(n => n.text.height));
    }, 0);

    return levelHeight + (levelLen - 1) * (this.verticalHeight * 2);
  }

  /**
   * Get the width of the tree.
   * @return {Number}
   */
  width(): number {
    return this._root.width;
  }

  /**
   * Update a tree with `Options`.
   * @param  {Options} options Same options as in constructor.
   */
  update(options: Options) {
    if (options.root) {
      this._root = Node.fromSimpleNode(options.root);
      this._levels = this._root.getLevels();
      this._dirty = true;
    }

    if (options.space) {
      this.space = options.space;
      this._dirty = true;
    }

    if (options.vertical) {
      this.vertical = options.vertical;
    }
    if (options.horizontal) {
      this.horizontal = options.horizontal;
    }
    if (options.verticalHeight) {
      this.verticalHeight = options.verticalHeight;
    }
    if (options.align) {
      this.alignment = options.align;
    }
  }

  /**
   * Calculate layout (box-modelish). A node's "box" is defined as the entire
   * area in which its text and children inhabbit, plus a padding of `space` to
   * the right. Widths and offsets for nodes are calculated starting at the
   * bottom level, moving up. The width of a given node is defined as the
   * width of all of its _direct_ children combined, or the width of its text
   * (whichever is larger), plus `space` padding to the right. The offset of a
   * given node is simply where the first character of the nodes box
   * (from the left of the entire area) will begin. The offset is absolute, not
   * relative to a nodes parent. The offset of a node is simply the combination
   * of the widths of all of its previous siblings. Heights are not calculated
   * as this can be pretty easily applied during render.
   */
  layout(force?: boolean = false) {
    if (!this._dirty && !force) {
      return;
    }

    for (let i = this._levels.length - 1; i >= 0; i--) {
      const level = this._levels[i];

      for (let j = 0; j < level.length; j++) {
        const node = level[j];

        const childWidth = node.children.reduce((a, c) => a + c.width, 0);
        node.width = Math.max(node.text.width, childWidth) + this.space;
        node.left = 0;

        // If not the first child, we have to calculate an offset and apply
        // to all of the current `node`s children.
        const prev = node.prevSib();
        if (prev) {
          const offset = prev.width + prev.left;
          node.left = offset;

          // Apply offset to children
          node.forEachChild(child => {
            child.left += offset;
          });
        }
      }
    }

    this._dirty = false;
  }

  /**
   * Render the tree to a string.
   * @return {String}
   */
  render(): string {
    // Layout, if neccessary.
    this.layout();

    const bitmap = new Bitmap(this.width(), this.height());
    let verticalOffset = 0;

    this._levels.forEach((level, y) => {
      y += verticalOffset;

      const levelHeight = Math.max(...level.map(n => n.text.height));

      level.forEach(node => {
        if (node.children.length) {
          const start = this._alignVertical(node.children[0]);
          // draw until the last child, or `node` -- in some instances, `node`
          // will be wider than all of its children
          const end = Math.max(
            this._alignVertical(node.children[node.children.length - 1]),
            this._alignVertical(node)
          );

          this._drawHorizontal(
            bitmap,
            y + this.verticalHeight + (levelHeight - 1),
            start,
            end
          );

          // Draw a vertical branch above each child.
          node.children.forEach(child => {
            this._drawVertical(
              bitmap,
              child,
              y + this.verticalHeight + levelHeight
            );
          });

          // Draw vertical branch below node.
          this._drawVertical(
            bitmap,
            node,
            y + node.text.height,
            levelHeight - node.text.height
          );
        }

        // bitmap.writeString(x, y, node.value);
        node.text.lines.forEach((line, i) => {
          let lineX = this._alignX(node, line.length);
          bitmap.writeString(lineX, y + i, line);
        });
      });

      verticalOffset += (levelHeight - 1) + (this.verticalHeight * 2);
    });

    return bitmap.toString();
  }
}
