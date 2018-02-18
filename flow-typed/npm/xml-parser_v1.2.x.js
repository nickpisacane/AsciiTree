type XMLAttributes = {
  [string]: string;
};

type XMLNode = {
  name: string;
  attributes: XMLAttributes;
  children: Array<XMLNode>;
  content?: string;
};

type XMLDeclaration = {
  attributes: XMLAttributes;
};

type XMLDocument = {
  declaration: XMLDeclaration;
  root: XMLNode;
};

declare module 'xml-parser' {
  declare export default function parse(doc: string): XMLDocument;
}
