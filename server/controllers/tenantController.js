// server/controllers/tenantController.js
const Tenant = require('../models/Tenant');

// GET /api/tenant/:slug - Obtener perfil del docente por slug
const getTenantBySlug = async (req, res) => {
  try {
    const slugParam = req.params.slug.toLowerCase().trim();
    const tenant = await Tenant.findOne({ slug: slugParam });

    if (!tenant) {
      return res.status(404).json({ error: 'Profesor no encontrado' });
    }

    res.json(tenant);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los datos del docente' });
  }
};

// POST /api/tenant - Registrar un nuevo docente (Setup inicial)
const createTenant = async (req, res) => {
  try {
    const newTenant = new Tenant(req.body);
    await newTenant.save();
    res.status(201).json(newTenant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// POST /api/tenant/:slug/upload - Subir un archivo PDF al perfil del docente
const uploadTenantFile = async (req, res) => {
  try {
    const { title, description, fileType } = req.body;
    const slugParam = req.params.slug.toLowerCase().trim();

    const tenant = await Tenant.findOne({ slug: slugParam });
    if (!tenant) {
      return res.status(404).json({ error: 'Profesor no encontrado' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Debes adjuntar un archivo PDF' });
    }

    const newFile = {
      title,
      description,
      fileType,
      fileUrl: `/uploads/${req.file.filename}`
    };

    tenant.files.push(newFile);
    await tenant.save();

    res.status(201).json({ message: 'Archivo cargado con éxito', file: newFile });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTenantBySlug,
  createTenant,
  uploadTenantFile
};