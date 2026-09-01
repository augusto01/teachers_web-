import React from 'react';
import '../styles/MaterialSection.css';

const DEFAULT_IMAGES = {
  algebra: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600',
  estadistica: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600',
  calculo: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=600',
  default: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600'
};

export function MaterialsSection({ files, API_URL, introMaterial }) {
  const materials = files.filter((file) => file.fileType === 'material');

  const getMaterialImage = (file) => {
    if (file.imageUrl) return file.imageUrl;
    
    const titleLower = (file.title || '').toLowerCase();
    if (titleLower.includes('algebra') || titleLower.includes('álgebra')) return DEFAULT_IMAGES.algebra;
    if (titleLower.includes('estadistica') || titleLower.includes('estadística')) return DEFAULT_IMAGES.estadistica;
    if (titleLower.includes('calculo') || titleLower.includes('cálculo')) return DEFAULT_IMAGES.calculo;
    
    return DEFAULT_IMAGES.default;
  };

  return (
    <div className="section-container animate-slide-up materials-section-wrapper">
      <div className="section-header divertido">
        <h2 className="section-title">
          ¡Hola! 
        </h2>
        
        {introMaterial ? (
          <p className="section-description">{introMaterial}</p>
        ) : (
          <p className="section-description">
            Accedé a las guías prácticas, teoría y recursos de cada asignatura para{' '}
            <strong>estudiar sin vueltas</strong> y preparar tus exámenes{' '}
            <span className="mate-tag">con mates de por medio 🧉</span>
          </p>
        )}
      </div>

      {materials.length === 0 ? (
        <div className="empty-card animate-fade-in">
          <p>No hay materiales didácticos disponibles por el momento.</p>
        </div>
      ) : (
        <div className="materials-grid">
          {materials.map((file, idx) => {
            const bgImage = getMaterialImage(file);
            const subjectName = file.title || 'Álgebra / Estadística / Cálculo';
            const year = file.year || '2026';
            const degree = file.degree || 'Lic. en Sistemas';
            const university = file.university || 'Universidad Nacional del Nordeste';

            return (
              <article
                key={idx}
                className="material-square-card animate-slide-up"
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                <div className="card-image-wrapper">
                  <img src={bgImage} alt={subjectName} className="card-image" />
                  <span className="file-tag">Materia</span>
                </div>

                <div className="card-content">
                  <div className="card-header-info">
                    <div className="card-meta-badges">
                      <span className="meta-badge">{degree}</span>
                      <span className="meta-badge">{year}</span>
                    </div>
                    
                    <p className="institution-name">{university}</p>
                    <h3 className="subject-main-title">{subjectName}</h3>
                  </div>

                  {file.description && (
                    <p className="file-description">{file.description}</p>
                  )}

                  <a
                    href={`${API_URL}${file.fileUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-download"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="btn-icon"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    Inspeccionar
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}