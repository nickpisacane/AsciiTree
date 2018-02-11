// @flow

import Bitmap from './Bitmap';

import type {Node, TreeNode} from './Node';
import {nodeToTreeNode, getLevels, isFirstChild, children} from './Node';

// Alignment type for tree nodes.
export type Alignment = 'left' | 'center';

// Tree options type
export type Options = {
  vertical?: string;
  horizontal?: string;
  space?: number;
  verticalHeight?: number;
  align?: Alignment;
};

export default class Tree {
  root: TreeNode;
  levels: Array<Array<TreeNode>>;
  space: number;
  vertical: string;
  horizontal: string;
  verticalHeight: number;
  alignment: Alignment;

  constructor(root: Node, options?: Options = {}) {
    this.space = options.space || 1;
    this.vertical = (options.vertical || '|')[0];
    this.horizontal = (options.horizontal || '_')[0];
    this.verticalHeight = options.verticalHeight || 1;
    this.alignment = options.align || 'center';
    this.root = nodeToTreeNode(root);
    this.levels = getLevels(this.root);
    this._calculate();
  }

  /**
   * A pretty naive "box-model" - no differentiation between margins or padding,
   * just a padding of `space` applied to the right of every node. Widths are
   * calculated starting at the lowest level. Additionally, there is no real
   * relative positioning, rather, positions are propagated out to children
   * statically.
   */
  _calculate() {
    for (let i = this.levels.length - 1; i >= 0; i--) {
      const level = this.levels[i];

      for (let j = 0; j < level.length; j++) {
        const node = level[j];

        const childWidth = node.children.reduce((a, c) => a + c.width, 0);
        node.width = Math.max(node.value.length, childWidth) + this.space;
        node.left = 0;

        // If not the first child, we have to calculate an offset and apply
        // to all of the current `node`s children.
        if (node.parent && !isFirstChild(node)) {
          const p = node.parent;
          const prevSib = p.children[p.children.indexOf(node) - 1];
          const offset = prevSib.width + prevSib.left;
          node.left = offset;

          children(node, child => {
            child.left += offset;
          });
        }
      }
    }
  }

  /**
   * Get the horizontal alignment for a given `node`, based on `alignment`.
   * @param  {TreeNode} node The node to position.
   * @return {Number}      Horizontal position.
   */
  _alignX(node: TreeNode): number {
    if (this.alignment === 'left') return node.left;
    return node.left + Math.ceil((node.width - node.value.length) / 2);
  }

  /**
   * Get the vertical alignment for a given `node`'s vertical branch connector,
   * based on `alignment`.
   * @param  {TreeNode} node The node to calculate a vertical branch for.
   * @return {Number}      Horizontal position of the vertical branch.
   */
  _alignVertical(node: TreeNode): number {
    const x = this._alignX(node);
    if (this.alignment === 'left') return x;
    return x + Math.ceil(node.value.length / 2);
  }

  /**
   * Draws a vertical branch starting at `y` for the given `node`.
   * @param  {Bitmap} bitmap Bitmap to draw to.
   * @param  {TreeNode} node   The node to connect.
   * @param  {Number} y      The vertical starting point for the branch.
   */
  _drawVertical(bitmap: Bitmap, node: TreeNode, y: number) {
    const x = this._alignVertical(node);
    for (let i = 0; i < this.verticalHeight; i++) {
      bitmap.writeString(x, y + i, this.vertical);
    }
  }

  /**
   * Draws a horiztonal branch at `y` from `start` to `end` based on `alignment`.
   * @param  {Bitmap} bitmap The bitmap to draw to.
   * @param  {Number} y      The vertical position to draw on.
   * @param  {TreeNode} start  The node to start at.
   * @param  {TreeNode} end    The node to end at.
   */
  _drawHorizontal(
    bitmap: Bitmap,
    y: number,
    start: TreeNode,
    end: TreeNode
  ) {
    const s = this._alignVertical(start);
    const f = this._alignVertical(end);
    for (let i = s; i <= f; i++) {
      bitmap.writeString(i, y, this.horizontal);
    }
  }

  /**
   * Get the height of the tree.
   * @return {Number}
   */
  height(): number {
    const levelLength = this.levels.length;
    return (levelLength - 1) * (this.verticalHeight * 2) + levelLength;
  }

  /**
   * Get the width of the tree.
   * @return {Number}
   */
  width(): number {
    return this.root.width;
  }

  /**
   * Render the tree to a string.
   * @return {String}
   */
  render(): string {
    const bitmap = new Bitmap(this.width(), this.height());
    let verticalOffset = 0;

    this.levels.forEach((level, y) => {
      y += verticalOffset;

      level.forEach(node => {
        const x = this._alignX(node);

        if (node.children.length) {
          const start = node.children[0];
          const end = node.children[node.children.length - 1];
          this._drawHorizontal(bitmap, y + this.verticalHeight, start, end);

          node.children.forEach(child => {
            this._drawVertical(bitmap, child, y + this.verticalHeight + 1);
          });

          this._drawVertical(bitmap, node, y + 1);
        }
        bitmap.writeString(x, y, node.value);
      });

      verticalOffset += (this.verticalHeight * 2);
    });

    return bitmap.toString();
  }
}
