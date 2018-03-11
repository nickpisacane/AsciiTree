// @flow

import * as React from 'react';
import type {Options} from '@nindaff/ascii-tree';
import isEqual from 'deep-equal';
import type {EditorFormat} from '../reducers/editor';
import AsyncTree from '../utils/AsyncTree';
import './Tree.css';

type Props = {
  input: string;
  format: EditorFormat;
  options: $Shape<Options>;
};

type State = {
  tree: string;
};

export default class TreeComponent extends React.Component<Props, State> {
  state: State = {
    tree: '',
  };

  handleRender = (tree: string) => {
    this.setState({ tree });
  };

  componentDidMount() {
    AsyncTree.addListener(this.handleRender);
    if (this.props.input) {
      AsyncTree.update(this.props);
    }
  }

  componentWillUnmount() {
    AsyncTree.removeListener(this.handleRender);
  }

  shouldUpdateTree(prevProps: Props, nextProps: Props) {
    return prevProps.input !== nextProps.input ||
      prevProps.format !== nextProps.format ||
      !isEqual(prevProps.options, nextProps.options);
  }

  componentDidUpdate(prevProps: Props) {
    if (this.shouldUpdateTree(prevProps, this.props)) {
      AsyncTree.update(this.props);
    }
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
