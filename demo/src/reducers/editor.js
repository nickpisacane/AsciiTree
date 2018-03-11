// @flow

import transform from '../utils/transform';
import defaultCode from '../defaultCode';

export type EditorFormat = 'xml' | 'json';

type UpdateCodeAction = {
  type: 'EDITOR_UPDATE_CODE';
  code: string;
};

export const updateCode = (code: string): UpdateCodeAction => ({
  type: 'EDITOR_UPDATE_CODE',
  code,
});

type UpdateFormatAction = {
  type: 'EDITOR_UPDATE_FORMAT';
  format: EditorFormat;
};

export const updateFormat = (format: EditorFormat): UpdateFormatAction => ({
  type: 'EDITOR_UPDATE_FORMAT',
  format,
});

export type EditorAction = UpdateCodeAction | UpdateFormatAction;

export type EditorState = {
  code: string;
  format: EditorFormat;
};

const initialState: EditorState = {
  code: defaultCode,
  format: 'xml',
};

const handleUpdateFormat = (state: EditorState, format: EditorFormat): State => {
  const newState = Object.assign({}, state, { format });

  if (state.code) {
    try {
      newState.code = transform(state.format, state.code);
    } catch (err) {
      console.error('Failed to Transform: ', err)
    }
  }

  return newState;
}

export default function editor(
  state: EditorState = initialState,
  action: EditorAction
): EditorState {
  switch (action.type) {
    case 'EDITOR_UPDATE_CODE':
      return Object.assign({}, state, { code: action.code });
    case 'EDITOR_UPDATE_FORMAT':
      return handleUpdateFormat(state, action.format);
  }

  return state;
}
