// @flow

import {connect} from 'react-redux';
import type {State, Dispatch} from '../reducers/index';
import Tree from './Tree';

const mapStateToProps = (state: State) => ({
  input: state.editor.code,
  format: state.editor.format,
  options: state.options,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Tree);
