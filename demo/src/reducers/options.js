// @flow

export type Options = {
  vertical: string;
  horizontal: string;
  space: number;
  verticalHeight: number;
  align: 'left' | 'center';
}

type UpdateAction = {
  type: 'OPTIONS_UPDATE';
  options: Options;
};

export const update = (options: Options): UpdateAction => ({
  type: 'OPTIONS_UPDATE',
  options,
});

type ResetAction = {
  type: 'OPTIONS_RESET';
};

export const reset = (): ResetAction => ({
  type: 'OPTIONS_RESET',
});

export type OptionsAction = UpdateAction | ResetAction;

export type OptionsState = Options;

const initialState = {
  vertical: '|',
  horizontal: '_',
  space: 2,
  verticalHeight: 2,
  align: 'center',
};

export default function options(
  state: OptionsState = initialState,
  action: OptionsAction
): OptionsState {
  switch (action.type) {
    case 'OPTIONS_UPDATE':
      return Object.assign({}, state, action.options);
    case 'OPTIONS_RESET':
      return initialState;
    default:
      return state;
  }
}
