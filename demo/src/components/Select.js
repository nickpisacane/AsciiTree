// @flow

import React, { Component } from 'react';
import './Select.css';

type SelectEntry = {
  value: any;
  label: string;
};

type Props = {
  label: string;
  selected: string;
  values: Array<SelectEntry>;
  onChange: (entry: SelectEntry) => void;
};

type State = {
  open: boolean;
};

export default class Select extends Component<Props, State> {
  _select: HTMLDivElement;
  _dropdown: HTMLDivElement;

  _selectRef = (node: null | HTMLDivElement) => {
    if (node) {
      this._select = node;
    }
  };

  _dropdownRef = (node: null | HTMLDivElement) => {
    if (node) {
      this._dropdown = node;
    }
  };

  _handleSelectClick = (event: Event) => {
    this.setState({ open: !this.state.open });
  };

  componentDidMount() {
    if (this._select && this._dropdown) {
      const rect = this._select.getBoundingClientRect();
      this._dropdown.style.top = `${rect.top}px`;
      this._dropdown.style.left = `${rect.left}px`;
      this._dropdown.style.width = `${rect.width}px`;
    }
  }

  render() {
    const {label, selected, values} = this.props;
    const {open} = this.state;

    return (
      <div className='select'
        onClick={this._handleSelectClick}
      >
        <div
          className={`select__dropdown ${open ? 'select__dropdown--open' : ''}`}
          ref={this._dropdownRef}
        >
          <div className='select__dropdown-items'>
            {values.map(value => (
              <div className={`select__dropdown-item ${value.label === selected ? 'select__dropdown-item--selected' : ''}`}>
                {label}
              </div>
            ))}
          </div>
        </div>
        <div className='select__label'>
          {label}
        </div>
      </div>
    );
  }
}
