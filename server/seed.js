require('dotenv').config();
const mongoose = require('mongoose');

// Verifica que la ruta a tu modelo sea correcta
const Tenant = require('./models/Tenant');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado exitosamente a MongoDB Atlas...');

    // Limpia registros anteriores de la colección
    await Tenant.deleteMany({});

    const joseDuarte = new Tenant({
      name: 'Dr. José Duarte',
      slug: 'jose-luis-duarte',
      title: 'Profesor Titular - Cátedra de Métodos Numéricos',
      institution: 'Universidad Nacional del Nordeste',
      email: 'joseduarte@catedra.edu.ar',
      bio: 'Docente e investigador universitario dedicado al modelado matemático y la optimización de sistemas. Con más de 15 años de trayectoria en la formación académica de ingenieros y licenciados.',
      theme: {
        primaryColor: '#581825',
        secondaryColor: '#8c2436',
        bgColor: '#f8fafc',
        textColor: '#0f172a'
      },
      features: {
        showBio: true,
        showMaterials: true,
        showPapers: true,
        showCertificates: true
      },
      files: [
        {
          title: 'Programa Analítico 2026 - Métodos Numéricos',
          description: 'Contenidos mínimos, bibliografía y régimen de cursada para comisiones A y B.',
          fileUrl: '/uploads/programa-2026.pdf',
          fileType: 'material'
        },
        {
          title: 'Guía de Trabajos Prácticos N° 1',
          description: 'Ejercicios de errores de redondeo, convergencia y métodos de bisección.',
          fileUrl: '/uploads/tp1-metodos.pdf',
          fileType: 'material'
        },
        {
          title: 'Análisis de Convergencia en Algoritmos Estocásticos',
          description: 'Publicación académica en la revista de investigación científica de Exactas.',
          fileUrl: '/uploads/paper-convergencia.pdf',
          fileType: 'paper'
        }
      ]
    });

    await joseDuarte.save();
    console.log('¡Profesor José Duarte cargado exitosamente en MongoDB Atlas!');
    process.exit(0);
  } catch (error) {
    console.error('Error al poblar la base de datos:', error);
    process.exit(1);
  }
};

seedData();