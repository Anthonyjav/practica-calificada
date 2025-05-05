const db = require('../config/db');

const TipoVehiculo = {
  getAll: (callback) => {
    db.query('SELECT * FROM tipos_vehiculo', callback);
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM tipos_vehiculo WHERE id = ?', [id], callback);
  },
  create: (data, callback) => {
    db.query('INSERT INTO tipos_vehiculo (nombre) VALUES (?)', [data.nombre], callback);
  },

  update: (id, data, callback) => {
    db.query('UPDATE tipos_vehiculo SET nombre = ? WHERE id = ?', [data.nombre, id], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM tipos_vehiculo WHERE id = ?', [id], callback);
  }
};

module.exports = TipoVehiculo;
