// @flow

import parseXML from 'xml-parser';

import type {EditorFormat} from '../reducers/editor';

const strTimes = (str: string, n: number) => new Array(n).fill(str).join('');

const jsonToXML = (obj: any, tabLevel: number = 0): string => {
  const value = typeof obj === 'string' ? obj : obj.value;
  const children = obj.children || [];
  const tab = strTimes('\t', tabLevel);

  if (!value) {
    return '';
  }

  return `${tab}<node value="${value}">\n` +
    (children.length
      ? `${children.map(c => jsonToXML(c, tabLevel + 1)).join('\n')}\n`
      : ''
    ) +
    `${tab}</node>`;
};

const xmlToJSON = (root: XMLNode): any => {
  return {
    value: root.attributes.value || root.content || root.name,
    children: root.children.map(xmlToJSON),
  };
}

export default function transform(format: EditorFormat, code: string): string {
  if (format === 'json') {
    return jsonToXML(JSON.parse(code));
  }

  return JSON.stringify(xmlToJSON(parseXML(code).root), null, '\t');
}
