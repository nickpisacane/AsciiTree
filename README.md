 # ASCII Tree

Generate well-structured textual trees from JSON or XML.

# Demo
[ASCII Tree Demo](https://nickpisacane.github.io/AsciiTree)

# Installation

```sh
# Global (CLI)
npm i -g @nindaff/ascii-tree
# or
yarn global add @nindaff/ascii-tree

# Local
npm i -s @nindaff/ascii-tree
# or
yarn add @nindaff/ascii-tree
```

# Usage

## CLI

```sh
ascii-tree -space 2 tree.xml
```

## API
### Example
```js
// Example
const simpleNode = {
  value: 'root',
  children: [
    'child-1',
    'child-2',
    {
      value: 'child-3',
      children: [
        'child-3-1',
        'child-3-2',
      ],
    }
  ],
};

// XML Equivalent, see XML Syntax for more details.
const xmlString = `
<root>
  <child-1 />
  <child-2 />
  <child-3>
    <child-3-1 />
    <child-3-2 />
  </child-3>
</root>
`;

const tree = new Tree({
  root: simpleNode // or xmlString,
});

console.log(tree.render()); // =>
/*
                 root                 
   ________________|_______           
   |       |              |           
child-1 child-2        child-3        
                    ______|____       
                    |         |       
                child-3-1 child-3-2   
 */
```

### Types
#### SimpleNode
```js
type SimpleNode = string | {
  value: string;
  children?: Array<SimpleNode>;
};

// SimpleNode
const simpleNode = {
  value: 'root',
  children: [
    'child-1',
    'child-2',
    {
      value: 'child-3',
      children: [
        'child-2-1',
        'child-2-2',
      ],
    },
  ],
};
```

#### Options
```js
type Options = {
  // Either a plain JavaScript object (SimpleNode) or XML string
  root: SimpleNode | string,
  // The character to use for drawing vertical branches
  vertical?: string;
  // The character to use for drawing horizontal branches
  horizontal?: string;
  // The space (to the left) of each node
  space?: number;
  // The height of the vertical branch (between nodes)
  verticalHeight?: number;
  // The alignment of nodes
  align?: 'left' | 'center';
};
```

### Tree(options)
* Tree constructor

### Tree.render(): *string*
* Render the tree to a string

### Tree.height(): *number*
* Returns the number of lines that the tree will occupy

### Tree.width(): *number*
* Returns the number of characters that the tree will occupy

### Tree.update(options: *Options*)
* Update the tree's options

### Tree.layout(force?: *boolean*)
* Calculate the tree layout

### XML Syntax
The `value` of a given node (what represents that node textually in the tree)
is derived from an XML node's in the following order:
 1. `value` attribute
 2. text content
 3. node-name

with `value` attribute having the highest order precedence. Take the following
examples:
```xml
  <node value="Foo Bar" />
  => `Foo Bar`

  <any-thing>Some Text</any-thing>
  => `Some Text`

  <node />
  => `node`
```
