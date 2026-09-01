import React from 'react';

export function PapersSection({ files, API_URL }) {
  const papers = files.filter((file) => file.fileType === 'paper');

  return (
    <div className="section-container animate-slide-up">
      <div className="section-header">
        <h2 className="section-title">Investigaciones y Publicaciones</h2>
        <p className="section-description">
          Explorá los trabajos de investigación, artículos académicos y publicaciones realizadas en el ámbito universitario.
        </p>
      </div>

      {papers.length === 0 ? (
        <div className="empty-card animate-fade-in">
          <p>No hay investigaciones o publicaciones registradas en esta sección.</p>
        </div>
      ) : (
        <div className="files-grid">
          {papers.map((file, idx) => (
            <article
              key={idx}
              className="file-card animate-slide-up"
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              <div className="file-details">
                <span className="file-tag">Investigación</span>
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