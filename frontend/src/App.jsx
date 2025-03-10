import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Register } from './pages/Register';
import { Login } from './pages/Login';

import { Home } from './pages/Home';
import { UserProvider } from './context/UserContext.jsx'; // Update the import
import Dashboard from './pages/Dashboard.jsx';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;