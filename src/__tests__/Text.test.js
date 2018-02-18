// @flow

import Text from '../Text';

test('basic', () => {
  const text = new Text('foo');
  expect(text.lines).toEqual(['foo']);
  expect(text.width).toBe(3);
  expect(text.height).toBe(1);
});

test('multi-line', () => {
  const text = new Text('multi\nline');
  expect(text.lines).toEqual(['multi', 'line']);
  expect(text.width).toBe(5);
  expect(text.height).toBe(2);
});

test('removes tabs', () => {
  const text = new Text('multi\t\nline');
  expect(text.lines).toEqual(['multi', 'line']);
  expect(text.width).toBe(5);
  expect(text.height).toBe(2);
});
