const db = require('../config/db');

const Vehiculo = {
  // Obtener todos los vehículos con el nombre del tipo de vehículo
  getAll: (callback) => {
    const query = `
      SELECT v.id, v.modelo, v.marca, v.anio, v.imagen, v.tipo_id, t.nombre AS tipo_nombre
      FROM vehiculos v
      LEFT JOIN tipos_vehiculo t ON v.tipo_id = t.id;
    `;
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error al obtener vehículos:", err);
        return callback(err, null);  // Devolvemos el error
      }
      console.log("Resultados obtenidos:", results);  // Depuración: mostrar los resultados
      callback(null, results);  // Devolvemos los resultados
    });
  },

  // Obtener un vehículo por su ID
  getById: (id, callback) => {
    const query = `
      SELECT v.id, v.modelo, v.marca, v.anio, v.imagen, v.tipo_id, t.nombre AS tipo_nombre
      FROM vehiculos v
      LEFT JOIN tipos_vehiculo t ON v.tipo_id = t.id
      WHERE v.id = ?;
    `;
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error("Error al obtener vehículo:", err);
        return callback(err, null);  // Devolvemos el error
      }
      console.log("Vehículo encontrado:", results);  // Depuración
      callback(null, results);  // Devolvemos los resultados
    });
  },

  // Crear un nuevo vehículo
  create: (data, callback) => {
    const query = 'INSERT INTO vehiculos (modelo, marca, anio, imagen, tipo_id) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [data.modelo, data.marca, data.anio, data.imagen, data.tipo_id], callback);
  },

  // Actualizar un vehículo existente
  update: (id, data, callback) => {
    const query = 'UPDATE vehiculos SET modelo = ?, marca = ?, anio = ?, imagen = ?, tipo_id = ? WHERE id = ?';
    db.query(query, [data.modelo, data.marca, data.anio, data.imagen, data.tipo_id, id], callback);
  },

  // Eliminar un vehículo
  delete: (id, callback) => {
    const query = 'DELETE FROM vehiculos WHERE id = ?';
    db.query(query, [id], callback);
  }
};

module.exports = Vehiculo;
