// @flow

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import type {State} from '../reducers/index';
import type {Dispatch} from '../reducers/index';
import {toggleControls} from '../reducers/ui';
import Header from './Header';

const mapStateToProps = (state: State) => ({})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  onToggleControls: bindActionCreators(toggleControls, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
