// @flow

import Tree from '../Tree';

test('basic', () => {
  const tree = new Tree({
    root: {
      value: 'foo',
      children: ['bar', 'bang']
    },
    space: 4,
  });

  // len('bar') + 4 = 7
  expect(tree._root.children[0].width).toBe(7);
  // len('bang') + 4 = 8
  expect(tree._root.children[1].width).toBe(8);

  // max(len('root'), 15) + 4 = 15 + 4 = 19
  expect(tree._root.width).toBe(19);
  expect(tree.width()).toBe(19);

  // (levels - 1) * (verticalHeight * 2) + levels
  // = (2 - 1) * (1 * 2) + 2
  // = 1 * 2 + 2 = 2 + 2 = 4
  expect(tree.height()).toBe(4);
});

test('height', () => {
  const tree = new Tree({
    root: {
      value: 'foo',
      children: [
        {
          value: 'bar',
          children: [
            'bang',
          ]
        },
        'baz',
      ],
    },
  });

  expect(tree._root.height).toBe(3);
  expect(tree.height()).toBe(7);
});
