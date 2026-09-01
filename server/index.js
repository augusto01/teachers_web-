require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const tenantRoutes = require('./routes/tenantRoutes');

const app = express();

// Conectar a MongoDB
connectDB();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Servir la carpeta publica de archivos subidos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Montar Rutas
app.use('/api/tenant', tenantRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor modular corriendo en puerto ${PORT}`));