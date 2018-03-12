// @flow

import * as React from 'react';

import './Button.css';

export type Props = {
  label?: string;
  icon?: string;
  primary?: boolean;
  secondary?: boolean;
  round?: boolean;
  className?: string;
};

const getClassName = (props: Props): string => {
  const classNames = ['button'];
  if (props.primary) {
    classNames.push('button--primary');
  } else if (props.secondary) {
    classNames.push('button--secondary');
  }
  if (props.round) {
    classNames.push('button--round');
  }
  if (props.className) {
    classNames.push(props.className);
  }
  return classNames.join(' ');
};

export default class Button extends React.Component<Props> {
  _button: HTMLButtonElement | null = null;
  _buttonRef = (button: HTMLButtonElement | null) => {
    this._button = button;
  };

  button(): HTMLButtonElement | null {
    return this._button;
  }

  render() {
    const {
      label,
      icon,
      primary,
      secondary,
      round,
      className,
      ...rest
    } = this.props;

    return (
      <button
        className={getClassName(this.props)}
        {...rest}
        ref={this._buttonRef}
      >
        {!!label && (
          <span className='button__label'>{label}</span>
        )}
        {!!icon && (
          <span className={`button__icon fa fa-${icon}`} />
        )}
      </button>
    );
  }
}
