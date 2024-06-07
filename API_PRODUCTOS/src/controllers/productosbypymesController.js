const database = require('../db');

const createTablePymesProductos = (req, res) => {
    console.log("Controlador createTablePymesProductos ejecutándose");

    const query = `
      CREATE TABLE IF NOT EXISTS pymes_productos(
        id_pyme int,
        id_prod int,
        FOREIGN KEY (id_pyme) REFERENCES pymes(id_pyme),
        FOREIGN KEY (id_prod) REFERENCES productos(id_prod)
      )`;
  
    database.query(query, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error al crear la tabla de asociación');
      } else {
        res.send('Tabla de asociación creada correctamente');
      }
    });
  };

  const asociarPymeProducto = (req, res) => {
    const { id_pyme, id_prod } = req.body;
  
    const query = 'INSERT INTO pymes_productos (id_pyme, id_prod) VALUES (?, ?)';
    database.query(query, [id_pyme, id_prod], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error al asociar pyme con producto');
      } else {
        res.send('Asociación realizada con éxito');
      }
    });
  };


  const getProductosPorPyme = (req, res) => {
    const id_pyme = req.params.idPyme; 
    console.log("Buscando productos para la pyme ID:", id_pyme); 

    const query = `
      SELECT p.* FROM productos p
      INNER JOIN pymes_productos pp ON p.id_prod = pp.id_prod
      WHERE pp.id_pyme = ?`;

    database.query(query, [id_pyme], (err, results) => {
      if (err) {
        console.error("Error en la consulta SQL:", err);
        res.status(500).send('Error al obtener productos para la pyme');
      } else if (results.length === 0) {
        console.log("No se encontraron productos para la pyme ID:", id_pyme);
        res.status(404).send('No se encontraron productos para esta pyme');
      } else {
        res.json(results);
      }
    });
  };


  module.exports = {
    getProductosPorPyme,
    createTablePymesProductos,
    asociarPymeProducto
  }