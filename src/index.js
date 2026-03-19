import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import Edit from './components/Edit';
import Create from './components/Create';
import Show from './components/Show';

const root = createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/edit/:id' element={<Edit />} />
      <Route path='/create' element={<Create />} />
      <Route path='/show/:id' element={<Show />} />
    </Routes>
  </Router>
);
