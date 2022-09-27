import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<App />} />
        <Route path='/dashboard'  element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

