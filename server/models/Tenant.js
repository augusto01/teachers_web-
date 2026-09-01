// server/models/Tenant.js
const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, lowercase: true },
  name: { type: String, required: true },
  institution: String,
  title: String,
  bio: String,
  theme: Object,
  features: Object,
  files: Array
});

// El tercer argumento 'tenant' le indica a Mongoose la colección exacta a usar
module.exports = mongoose.model('Tenant', tenantSchema, 'tenant');