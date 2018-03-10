// @flow

type ToggleControlsAction = {
  type: 'UI_TOGGLE_CONTROLS';
};

export const toggleControls = (): ToggleControlsAction => ({
  type: 'UI_TOGGLE_CONTROLS',
});

export type UIAction = ToggleControlsAction;

export type UIState = {
  controls: bool;
};

const initialState: UIState = {
  controls: true,
};

export default function ui(
  state: UIState = initialState,
  action: UIAction
): UIState {
  switch (action.type) {
    case 'UI_TOGGLE_CONTROLS':
      return Object.assign({}, state, { controls: !state.controls });
    default:
      return state;
  }
}
