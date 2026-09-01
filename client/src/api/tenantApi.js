// client/src/api/tenantApi.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const fetchTenantBySlug = async (slug) => {
  const response = await fetch(`${API_URL}/api/tenant/${slug}`);
  if (!response.ok) {
    throw new Error('Profesor no encontrado');
  }
  return await response.json();
};

export const uploadTenantFile = async (slug, formData) => {
  const response = await fetch(`${API_URL}/api/tenant/${slug}/upload`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    throw new Error('Error al subir el archivo');
  }
  return await response.json();
};