const express = require('express');
const path = require('path');
const Vehiculo = require('../models/Vehiculo.js');
const TipoVehiculo = require('../models/tipoVehiculo.js');

module.exports = (upload) => {
  const router = express.Router();

  // Listar todos los vehículos
  router.get('/', (req, res) => {
    Vehiculo.getAll((err, results) => {
      if (err) {
        return res.status(500).send('Error al obtener vehículos');
      }
      res.json(results);
    });
  });

  // Crear un vehículo
  router.post('/', upload.single('imagen'), (req, res) => {
    const { modelo, marca, anio, tipo_id } = req.body;
    const imagen = req.file ? req.file.filename : null;
    const newVehiculo = { modelo, marca, anio, imagen, tipo_id };

    Vehiculo.create(newVehiculo, (err, results) => {
      if (err) {
        return res.status(500).send('Error al crear vehículo');
      }
      res.status(201).json({ id: results.insertId, ...newVehiculo });
    });
  });

  // Editar un vehículo
  router.put('/:id', upload.single('imagen'), (req, res) => {
    const { modelo, marca, anio, tipo_id } = req.body;
    const imagen = req.file ? req.file.filename : null;
    const updatedVehiculo = { modelo, marca, anio, imagen, tipo_id };

    Vehiculo.update(req.params.id, updatedVehiculo, (err, results) => {
      if (err) {
        return res.status(500).send('Error al actualizar vehículo');
      }
      res.status(200).json(updatedVehiculo);
    });
  });

  // Eliminar un vehículo
  router.delete('/:id', (req, res) => {
    Vehiculo.delete(req.params.id, (err, results) => {
      if (err) {
        return res.status(500).send('Error al eliminar vehículo');
      }
      res.status(200).send('Vehículo eliminado');
    });
  });

  return router;
};
