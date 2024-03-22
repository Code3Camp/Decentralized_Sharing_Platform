import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/auth/register';
import Login from './components/auth/login';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes