import React from 'react';

const CERT_PREVIEW_1 = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500' viewBox='0 0 800 500'><rect width='800' height='500' fill='%23581825'/><rect x='20' y='20' width='760' height='460' fill='none' stroke='%23ffffff' stroke-width='4'/><rect x='35' y='35' width='730' height='430' fill='none' stroke='%23d1d5db' stroke-width='1'/><text x='400' y='220' fill='%23ffffff' font-family='sans-serif' font-size='30' font-weight='bold' text-anchor='middle'>DOCTORADO EN CIENCIAS</text><text x='400' y='280' fill='%23f1f5f9' font-family='sans-serif' font-size='18' text-anchor='middle'>Acreditación y Posgrado</text></svg>";

const CERT_PREVIEW_2 = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500' viewBox='0 0 800 500'><rect width='800' height='500' fill='%231e293b'/><rect x='20' y='20' width='760' height='460' fill='none' stroke='%2338bdf8' stroke-width='4'/><text x='400' y='220' fill='%23ffffff' font-family='sans-serif' font-size='28' font-weight='bold' text-anchor='middle'>MÉTODOS NUMÉRICOS</text><text x='400' y='280' fill='%2394a3b8' font-family='sans-serif' font-size='18' text-anchor='middle'>Especialización e Investigación</text></svg>";

const CERT_PREVIEW_3 = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500' viewBox='0 0 800 500'><rect width='800' height='500' fill='%230f766e'/><rect x='20' y='20' width='760' height='460' fill='none' stroke='%232dd4bf' stroke-width='4'/><text x='400' y='220' fill='%23ffffff' font-family='sans-serif' font-size='28' font-weight='bold' text-anchor='middle'>DIPLOMATURA DOCENTE</text><text x='400' y='280' fill='%23ccfbf1' font-family='sans-serif' font-size='18' text-anchor='middle'>Innovación Pedagógica</text></svg>";

// Muestra amplia de certificados de prueba
const MOCK_CERTIFICATES = [
  {
    title: 'Doctorado en Ciencias Matemáticas',
    description: 'Acreditación del título de Posgrado con mención honorífica otorgado por la Facultad de Ciencias Exactas.',
    previewUrl: CERT_PREVIEW_1,
    fileUrl: '#',
    issuer: 'UNNE - Argentina',
    year: '2023'
  },
  {
    title: 'Certificación en Métodos Numéricos Avanzados',
    description: 'Capacitación intensiva en modelado estocástico y optimización matemática aplicada a sistemas.',
    previewUrl: CERT_PREVIEW_2,
    fileUrl: '#',
    issuer: 'Consejo Interuniversitario',
    year: '2024'
  },
  {
    title: 'Diplomatura en Innovación Pedagógica',
    description: 'Especialización universitaria en metodologías de enseñanza activa y entornos virtuales.',
    previewUrl: CERT_PREVIEW_3,
    fileUrl: '#',
    issuer: 'Rectorado UNNE',
    year: '2025'
  }
];

export function CertificatesSection({ files = [], API_URL }) {
  const realCertificates = files.filter((file) => file.fileType === 'certificate');

  // Concatena lo que viene de MongoDB con el array de pruebas para garantizar una grilla completa
  const certificatesToDisplay = [...realCertificates, ...MOCK_CERTIFICATES];

  return (
    <div className="section-container animate-slide-up">
      <div className="section-header">
        <h2 className="section-title">Certificados y Acreditaciones</h2>
        <p className="section-description">
          Acreditaciones académicas, diplomas de posgrado y reconocimientos institucionales destacados.
        </p>
      </div>

      <div className="certificates-grid">
        {certificatesToDisplay.map((cert, idx) => {
          const previewImage = cert.previewUrl || cert.imageUrl || CERT_PREVIEW_1;
          const fileLink = cert.fileUrl?.startsWith('http') 
            ? cert.fileUrl 
            : `${API_URL || ''}${cert.fileUrl || ''}`;

          return (
            <article key={idx} className="certificate-card animate-slide-up">
              <div className="certificate-preview-wrapper">
                <img
                  src={previewImage}
                  alt={cert.title}
                  className="certificate-preview-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = CERT_PREVIEW_1;
                  }}
                />
                <span className="certificate-badge">{cert.year || 'Oficial'}</span>
              </div>

              <div className="certificate-content">
                <span className="file-tag">{cert.issuer || 'Certificado'}</span>
                <h3 className="certificate-title">{cert.title}</h3>
                <p className="certificate-description">{cert.description}</p>

                <div className="certificate-actions">
                  <a
                    href={fileLink !== '' ? fileLink : '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-download"
                  >
                    Ver Documento Completo
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}