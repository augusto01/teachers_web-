import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TenantProvider } from './context/TenantContext';
import { TeacherProfile } from './components/TeacherProfile'; 
import './styles/tenant.css';

function TeacherRoute() {
  return (
    <TenantProvider>
      <TeacherProfile />
    </TenantProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TeacherRoute />} />
        <Route path="/:slug" element={<TeacherRoute />} />
      </Routes>
    </BrowserRouter>
  );
}