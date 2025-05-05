const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();

// Crear carpeta 'public/uploads' si no existe
const uploadsDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = Date.now() + ext;
    cb(null, name);
  }
});

// Filtro para aceptar solo imágenes
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten imágenes JPEG y PNG'), false);
  }
};

// Límite de tamaño: 2MB
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Para acceder a imágenes y HTML

// Ruta raíz redirige a listarVehiculos.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/listarVehiculos.html');
});

// Rutas API
const vehiculosRoutes = require('./routes/vehiculos')(upload); // Pasamos `upload`
const tiposVehiculoRoutes = require('./routes/tiposVehiculo');

app.use('/api/vehiculos', vehiculosRoutes);
app.use('/api/tipos', tiposVehiculoRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});
