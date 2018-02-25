// @flow

import {combineReducers} from 'redux';

import type {EditorState, EditorAction} from './editor';
import editor from './editor';

export type State = {
  editor: EditorState;
};
export type Action = EditorAction;
export type Dispatch = (action: Action) => void;

export default combineReducers({
  editor,
});
