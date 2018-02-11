// @flow

// TreeNode is the node-type used internally.
export interface TreeNode {
  parent: TreeNode | null;
  value: string;
  children: TreeNode[];
  width: number;
  left: number;
};

// NodeObj, and Node, are simplified nodes that will be accepted as inputs
// in the primary API.
export interface NodeObj {
  value: string;
  children?: Array<Node>;
};

// @see: NodeObj
export type Node = string | NodeObj;

/**
 * Convert a `Node` to a `DocumentNode`.
 */
export function nodeToTreeNode(
  node: Node,
  parent?: TreeNode | null = null
): TreeNode {
  const docNode: TreeNode = {
    parent,
    value: typeof node === 'string' ? node : node.value,
    width: 0,
    left: 0,
    children: [],
  };

  if (typeof node !== 'string' && node.children) {
    docNode.children = node.children.map(c => nodeToTreeNode(c, docNode));
  }

  return docNode;
}

/**
 * Get the levels of a given `TreeNode`.
 */
export function getLevels(root: TreeNode): Array<Array<TreeNode>> {
  let queue: Array<TreeNode> = [root];
  const ret: Array<Array<TreeNode>> = [];
  while (queue.length) {
    ret.push(queue)
    const temp: Array<TreeNode> = [];
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
export function children(root: TreeNode, visitor: (node: TreeNode) => void) {
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
export function isFirstChild(node: TreeNode): boolean {
  if (node.parent) {
    const c = node.parent.children;
    return c.indexOf(node) === 0;
  }
  return true;
}
