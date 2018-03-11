// @flow

import type {Options as TreeOptions} from '@nindaff/ascii-tree';
import TreeWorker from './Tree.worker';
import type {EditorFormat} from '../reducers/editor';

type Options = {
  input: string;
  format: EditorFormat;
  options: $Shape<TreeOptions>;
};

type UpdateMessage = {
  name: string;
  data: string;
};

export type Listener = (rendered: string) => void;

class AsyncTree {
  worker: Worker;
  listeners: Array<Listener>;

  constructor() {
    this.worker = new TreeWorker();
    console.log('this.worker: ', this.worker);
    this.listeners = [];
    this.init();
  }

  init() {
    this.worker.onmessage = (event: any) => {
      const data = (event.data: UpdateMessage);
      console.log('data: ', data);
      if (data.name === 'render') {
        this.listeners.forEach(listener => listener(data.data));
      }
    };
  }

  destroy() {
    this.listeners = [];
    this.worker.terminate();
  }

  update(options: Options) {
    this.worker.postMessage({
      name: 'update',
      data: options,
    });
  }

  addListener(listener: Listener) {
    this.listeners.push(listener);
  }

  removeListener(listener: Listener) {
    const index = this.listeners.indexOf(listener);
    if (~index) {
      this.listeners.splice(index, 1);
    }
  }
}

export default new AsyncTree();
