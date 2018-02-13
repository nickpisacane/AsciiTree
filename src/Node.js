// @flow

// SimpleNodeObj and SimpleNode are simple ways of representing a Node-like
// or Tree-like data-structure that can be easily transformed into a full `Node`
export interface SimpleNodeObj {
  value: string;
  children?: Array<SimpleNode>;
}

// @see: SimpleNodeObj
export type SimpleNode = string | SimpleNodeObj;

// Options type for Node
export type NodeOptions = {
  position?: number;
  parent?: Node | null;
  value?: string;
  children?: Array<Node>;
  width?: number;
  left?: number;
}

export default class Node {
  position: number;
  parent: Node | null;
  value: string;
  children: Array<Node>;
  width: number;
  left: number;

  /**
   * Create a `Node` from a `SimpleNode`. Applied recursively to children.
   */
  static fromSimpleNode(
    simpleNode: SimpleNode,
    parent?: Node | null = null,
    position?: number = 0
  ): Node {
    const options: NodeOptions = {
      position,
      parent,
      value: typeof simpleNode === 'string' ? simpleNode : simpleNode.value,
    };

    const node = new Node(options);

    if (typeof simpleNode !== 'string' && simpleNode.children) {
      node.children = simpleNode.children.map((child, i) =>
        Node.fromSimpleNode(child, node, i));
    }

    return node;
  }

  /**
   * Supply optional values based on the public properties in `Node`.
   */
  constructor(node?: NodeOptions) {
    this.position = 0;
    this.parent = null;
    this.value = '';
    this.children = [];
    this.width = 0;
    this.left = 0;

    Object.assign(this, node);
  }

  /**
   * Get the previous sibling of the current `Node`, if exists,
   * otherwise `null`.
   */
  prevSib(): Node | null {
    if (this.parent && this.position > 0) {
      return this.parent.children[this.position - 1];
    }
    return null;
  }

  /**
   * Get a level representation of the `Node` and its children. The levels
   * are represented as a matrix of `Node`s with the first level containing
   * a simple element, the root. Each subsequent level contains the children
   * from _ALL_ of the nodes in the preceding level.
   */
  getLevels(): Array<Array<Node>> {
    let queue: Array<Node> = [this];
    const ret: Array<Array<Node>> = [];
    while (queue.length) {
      ret.push(queue);
      const temp: Array<Node> = [];
      queue.forEach(n => {
        temp.splice(temp.length, n.children.length, ...n.children);
      });
      queue = temp;
    }
    return ret;
  }

  /**
   * Iterate through all of the children of a given `Node`
   */
  forEachChild(visitor: (node: Node) => void) {
    const queue = [...this.children];
    while (queue.length) {
      const node = queue.shift();
      visitor(node);
      queue.splice(queue.length, node.children.length, ...node.children);
    }
  }
}
