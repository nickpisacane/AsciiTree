// @flow

import * as React from 'react';

import './Button.css';

type Props = {
  label?: string;
  icon?: string;
  primary?: boolean;
  secondary?: boolean;
  round?: boolean;
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
  return classNames.join(' ');
};

export default class Button extends React.Component<Props> {
  render() {
    const {
      label,
      icon,
      primary,
      secondary,
      round,
      ...rest
    } = this.props;

    return (
      <button
        className={getClassName(this.props)}
        {...rest}
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
