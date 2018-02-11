'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nodeToTreeNode = nodeToTreeNode;
exports.getLevels = getLevels;
exports.children = children;
exports.isFirstChild = isFirstChild;


/**
 * Convert a `Node` to a `DocumentNode`.
 */


// NodeObj, and Node, are simplified nodes that will be accepted as inputs
// in the primary API.
function nodeToTreeNode(node, parent = null) {
  const docNode = {
    parent,
    value: typeof node === 'string' ? node : node.value,
    width: 0,
    left: 0,
    children: []
  };

  if (typeof node !== 'string' && node.children) {
    docNode.children = node.children.map(c => nodeToTreeNode(c, docNode));
  }

  return docNode;
}

/**
 * Get the levels of a given `TreeNode`.
 */


// @see: NodeObj


// TreeNode is the node-type used internally.
function getLevels(root) {
  let queue = [root];
  const ret = [];
  while (queue.length) {
    ret.push(queue);
    const temp = [];
    queue.forEach(n => {
      temp.splice(temp.length, n.children.length, ...n.children);
    });
    queue = temp;
  }
  return ret;
}

/**
 * Iterate through all the children of a given `TreeNode`.
 */
function children(root, visitor) {
  const queue = [...root.children];
  while (queue.length) {
    const node = queue.shift();
    visitor(node);
    queue.splice(queue.length, node.children.length, ...node.children);
  }
}

/**
 * Determine if a given `node` is the `FirstChild` of its parent.
 */
function isFirstChild(node) {
  if (node.parent) {
    const c = node.parent.children;
    return c.indexOf(node) === 0;
  }
  return true;
}