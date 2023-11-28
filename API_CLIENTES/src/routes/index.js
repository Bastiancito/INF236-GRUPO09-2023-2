const express = require('express');
const router = new express.Router();
const clientesController = require('../controllers/clientesController')

//==========================endpoints(Routes)============================//

// Rutas para el CRUD de clientes
router.get('/createTableClientes', clientesController.createTableClientes);
router.post('/clientes', clientesController.createCliente);
router.get('/clientes', clientesController.getClientes);
router.get('/clientes/:id', clientesController.getClienteById);
router.put('/clientes/:id', clientesController.updateCliente);
router.delete('/clientes/:id', clientesController.deleteCliente);


module.exports = router;