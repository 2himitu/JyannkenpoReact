import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Friendlist from './Components/Friend/Friendlist';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Friendlist />
  </React.StrictMode>
);