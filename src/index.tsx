import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './styles/index.scss';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ToastContainer
      theme="colored"
      pauseOnFocusLoss={false}
      pauseOnHover={false}
      autoClose={3000}
    />
    <App />
  </React.StrictMode>,
);
