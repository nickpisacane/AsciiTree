// @flow

import {combineReducers} from 'redux';
import type {DispatchAPI} from 'redux';

import type {EditorState, EditorAction} from './editor';
import editor from './editor';
import type {OptionsState, OptionsAction} from './options';
import options from './options';

export type State = {
  editor: EditorState;
  options: OptionsState;
};
export type Action = EditorAction | OptionsAction;
export type Dispatch = DispatchAPI<Action>;

export default combineReducers({
  editor,
  options,
});
