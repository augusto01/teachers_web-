import React, { useState } from 'react';
import { useTenant } from '../context/TenantContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MaterialsSection } from '../components/MaterialsSection';
import { PapersSection } from '../components/PapersSection';
import { CertificatesSection } from '../components/CertificatesSection';
import { ContactSection } from '../components/ContactSection';

import '../styles/tenant.css';
import '../styles/navbar.css';
import '../styles/footer.css';

export function TeacherProfile() {
  const { tenant, loading, error, API_URL } = useTenant();
  const [activeTab, setActiveTab] = useState('bio');

  if (loading) {
    return (
      <div className="tenant-loader-screen">
        <div className="tenant-spinner"></div>
        <p>Cargando cátedra...</p>
      </div>
    );
  }

  if (error || !tenant) {
    return (
      <div className="tenant-error-screen">
        <p className="state-error">Profesor no encontrado.</p>
      </div>
    );
  }

  const { theme, features, files = [] } = tenant;

  // Garantiza que siempre exista un correo visible
  const displayEmail = tenant.email || tenant.contactEmail || `${tenant.slug}@catedra.edu.ar`;

  const customStyles = {
    '--primary-color': theme?.primaryColor || '#581825',
    '--secondary-color': theme?.secondaryColor || '#8c2436',
    '--bg-color': theme?.bgColor || '#f8fafc',
    '--text-color': theme?.textColor || '#0f172a'
  };

  const getInitialsAvatar = () => {
    const color = (theme?.primaryColor || '581825').replace('#', '');
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(tenant.name)}&background=${color}&color=fff&size=256&bold=true`;
  };

  const defaultBio = tenant.bio || 
    `Docente e investigador universitario apasionado por la innovación académica y la transferencia de conocimiento. Con más de una década de experiencia al frente de cátedras universitarias, mi objetivo principal es formar profesionales con pensamiento crítico, brindando herramientas teórico-prácticas actualizadas y acompañando el desarrollo académico de cada estudiante a lo largo de su carrera.`;

  return (
    <div className="tenant-page animate-fade-in" style={customStyles}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'bio' && (
        <header className="hero-section">
          <div className="hero-content">
            {tenant.institution && (
              <span className="hero-badge animate-scale-up">{tenant.institution}</span>
            )}
            
            <h1 className="hero-name animate-slide-down">{tenant.name}</h1>

            <div className="hero-avatar-wrapper animate-scale-up">
              <img
                src={`/${tenant.slug}.jpg`}
                alt={tenant.name}
                className="hero-avatar"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = getInitialsAvatar();
                }}
              />
            </div>

            <p className="hero-title animate-fade-in">{tenant.title}</p>

            {/* Enlace de correo garantizado siempre visible */}
            <a href={`mailto:${displayEmail}`} className="hero-email-link animate-fade-in">
              ✉️ {displayEmail}
            </a>
          </div>
        </header>
      )}

      <main className="main-container">
        {activeTab === 'bio' && features?.showBio !== false && (
          <section className="tab-content animate-slide-up">
            <div className="bio-card">
              <h2>Sobre mi trayectoria</h2>
              <p>{defaultBio}</p>
            </div>
          </section>
        )}

        {activeTab === 'material' && (
          <section className="tab-content animate-slide-up">
            <MaterialsSection files={files} API_URL={API_URL} />
          </section>
        )}

        {activeTab === 'paper' && (
          <section className="tab-content animate-slide-up">
            <PapersSection files={files} API_URL={API_URL} />
          </section>
        )}

        {activeTab === 'certificate' && (
          <section className="tab-content animate-slide-up">
            <CertificatesSection files={files} API_URL={API_URL} />
          </section>
        )}

        {activeTab === 'contact' && (
          <section className="tab-content animate-slide-up">
            <ContactSection tenantEmail={displayEmail} />
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}