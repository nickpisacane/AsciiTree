// @flow

import React, { Component } from 'react';
import './Select.css';

type SelectOption = {
  value: any;
  label: string;
};

type Props = {
  selected: string;
  options: Array<SelectOption>;
  onChange: (option: SelectOption) => void;
};

type State = {
  open: boolean;
};

export default class Select extends Component<Props, State> {
  state = {
    open: false,
  };

  _handleDocumentClick = (event: Event) => {
    const t = event.target;
    const abort = t instanceof HTMLElement && t.matches('.select, .select > *');
    if (this.state.open && !abort) {
      this.setState({ open: false });
    }
  };

  _handleSelectClick = (event: Event) => {
    this.setState({ open: !this.state.open });
  };

  _createOptionClickHandler = (option: SelectOption) => {
    return (event: Event) => {
      event.stopPropagation();
      this.props.onChange(option);
      this.setState({ open: false });
    };
  };

  componentDidMount() {
    document.addEventListener('click', this._handleDocumentClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._handleDocumentClick, false);
  }

  render() {
    const {selected, options, ...rest} = this.props;
    const {open} = this.state;

    return (
      <div className='select'
        onClick={this._handleSelectClick}
        {...rest}
      >
        <div
          className={`select__dropdown ${open ? 'select__dropdown--open' : ''}`}
        >
          <div className='select__dropdown-items'>
            {options.map(option => (
              <div
                className={`select__dropdown-item ${option.label === selected ? 'select__dropdown-item--selected' : ''}`}
                key={option.label}
                onClick={this._createOptionClickHandler(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
        <div className='select__value'>
          {selected}
        </div>
        <span className='fa fa-caret-down select__caret' />
      </div>
    );
  }
}
