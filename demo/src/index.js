import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import Header from './components/Header';

const App = () => (
  <div>
    <Header />
  </div>
)

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
