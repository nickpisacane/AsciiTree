// @flow

import * as React from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/json';
import 'brace/mode/xml';
import 'brace/theme/github';

type Props = {
  code: string;
  format: 'xml' | 'json';
  onChange: (code: string) => void;
};

export default class Editor extends React.Component<Props> {
  render() {
    const {format, code, onChange} = this.props;

    return (
      <div className='editor'>
        <AceEditor
          mode={format}
          theme='github'
          name='AsciiTreeEditor'
          onChange={onChange}
          value={code}
        />
      </div>
    );
  }
}
