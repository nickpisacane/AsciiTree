'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Bitmap = require('./Bitmap');

var _Bitmap2 = _interopRequireDefault(_Bitmap);

var _Node = require('./Node');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Alignment type for tree nodes.


// Tree options type
class Tree {

  constructor(root, options = {}) {
    this.space = options.space || 1;
    this.vertical = (options.vertical || '|')[0];
    this.horizontal = (options.horizontal || '_')[0];
    this.verticalHeight = options.verticalHeight || 1;
    this.alignment = options.align || 'center';
    this.root = (0, _Node.nodeToTreeNode)(root);
    this.levels = (0, _Node.getLevels)(this.root);
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
        if (node.parent && !(0, _Node.isFirstChild)(node)) {
          const p = node.parent;
          const prevSib = p.children[p.children.indexOf(node) - 1];
          const offset = prevSib.width + prevSib.left;
          node.left = offset;

          (0, _Node.children)(node, child => {
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
  _alignX(node) {
    if (this.alignment === 'left') return node.left;
    return node.left + Math.ceil((node.width - node.value.length) / 2);
  }

  /**
   * Get the vertical alignment for a given `node`'s vertical branch connector,
   * based on `alignment`.
   * @param  {TreeNode} node The node to calculate a vertical branch for.
   * @return {Number}      Horizontal position of the vertical branch.
   */
  _alignVertical(node) {
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
  _drawVertical(bitmap, node, y) {
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
  _drawHorizontal(bitmap, y, start, end) {
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
  height() {
    const levelLength = this.levels.length;
    return (levelLength - 1) * (this.verticalHeight * 2) + levelLength;
  }

  /**
   * Get the width of the tree.
   * @return {Number}
   */
  width() {
    return this.root.width;
  }

  /**
   * Render the tree to a string.
   * @return {String}
   */
  render() {
    const bitmap = new _Bitmap2.default(this.width(), this.height());
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

      verticalOffset += this.verticalHeight * 2;
    });

    return bitmap.toString();
  }
}
exports.default = Tree;