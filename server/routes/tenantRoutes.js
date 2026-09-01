const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
  getTenantBySlug,
  createTenant,
  uploadTenantFile
} = require('../controllers/tenantController');

// Obtener perfil público por slug
router.get('/:slug', getTenantBySlug);

// Crear nuevo perfil de profesor
router.post('/', createTenant);

// Subir un PDF al perfil de un profesor
router.post('/:slug/upload', upload.single('file'), uploadTenantFile);

module.exports = router;