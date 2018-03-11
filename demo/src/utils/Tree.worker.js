import Tree from '@nindaff/ascii-tree';
import parseXML from 'xml-parser';

/* eslint-disable no-restricted-globals */

const tree = new Tree({
  root: {
    value: '',
  },
});

const send = data => {
  self.postMessage({
    name: 'render',
    data,
  });
};

const handleUpdate = data => {
  try {
    let root: SimpleNode | string = data.input;
    if (data.format === 'json') {
      root = JSON.parse(root);
    } else {
      // just to validate
      parseXML(root);
    }

    tree.update(Object.assign({
      root,
    }, data.options));

    send(tree.render());
  } catch (err) {}
};

self.onmessage = event => {
  if (event.data.name === 'update') {
    handleUpdate(event.data.data);
  }
};
