import React, { useState } from 'react';
import { useTenant } from '../context/TenantContext';
import '../styles/navbar.css';

export function Navbar({ activeTab, setActiveTab }) {
  const { tenant } = useTenant();
  const [isOpen, setIsOpen] = useState(false);

  if (!tenant) return null;

  const { features = {}, name } = tenant;

  // Redirige al inicio (Quién Soy) al hacer clic en el nombre
  const handleBrandClick = () => {
    setActiveTab('bio');
    setIsOpen(false);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setIsOpen(false);
  };

  return (
    <nav className="tenant-navbar">
      <div className="navbar-container">
        {/* Marca / Nombre que lleva al Inicio (Quién Soy) */}
        <button type="button" className="navbar-brand-btn" onClick={handleBrandClick}>
          {name}
        </button>

        {/* Botón Hamburguesa Mobile */}
        <button
          type="button"
          className={`hamburger-btn ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Abrir menú"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Enlaces de Navegación */}
        <div className={`navbar-links ${isOpen ? 'show' : ''}`}>
          {features.showBio !== false && (
            <button
              type="button"
              onClick={() => handleTabClick('bio')}
              className={`nav-link ${activeTab === 'bio' ? 'active' : ''}`}
            >
              Quién Soy
            </button>
          )}

          {features.showMaterials !== false && (
            <button
              type="button"
              onClick={() => handleTabClick('material')}
              className={`nav-link ${activeTab === 'material' ? 'active' : ''}`}
            >
              Material
            </button>
          )}

          {features.showPapers && (
            <button
              type="button"
              onClick={() => handleTabClick('paper')}
              className={`nav-link ${activeTab === 'paper' ? 'active' : ''}`}
            >
              Investigaciones
            </button>
          )}

          {features.showCertificates && (
            <button
              type="button"
              onClick={() => handleTabClick('certificate')}
              className={`nav-link ${activeTab === 'certificate' ? 'active' : ''}`}
            >
              Certificados
            </button>
          )}

          {/* Opción de Contacto agregada e integrada con el estado activo */}
          <button
            type="button"
            onClick={() => handleTabClick('contact')}
            className={`nav-link ${activeTab === 'contact' ? 'active' : ''}`}
          >
            Contacto
          </button>
        </div>
      </div>
    </nav>
  );
}