const database = require('../db');


const createTableInsumos = (req, res) => {
  const query =  'CREATE TABLE IF NOT EXISTS insumos(id_insumo int AUTO_INCREMENT, nombre_insumo VARCHAR(50), stock int, precio int, PRIMARY KEY(id_insumo))';

  database.query(query, (err) => {
      if (err) throw err;
      res.send('Tabla creada')
  });
};

const createInsumo = (req, res) => {
  console.log(req.body)
  const { nombre_insumo, stock, precio } = req.body;
  console.log('Datos recibidos:', nombre_insumo, stock, precio);
  const query = 'INSERT INTO insumos (nombre_insumo, stock, precio) VALUES (?, ?, ?)';

  database.query(query, [nombre_insumo, stock, precio], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al crear el insumo');
    } else {
      res.send('Insumo creado');
    }
  });
};

const getInsumo = (req, res) => {
  const query = 'SELECT * FROM insumos';

  database.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al obtener insumo');
    } else {
      console.log(results); 
      res.json(results);
    }
  });
};

const getInsumoById = (req, res) => {
  const insumoId = req.params.id; 
  const query = 'SELECT * FROM insumos WHERE id_insumo = ?';

  database.query(query, [insumoId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al obtener el insumo por ID');
    }
    if (result.length === 0) {
        
        return res.status(404).send('Insumo no encontrado');
      } 
    return res.json(result[0]);
      
    })
  };


const updateInsumo = (req, res) => {
  const insumoId = req.params.id; 
  const { nombre_insumo, stock, precio } = req.body; 

  const query = 'UPDATE insumos SET nombre_insumo = ?, stock = ?, precio = ? WHERE id_insumo = ?';

  database.query(query, [nombre_insumo, stock, precio, insumoId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al actualizar el Insumo');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Insumo no encontrado');
      } 
    return res.send('Insumo actualizado');
    })
  };

const deleteInsumo = (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM insumos WHERE id_insumo = ?';

  database.query(query, [id], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al eliminar el insumo');
    } else {
      res.send('Insumo eliminado');
    }
  });
};

module.exports = {
  createTableInsumos,
  createInsumo,
  getInsumo,
  getInsumoById,
  updateInsumo,
  deleteInsumo,
};
