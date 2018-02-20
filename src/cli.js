#!/usr/bin/env node

// @flow

import fs from 'fs';
import path from 'path';
import yargs from 'yargs';
import pkg from '../package.json';

import type {Options, Alignment} from './Tree';
import Tree from './Tree';

const EXEC_NAME = 'ascii-tree';
const VERSION = pkg.version;

const helpMsg = `
${EXEC_NAME} ${VERSION}
Usage:
  ${EXEC_NAME} [...options] <file>

Options:
  --help           Display this message.
  --space          The number of spaces between nodes
  --vertical       The character to use for drawing vertical branches
  --horizontal     The character to use for drasing horizontal branches
  --verticalHeight The number of vertical characters to draw for a single vertical branch
  --align          The text alignment (center, left)
`;

const help = () => {
  console.error(helpMsg);
  process.exit(1);
};

const readFile = (fileName: string): Promise<string> =>
  new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf-8', (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });

const getOptions = async (): Promise<Options> => {
  const {argv} = yargs;
  const fileName = argv._[0];
  const file = await readFile(fileName);

  let options: Options;

  if (path.extname(fileName) === '.xml') {
    options = ({root: file}: Options);
  } else {
    try {
      options = ({root: JSON.parse(file)}: Options);
    } catch (err) {
      throw new Error(
        `Bad File "${fileName}". Please provide xml or JSON formats.`
      );
    }
  }

  if (argv.space) {
    options.space = parseInt(argv.space, 10);
    if (options.space < 0) {
      throw new Error(
        `Bad Option (space) "${options.space}": ` +
        `Please provide a non-negative value.`
      );
    }
  }
  if (argv.verticalHeight) {
    options.verticalHeight = parseInt(argv.verticalHeight, 10);
    if (options.verticalHeight < 0) {
      throw new Error(
        `Bad Option (verticalHeight) "${options.verticalHeight}": ` +
        `Please provide a non-negative value.`
      );
    }
  }
  if (typeof argv.vertical === 'string') {
    options.vertical = argv.vertical;
  }
  if (typeof argv.horizontal === 'string') {
    options.horizontal = argv.horizontal;
  }
  if (typeof argv.align === 'string') {
    const {align} = argv;
    if (align !== 'left' && align !== 'center') {
      throw new Error(
        `Bad Option (align) "${align}": ` +
        `Possible values are "center", or "left".`
      );
    }
    options.align = (align: Alignment);
  }

  return options;
};

const main = async () => {
  try {
    const options = await getOptions();
    const tree = new Tree(options);
    process.stdout.write(tree.render());
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

main().catch(err => {
  process.nextTick(() => { throw err; });
});
