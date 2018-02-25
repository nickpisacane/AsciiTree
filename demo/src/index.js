import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import createStore from './createStore';
import Header from './components/Header';

const store = createStore();

const App = () => (
  <Provider store={store}>
    <Header />
  </Provider>
);

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
