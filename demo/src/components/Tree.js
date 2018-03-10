// @flow

import React, {Component} from 'react';

import Tree from '../../../src/Tree';
import type {Options} from '../../../src/Tree';
import type {SimpleNode} from '../../../src/Node';

import './Tree.css';

type Props = {
  input: string;
  inputType: 'xml' | 'json';
  options: $Shape<Options>;
};

type State = {
  tree: string;
};

export default class TreeComponent extends Component<Props, State> {
  _tree: Tree;
  state: State = {
    tree: '',
  };

  getTreeOptions(): Options {
    const {input, inputType, options} = this.props;

    let root: SimpleNode | string;
    if (inputType === 'json') {
      root = (JSON.parse(input): SimpleNode);
    } else {
      root = input;
    }

    return Object.assign({}, options, { root });
  }

  updateTree() {
    try {
      const options = this.getTreeOptions()
      if (!this._tree) {
        this._tree = new Tree(options);
      } else {
        this._tree.update(options);
      }
      const output = this._tree.render();
      this.setState({ tree: output });
    } catch (err) {
      console.error('Tree Error: ', err);
    }
  }

  componentDidUpdate(prevProps: Props) {
    this.updateTree();
  }

  render() {
    const {tree} = this.state;

    return (
      <div className='tree'>
        <pre className='tree__text'>
          {tree}
        </pre>
      </div>
    )
  }
}
