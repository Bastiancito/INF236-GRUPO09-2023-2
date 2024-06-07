const express = require('express');
const router = new express.Router();

const productosController = require('../controllers/ProductosController');
const insumosController = require('../controllers/insumosController');
const mensajesController = require('../controllers/mensajesController');
const productosbypymesController = require('../controllers/productosbypymesController');
const pymesController = require('../controllers/pymesController')


//==========================endpoints(Routes)============================//

// Rutas para el CRUD de productos
router.get('/createTableProductos', productosController.createTableProductos);
router.post('/productos', productosController.createProduct);
router.get('/productos', productosController.getProductos);
router.get('/productos/:id', productosController.getProductosById);
router.put('/productos/:id', productosController.updateProducto);
router.delete('/productos/:id', productosController.deleteProduct);

// Rutas para el CRUD de insumos
router.get('/createTableInsumos', insumosController.createTableInsumos);
router.post('/insumos', insumosController.createInsumo);
router.get('/insumos', insumosController.getInsumo);
router.get('/insumos/:id', insumosController.getInsumoById);
router.put('/insumos/:id', insumosController.updateInsumo);
router.delete('/insumos/:id', insumosController.deleteInsumo);

// Rutas para la CRUD de mensajes
router.get('/createTableMensajes', mensajesController.createTableMensajes)
router.get('/mensaje', mensajesController.getMensajes);
router.get('/mensaje/:id', mensajesController.getMensajeById);
router.post('/mensaje', mensajesController.createMensaje);
router.put('/mensaje/:id', mensajesController.updateMensaje);
router.delete('/mensaje/:id', mensajesController.deleteMensaje);
router.delete('/productos', productosController.deleteAllProducts);

//PYMES
router.get('/createTablePymes', pymesController.createTablePymes);
router.post('/createPyme', pymesController.createPyme);
router.get('/getPymes', pymesController.getPymes);

router.get('/productos/pyme/:idPyme', productosbypymesController.getProductosPorPyme);
router.get('/createTablePymesProductos', productosbypymesController.createTablePymesProductos);
router.post('/productos/pymes/asociarPymeProducto', productosbypymesController.asociarPymeProducto);


module.exports = router;