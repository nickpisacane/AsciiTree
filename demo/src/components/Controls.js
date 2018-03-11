// @flow

import * as React from 'react';
import type {Options} from '../reducers/options';
import Select from './Select';
import Button from './Button';
import Input from './Input';
import './Controls.css';

export type Props = {
  options: Options;
  format: 'xml' | 'json';
  onFormatChange: (format: 'xml' | 'json') => void;
  onOptionsChange: (options: Options) => void;
  onReset: () => void;
};

const Control = ({label, children}: {label: string; children?: React.Node}) => (
  <div className='control'>
    <div className='control__label'>
      {label}
    </div>
    <div className='control__action'>
      {children}
    </div>
  </div>
);

export default class Controls extends React.Component<Props> {
  _handleVerticalChange = (value: string | number) => {
    this.handleTextOptionChange('vertical', value.toString());
  };

  _handleHorizontalChange = (value: string | number) => {
    this.handleTextOptionChange('horizontal', value.toString());
  };

  _handleSpaceChange = (value: string | number) => {
    this.handleNumberOptionChange('space', parseInt(value, 10));
  };

  _handleVerticalHeightChange = (value: string | number) => {
    this.handleNumberOptionChange('verticalHeight', parseInt(value, 10));
  };

  _handleAlignChange = ({value}: { label: string; value: any }) => {
    if (value !== 'left' && value !== 'center') {
      throw new Error(`Invalid Alignment: ${value.toString()}`);
    }
    const newOptions = Object.assign({}, this.props.options, {
      align: (value: 'left' | 'center'),
    });
    this.props.onOptionsChange(newOptions);
  };

  _handleFormatChange = ({value}: { label: string; value: any }) => {
    if (value !== 'xml' && value !== 'json') {
      throw new Error(`Invalid Format: ${value.toString()}`);
    }
    this.props.onFormatChange((value: 'xml' | 'json'));
  }

  handleTextOptionChange(prop: 'vertical' | 'horizontal', value: string) {
    const newOptions: Options = Object.assign({}, this.props.options, {
      [prop]: value.charAt(0),
    });
    this.props.onOptionsChange(newOptions);
  }

  handleNumberOptionChange(prop: 'space' | 'verticalHeight', value: number) {
    const newOptions: Options = Object.assign({}, this.props.options, {
      [prop]: value,
    });
    this.props.onOptionsChange(newOptions);
  }

  render() {
    const {
      options,
      format,
      onFormatChange,
      onOptionsChange,
      onReset,
      ...rest
    } = this.props;

    return (
      <div className='controls'>
        <div className='controls__reset'>
          <div className='controls__label'>
            Reset
          </div>
          <Button
            round
            secondary
            icon='undo'
            onClick={onReset}
            title='Reset'
          />
        </div>
        <Control label='Format'>
          <Select
            selected={format}
            onChange={this._handleFormatChange}
            style={{width: '100%'}}
            options={[
              {value: 'xml', label: 'xml'},
              {value: 'json', label: 'json'},
            ]}
          />
        </Control>
        <Control label='Vertical Character'>
          <Input
            type='text'
            style={{width: '100%'}}
            value={options.vertical}
            onChange={this._handleVerticalChange}
          />
        </Control>
        <Control label='Horizontal Character'>
          <Input
            type='text'
            style={{width: '100%'}}
            value={options.horizontal}
            onChange={this._handleHorizontalChange}
          />
        </Control>
        <Control label='Spacing'>
          <Input
            type='number'
            style={{width: '100%'}}
            value={options.space}
            onChange={this._handleSpaceChange}
            min={1}
          />
        </Control>
        <Control label='Vertical Height'>
          <Input
            type='number'
            style={{width: '100%'}}
            value={options.verticalHeight}
            onChange={this._handleVerticalHeightChange}
            min={1}
          />
        </Control>
        <Control label='Alignment'>
          <Select
            selected={options.align}
            onChange={this._handleAlignChange}
            style={{width: '100%'}}
            options={[
              {value: 'left', label: 'left'},
              {value: 'center', label: 'center'},
            ]}
          />
        </Control>
      </div>
    );
  }
}
