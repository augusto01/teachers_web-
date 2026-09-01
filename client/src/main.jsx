import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/tenant.css'; // 👈 Carga el CSS unificado

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);