import React, { useState } from 'react';
import { useTenant } from '../context/TenantContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import '../styles/tenant.css';

export function TeacherProfile() {
  const { tenant, loading, error, API_URL } = useTenant();
  const [activeTab, setActiveTab] = useState('material');

  if (loading) return <div className="tenant-spinner"></div>;
  if (error || !tenant) return <p className="state-error">Profesor no encontrado.</p>;

  const { theme, features, files = [] } = tenant;

  const customStyles = {
    '--primary-color': theme?.primaryColor || '#581825',
    '--secondary-color': theme?.secondaryColor || '#8c2436',
    '--bg-color': theme?.bgColor || '#f8fafc',
    '--text-color': theme?.textColor || '#0f172a'
  };

  const filteredFiles = files.filter((file) => {
    if (activeTab === 'material') return file.fileType === 'material';
    if (activeTab === 'paper') return file.fileType === 'paper' || file.fileType === 'certificate';
    return true;
  });

  // Determina si la foto viene de public local o del servidor backend
  const getAvatarSrc = () => {
    if (!tenant.avatarUrl) return "/perfil.jpg"; // Foto local de /public
    if (tenant.avatarUrl.startsWith('http') || tenant.avatarUrl.startsWith('/')) {
      return tenant.avatarUrl.startsWith('/') && !tenant.avatarUrl.startsWith('/uploads') 
        ? tenant.avatarUrl 
        : `${API_URL}${tenant.avatarUrl}`;
    }
    return "/perfil.jpg";
  };

  return (
    <div className="tenant-page animate-fade-in" style={customStyles}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <header className="hero-section">
        <div className="hero-content">
          {tenant.institution && <span className="hero-badge">{tenant.institution}</span>}
          
          <h1 className="hero-name">{tenant.name}</h1>

         <div className="hero-avatar-wrapper">
        <img
          src={tenant.avatarUrl ? `${API_URL}${tenant.avatarUrl}` : `/${tenant.slug}.jpg`}
          alt={tenant.name}
          className="hero-avatar"
          onError={(e) => {
            // Fallback a PNG local o a las iniciales del profesor
            if (e.target.src.endsWith('.jpg')) {
              e.target.src = `/${tenant.slug}.png`;
            } else {
              e.target.onerror = null;
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(tenant.name)}&background=${(tenant.theme?.primaryColor || '581825').replace('#', '')}&color=fff&size=256&bold=true`;
            }
          }}
        />
      </div>

          <p className="hero-title">{tenant.title}</p>
        </div>
      </header>

      <main className="main-container">
        {activeTab === 'bio' && features?.showBio !== false && (
          <section className="tab-content animate-slide-up">
            <div className="bio-card">
              <h2>Sobre mi trayectoria</h2>
              <p>{tenant.bio}</p>
            </div>
          </section>
        )}

        {(activeTab === 'material' || activeTab === 'paper') && (
          <section className="tab-content animate-slide-up">
            <div className="files-grid">
              {filteredFiles.length > 0 ? (
                filteredFiles.map((file, idx) => (
                  <article key={idx} className="file-card">
                    <div className="file-details">
                      <span className="file-tag">{file.fileType}</span>
                      <h3 className="file-title">{file.title}</h3>
                      <p className="file-description">{file.description}</p>
                    </div>
                    <a
                      href={`${API_URL}${file.fileUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-download"
                    >
                      Descargar PDF
                    </a>
                  </article>
                ))
              ) : (
                <div className="empty-card">
                  <p>No hay documentos disponibles en esta sección.</p>
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}