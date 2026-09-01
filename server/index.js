require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const tenantRoutes = require('./routes/tenantRoutes');

const app = express();

// Conectar a la base de datos MongoDB Atlas
connectDB();

// Configuración de CORS para permitir peticiones desde Netlify y desarrollo local
const allowedOrigins = [
  process.env.CLIENT_URL, // Ej: https://catedra-joseduarte.netlify.app
  'http://localhost:5173',
  'http://localhost:3000'
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Permite peticiones sin origin (como Postman o Server-to-Server) o dentro de la lista
      if (!origin || allowedOrigins.includes(origin) || allowedOrigins.length === 0) {
        callback(null, true);
      } else {
        callback(null, true); // Podés cambiar a new Error('CORS no permitido') para restringir estrictamente
      }
    },
    credentials: true,
  })
);

// Middleware para parsear JSON en las peticiones
app.use(express.json());

// Servir la carpeta pública de archivos subidos (PDFs, certificados, avatares)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Endpoint de verificación de estado (Health Check para Render/Railway)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Servidor modular de cátedras activo' });
});

// Montar Rutas de la API
app.use('/api/tenant', tenantRoutes);

// Manejo de rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada en el servidor' });
});

// Puerto dinámico asignado por el entorno de producción o 5000 por defecto
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor modular corriendo exitosamente en el puerto ${PORT}`);
});