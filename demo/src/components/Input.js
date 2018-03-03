// @flow

import * as React from 'react';
import './Input.css';

type Props = {
  type: string;
  value: string | number;
  onChange: (value: string | number) => void;
  min?: number;
  max?: number;
  style?: Object;
  className?: string;
};

const clamp = (v: number, min: number = -Infinity, max: number = Infinity) =>
  v < min ? min : v > max ? max : v;

export default class Input extends React.Component<Props> {
  _input: HTMLInputElement;

  _inputRef = (node: HTMLInputElement | null) => {
    if (node) {
      this._input = node;
    }
  };

  _handleIncrement = (event: SyntheticEvent<HTMLSpanElement>) => {
    this.addToValue(1);
    this.focus();
  };

  _handleDecrement = (event: SyntheticEvent<HTMLSpanElement>) => {
    this.addToValue(-1);
    this.focus();
  };

  _handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    let value = event.currentTarget.value;
    if (this.props.type === 'number') {
      value = clamp(parseInt(value, 10), this.props.min, this.props.max);
    }
    this.props.onChange(value);
  };

  focus() {
    if (this._input) {
      this._input.focus();
    }
  }

  addToValue(n: number) {
    if (this.props.type !== 'number') {
      throw new Error(
        `Input: addToValue() can only be called when using type=number`
      );
    }

    let value = this.props.value;
    if (typeof value === 'string') {
      value = parseInt(value, 10);
    }
    if (isNaN(value)) {
      throw new Error(`Input: Failed to parse number`);
    }

    const newValue = clamp(value + n, this.props.min, this.props.max);
    if (value !== newValue) {
      this.props.onChange(newValue);
    }
  }

  render() {
    const {
      type,
      value,
      onChange,
      style = {},
      className = '',
      ...rest
    } = this.props;

    return (
      <div className={`input ${className}`} style={style}>
        <input
          ref={this._inputRef}
          type={type}
          value={type === 'number' && isNaN(value) ? '' : value}
          className='input__input'
          onChange={this._handleChange}
          {...rest}
        />
        {type === 'number' && (
          <div className='input__number-controls'>
            <span
              className='input__number-control fa fa-caret-up'
              onClick={this._handleIncrement}
            />
            <span
              className='input__number-control fa fa-caret-down'
              onClick={this._handleDecrement}
            />
          </div>
        )}
      </div>
    );
  }
}
