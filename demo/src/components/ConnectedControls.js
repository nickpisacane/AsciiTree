// @flow

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import type {DispatchAPI} from 'redux';

import Controls from './Controls';
import type {Props} from './Controls';
import {update, reset} from '../reducers/options';
import {updateFormat} from '../reducers/editor';
import type {State, Dispatch} from '../reducers/index';

const mapStateToProps = (state: State) => ({
  format: state.editor.format,
  options: state.options,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onFormatChange: bindActionCreators(updateFormat, dispatch),
  onOptionsChange: bindActionCreators(update, dispatch),
  onReset: bindActionCreators(reset, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
