// @flow

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Editor from './Editor';
import {updateCode} from '../reducers/editor';
import type {State, Dispatch} from '../reducers';

const mapStateToProps = (state: State) => state.editor;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onChange: bindActionCreators(updateCode, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
