// client/src/context/TenantContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTenantBySlug } from '../api/tenantApi';

const TenantContext = createContext();

export const TenantProvider = ({ children }) => {
  const { slug: urlSlug } = useParams();
  const [tenant, setTenant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const activeSlug = urlSlug || import.meta.env.VITE_TENANT_SLUG || 'jose-luis-duarte';

  useEffect(() => {
    setLoading(true);

    fetchTenantBySlug(activeSlug)
      .then((data) => {
        setTenant(data);

        // Aplica el tema dinámico recuperado de MongoDB
        if (data && data.theme) {
          applyDynamicTheme(data.theme);
        }

        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [activeSlug]);

  // Función dedicada a inyectar variables en el elemento raíz (:root)
  const applyDynamicTheme = (theme) => {
    const root = document.documentElement;

    // Asignación con fallbacks por si falta alguna propiedad en Mongo
    root.style.setProperty('--primary-color', theme.primaryColor || '#581825');
    root.style.setProperty('--secondary-color', theme.secondaryColor || '#8c2436');
    root.style.setProperty('--bg-color', theme.bgColor || '#f8fafc');
    root.style.setProperty('--text-color', theme.textColor || '#0f172a');
    
    // Opcional: Soporte para fuentes personalizadas por docente
    if (theme.fontFamily) {
      root.style.setProperty('--font-family', theme.fontFamily);
    }
  };

  return (
    <TenantContext.Provider value={{ tenant, loading, error, API_URL }}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => useContext(TenantContext);