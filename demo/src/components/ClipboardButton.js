// @flow

import * as React from 'react';
import ClipboardJS from 'clipboard';
import Button from './Button';
import type {Props as ButtonProps} from './Button';
import './ClipboardButton.css';

export type Props = ButtonProps & {
  text: string;
  activeTime?: number;
  className?: string;
};

type State = {
  active: boolean;
};

export default class ClipboardButton extends React.Component<Props, State> {
  static defaultProps = { activeTime: 3000 };

  _clipboard: ClipboardJS;
  state: State = { active: false };

  _buttonRef = (button: Button | null) => {
    if (!this._clipboard && button) {
      const node = button.button();
      if (node) {
        this._clipboard = new ClipboardJS(node, {
          text: () => this.props.text,
        });
      }
    }
  };

  _handleCopy = () => {
    if (this.state.active) return;

    this.setState({ active: true }, () => {
      setTimeout(() => {
        this.setState({ active: false });
      }, this.props.activeTime);
    });
  };

  componentDidMount() {
    if (this._clipboard) {
      this._clipboard.on('success', this._handleCopy);
    }
  }

  componentWillUnmount() {
    if (this._clipboard) {
      this._clipboard.destroy();
    }
  }

  render() {
    const {active} = this.state;
    const {
      text, // eslint-disable no-unused-vars
      activeTime, // eslint-disable no-unused-vars
      className,
      ...rest
    } = this.props;
    let _className = `clipboard-button ${className || ''}`;
    if (active) {
      _className += ' clipboard-button--active';
    }

    return <Button className={_className} {...rest} ref={this._buttonRef} />;
  }
}
