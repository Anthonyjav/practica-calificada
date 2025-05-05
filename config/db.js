const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',     // O la URL de tu servidor de base de datos
  user: 'root',          // Usuario MySQL
  password: '',          // Contraseña
  database: 'vehiculos'  // Nombre de tu base de datos
});

connection.connect(err => {
  if (err) {
    console.error('Error de conexión:', err);
  } else {
    console.log('Conexión a la base de datos establecida');
  }
});

module.exports = connection;
