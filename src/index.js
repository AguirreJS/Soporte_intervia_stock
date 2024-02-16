


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


function actualizar() {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}


actualizar()


export default actualizar;
