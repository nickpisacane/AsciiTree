// @flow

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
  code: '',
  format: 'json',
};

export default function editor(
  state: EditorState = initialState,
  action: EditorAction
): EditorState {
  switch (action.type) {
    case 'EDITOR_UPDATE_CODE':
      return Object.assign({}, state, { code: action.code });
    case 'EDITOR_UPDATE_FORMAT':
      return Object.assign({}, state, { format: action.format });
  }

  return state;
}
