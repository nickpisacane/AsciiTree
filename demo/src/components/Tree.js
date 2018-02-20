// @flow

import React, {Component} from 'react';

import Tree from '../../../src/Tree';
import type {Options} from '../../../src/Tree';
import type {SimpleNode} from '../../../src/Node';

type Props = {
  input: string;
  inputType: 'xml' | 'json';
  options: $Shape<Options>;
};

export default class TreeComponent extends Component<Props> {
  _tree: Tree;

  isInputValid(): boolean {
    // TODO: Check validity of incoming JSON/XML.
    return true;
  }

  render() {
    return <div>TODO</div>;
  }
}
