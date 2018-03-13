// @flow

import * as React from 'react';
import SplitPane from 'react-split-pane';
import {connect} from 'react-redux';
import Header from './ConnectedHeader';
import Controls from './ConnectedControls';
import Editor from './ConnectedEditor';
import Tree from './ConnectedTree';

import type {State} from '../reducers/index';

import './App.css';
import './AppSplitPane.css';

type Props = {
  controls: boolean;
};

class App extends React.Component<Props> {
  render() {
    const {controls} = this.props;

    return (
      <div className='app'>
        <Header />
        <div className='app__main'>
          <div className={`app__controls app__controls--${!controls ? 'hidden' : ''}`}>
            <Controls />
          </div>
          <div className='app__split-pane-container'>
            <SplitPane split='vertical' defaultSize='30%'>
              <div className='app__pane'>
                <Editor />
              </div>
              <div className='app__pane'>
                <Tree />
              </div>
            </SplitPane>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State): Props => ({
  controls: state.ui.controls,
});

export default connect(mapStateToProps)(App);
