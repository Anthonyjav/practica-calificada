const express = require('express');
const router = express.Router();
const TipoVehiculo = require('../models/tipoVehiculo.js');

router.get('/', (req, res) => {
  TipoVehiculo.getAll((err, results) => {
    if (err) {
      return res.status(500).send('Error al obtener tipos de vehículos');
    }
    res.json(results);
  });
});

// Obtener uno por ID
router.get('/:id', (req, res) => {
    TipoVehiculo.getById(req.params.id, (err, results) => {
      if (err) return res.status(500).send('Error al obtener el tipo de vehículo');
      if (results.length === 0) return res.status(404).send('Tipo de vehículo no encontrado');
      res.json(results[0]);
    });
  });
  
  // Crear
  router.post('/', (req, res) => {
    const { nombre } = req.body;
    if (!nombre) return res.status(400).send('El campo "nombre" es obligatorio');
  
    TipoVehiculo.create({ nombre }, (err, result) => {
      if (err) return res.status(500).send('Error al crear el tipo de vehículo');
      res.status(201).send('Tipo de vehículo creado');
    });
  });
  
  // Actualizar
  router.put('/:id', (req, res) => {
    const { nombre } = req.body;
    if (!nombre) return res.status(400).send('El campo "nombre" es obligatorio');
  
    TipoVehiculo.update(req.params.id, { nombre }, (err, result) => {
      if (err) return res.status(500).send('Error al actualizar el tipo de vehículo');
      res.send('Tipo de vehículo actualizado');
    });
  });
  
  // Eliminar
  router.delete('/:id', (req, res) => {
    TipoVehiculo.delete(req.params.id, (err, result) => {
      if (err) return res.status(500).send('Error al eliminar el tipo de vehículo');
      res.send('Tipo de vehículo eliminado');
    });
  });

module.exports = router;
