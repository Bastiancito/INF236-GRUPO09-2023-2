const database = require('../db');

const createTableProductos = (req, res) => {
  const query =  'CREATE TABLE IF NOT EXISTS productos(id_prod int AUTO_INCREMENT, nombre_producto VARCHAR(50), stock int, precio int, descripcion VARCHAR(255), etiqueta VARCHAR(50), PRIMARY KEY(id_prod))';

  database.query(query, (err) => {
      if (err) throw err;
      res.send('Tabla creada')
  });
};

const createProduct = (req, res) => {
  console.log(req.body)
  const { nombre_producto, stock, precio, descripcion, etiqueta } = req.body;
  console.log('Datos recibidos:', nombre_producto, stock, precio, descripcion, etiqueta);
  const query = 'INSERT INTO productos (nombre_producto, stock, precio, descripcion, etiqueta) VALUES (?, ?, ?,?,?)';

  database.query(query, [nombre_producto, stock, precio, descripcion, etiqueta], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al crear el producto');
    } else {
      res.send('Producto creado');
    }
  });
};

const getProductos = (req, res) => {
  const query = 'SELECT * FROM productos';

  database.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al obtener productos');
    } else {
      console.log(results); 
      res.json(results);
    }
  });
};

const getProductosById = (req, res) => {
  const productId = req.params.id; 
  const query = 'SELECT * FROM productos WHERE id_prod = ?'; 

  database.query(query, [productId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al obtener el producto por ID');
    } else {
      if (result.length === 0) {
        
        res.status(404).send('Producto no encontrado');
      } else {
        
        res.json(result[0]);
      }
    }
  });
};

const updateProducto = (req, res) => {
  const productId = req.params.id; 
  const { nombre_producto, stock, precio, descripcion, etiqueta } = req.body; 
  const query = 'UPDATE productos SET nombre_producto = ?, stock = ?, precio = ?, descripcion = ?, etiqueta = ? WHERE id_prod = ?';

  database.query(query, [nombre_producto, stock, precio, descripcion, etiqueta, productId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al actualizar el producto');
    } else {
      if (result.affectedRows === 0) {
      
        res.status(404).send('Producto no encontrado');
      } else {
      
        res.send('Producto actualizado');
      }
    }
  });
};


const deleteProduct = (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM productos WHERE id_prod = ?';

  database.query(query, [id], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al eliminar el producto');
    } else {
      res.send('Producto eliminado');
    }
  });
};

module.exports = {
  createTableProductos,
  createProduct,
  getProductos,
  getProductosById,
  updateProducto,
  deleteProduct,
};
