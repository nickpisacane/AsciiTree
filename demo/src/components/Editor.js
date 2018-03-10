// @flow

import * as React from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/json';
import 'brace/mode/xml';
import 'brace/theme/github';

import './Editor.css';

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
          editorProps={{
            $blockScrolling: true,
          }}
          width='100%'
          height='100%'
          ref={node => {
            console.log('NODE: ', node);
            window.editor = node;
          }}
        />
      </div>
    );
  }
}
