// @flow

import {combineReducers} from 'redux';
import type {DispatchAPI} from 'redux';

import type {EditorState, EditorAction} from './editor';
import editor from './editor';
import type {OptionsState, OptionsAction} from './options';
import options from './options';
import type {UIState, UIAction} from './ui';
import ui from './ui';

export type State = {
  editor: EditorState;
  options: OptionsState;
  ui: UIState;
};
export type Action = EditorAction | OptionsAction | UIAction;
export type Dispatch = DispatchAPI<Action>;

export default combineReducers({
  editor,
  options,
  ui,
});
