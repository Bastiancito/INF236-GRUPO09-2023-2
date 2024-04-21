const express = require('express');
const router = new express.Router();

const pymesController = require('../controllers/pymesController')

//==========================endpoints(Routes)============================//

// Rutas para el CRUD de productos
router.get('/createTablePymes', pymesController.createTablePymes);
router.post('/createPyme', pymesController.createPyme);
router.get('/getPymes', pymesController.getPymes);

module.exports = router;
