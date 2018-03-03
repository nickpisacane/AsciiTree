// @flow

import * as React from 'react';
import type {Options} from '../reducers/options';
import Select from './Select';
import Button from './Button';
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
        <Control label='Format'>
          <Select
            selected={format}
            onChange={option => onFormatChange((option.value: 'xml' | 'json'))}
            options={[
              {value: 'xml', label: 'xml'},
              {value: 'json', label: 'json'},
            ]}
          />
        </Control>
        <Button
          round
          secondary
          icon='undo'
          onClick={onReset}
        />
      </div>
    );
  }
}
