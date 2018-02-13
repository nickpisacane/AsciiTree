// @flow

import Node from '../Node';

test('it creates a Node from a string', () => {
  const node = Node.fromSimpleNode('foo');

  expect(node.parent).toBe(null);
  expect(node.position).toBe(0);
  expect(node.value).toBe('foo');
  expect(node.children).toHaveLength(0);
  expect(node.width).toBe(0);
  expect(node.left).toBe(0);
});

test('it creates a Node from a SimpleNode', () => {
  const node = Node.fromSimpleNode({
    value: 'foo',
    children: [
      {
        value: 'bar',
        children: ['bar-1'],
      },
      { value: 'bang' },
      { value: 'baz' },
    ],
  });

  expect(node.value).toBe('foo');
  expect(node.children).toHaveLength(3);
  expect(node.children[0].value).toBe('bar');
  expect(node.children[0].children[0].value).toBe('bar-1');
  expect(node.children[1].value).toBe('bang');
  expect(node.children[2].value).toBe('baz');
});

test('Node#prevSib()', () => {
  const node = Node.fromSimpleNode({
    value: 'foo',
    children: ['bar', 'bang'],
  });

  const p = node.children[1].prevSib();
  expect(p).not.toBe(null);
  if (p) {
    expect(p.value).toBe('bar');
  }
});

test('Node#getLevels()', () => {
  const node = Node.fromSimpleNode({
    value: 'foo',
    children: [
      { value: 'bar', children: ['bar-1', 'bar-2'] },
      { value: 'bang', children: ['bang-1', 'bang-2'] },
    ],
  });

  const levels = node.getLevels();
  expect(levels[0]).toEqual([node]);
  expect(levels[1]).toEqual([...node.children]);
  expect(levels[2]).toEqual([
    ...node.children[0].children,
    ...node.children[1].children,
  ]);
});

test('Node#forEachChild()', () => {
  const node = Node.fromSimpleNode({
    value: 'foo',
    children: [
      { value: 'bar', children: ['bar-1', 'bar-2'] },
      { value: 'bang', children: ['bang-1', 'bang-2'] },
    ],
  });

  const visited: Array<string> = [];
  node.forEachChild(child => {
    visited.push(child.value);
  });

  expect(visited).toEqual([
    'bar',
    'bang',
    'bar-1',
    'bar-2',
    'bang-1',
    'bang-2',
  ]);
})
