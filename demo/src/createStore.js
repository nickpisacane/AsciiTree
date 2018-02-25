// @flow

import type {Store} from 'redux';
import {createStore, applyMiddleware, compose} from 'redux';

import type {State, Action, Dispatch} from './reducers/index';
import reducer from './reducers';

const middlewares = []

if (process.env.NODE_ENV === 'development') {
  const {logger} = require('redux-logger');
  middlewares.push(logger);
}

export default function _createStore(): Store<State, Action, Dispatch> {
  return createStore(reducer, compose(
    applyMiddleware(...middlewares)
  ));
}
