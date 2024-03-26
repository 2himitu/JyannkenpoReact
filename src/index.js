import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Style/App';
import Tensorflow from './Tensorflow';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Tensorflow />
  </React.StrictMode>
);