import React from 'react';

export function MaterialsSection({ files, API_URL }) {
  const materials = files.filter((file) => file.fileType === 'material');

  return (
    <div className="section-container animate-slide-up">
      <div className="section-header">
        <h2 className="section-title">Material de Cátedra</h2>
        <p className="section-description">
          Accedé a las guías prácticas, apuntes teóricos y programas de la materia listos para descargar en formato PDF.
        </p>
      </div>

      {materials.length === 0 ? (
        <div className="empty-card animate-fade-in">
          <p>No hay materiales didácticos disponibles por el momento.</p>
        </div>
      ) : (
        <div className="files-grid">
          {materials.map((file, idx) => (
            <article
              key={idx}
              className="file-card animate-slide-up"
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              <div className="file-details">
                <span className="file-tag">Material</span>
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
          ))}
        </div>
      )}
    </div>
  );
}