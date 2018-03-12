// @flow

import * as React from 'react';
import ClipboardJS from 'clipboard';
import Button from './Button';
import type {Props as ButtonProps} from './Button';

export type Props = ButtonProps & {
  text: string;
};

export default class ClipboardButton extends React.Component<Props> {
  _clipboard: ClipboardJS;

  _buttonRef = (button: Button | null) => {
    if (!this._clipboard && button) {
      const node = button.button();
      console.log('node: ', node);
      if (node) {
        this._clipboard = new ClipboardJS(node, {
          text: () => this.props.text,
        });
      }
    }
  };

  render() {
    const {text, ...rest} = this.props;
    return <Button {...rest} ref={this._buttonRef} />;
  }
}
