import React, { useState } from 'react';

export function ContactSection({ tenantEmail }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const [captcha] = useState({ num1: 5, num2: 3, expected: 8 });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(null);

    if (parseInt(captchaAnswer, 10) !== captcha.expected) {
      setStatus({ type: 'error', text: 'Respuesta de CAPTCHA incorrecta. Intente de nuevo.' });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setStatus({ type: 'success', text: '¡Mensaje enviado con éxito al docente!' });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setCaptchaAnswer('');
    }, 1500);
  };

  return (
    <div className="section-container animate-slide-up">
      <div className="section-header">
        <h2 className="section-title">Contacto</h2>
        <p className="section-description">
          ¿Tenés dudas o consultas sobre los ejercicios, las clases o las comisiones? Dejame tu mensaje y te respondo a la brevedad.
        </p>
      </div>

      <div className="contact-card">
        {tenantEmail && <p className="contact-subtitle">Correo de contacto directo: <strong>{tenantEmail}</strong></p>}

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre y Apellido</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: Laura Pérez"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="ejemplo@correo.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Asunto</label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              placeholder="Consulta sobre la materia / guía de trabajos prácticos"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Mensaje</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Escribí tu consulta detallada aquí..."
            ></textarea>
          </div>

          <div className="captcha-box">
            <label htmlFor="captcha">
              Seguridad: ¿Cuánto es <strong>{captcha.num1} + {captcha.num2}</strong>?
            </label>
            <input
              type="number"
              id="captcha"
              required
              value={captchaAnswer}
              onChange={(e) => setCaptchaAnswer(e.target.value)}
              placeholder="Respuesta"
            />
          </div>

          {status && (
            <div className={`form-status-msg ${status.type}`}>
              {status.text}
            </div>
          )}

          <button type="submit" className="btn-submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="btn-spinner-wrapper">
                <span className="btn-spinner"></span> Enviando...
              </span>
            ) : (
              'Enviar Mensaje'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}