import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Favicon from 'react-favicon'

import favicon from './favicon.ico'

ReactDOM.render(
  <React.StrictMode>
    <Favicon url={favicon} />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

