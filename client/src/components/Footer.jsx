import React from 'react';
import { useTenant } from '../context/TenantContext';
import '../styles/footer.css';

export function Footer() {
  const { tenant } = useTenant();
  if (!tenant) return null;

  const currentYear = new Date().getFullYear();
  const { institution, contactEmail, socialLinks, name } = tenant;

  return (
    <footer className="tenant-footer">
      <div className="footer-container">
        {institution && <p className="footer-institution">{institution}</p>}

        {contactEmail && (
          <p className="footer-contact">
            Contacto: <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </p>
        )}

        {socialLinks && (
          <div className="footer-socials">
            {socialLinks.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            )}
            {socialLinks.scholar && (
              <a href={socialLinks.scholar} target="_blank" rel="noopener noreferrer">
                Google Scholar
              </a>
            )}
          </div>
        )}

        <p className="footer-copyright">
          © {currentYear} {name}. Cátedra Académica.
        </p>
      </div>
    </footer>
  );
}