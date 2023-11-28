const database = require('../db');

const createTableClientes = (req, res) => {
  const query = 'CREATE TABLE IF NOT EXISTS clientes(id_cliente int AUTO_INCREMENT, nombre_cliente VARCHAR(50), email VARCHAR(50) UNIQUE, password VARCHAR(50), PRIMARY KEY(id_cliente))';

  database.query(query, (err) => {
    if (err) throw err;
    res.send('Tabla de clientes creada');
  });
};

const createCliente = (req, res) => {
  console.log(req.body);
  const { nombre_cliente, email, password } = req.body;
  const query = 'INSERT INTO clientes (nombre_cliente, email, password) VALUES (?, ?, ?)';

  database.query(query, [nombre_cliente, email, password], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al crear el cliente');
    } else {
      res.send('Cliente creado');
    }
  });
};

const getClientes = (req, res) => {
  const query = 'SELECT * FROM clientes';

  database.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al obtener clientes');
    } else {
      console.log(results);
      res.json(results);
    }
  });
};

const getClienteById = (req, res) => {
  const clienteId = req.params.id;
  const query = 'SELECT * FROM clientes WHERE id_cliente = ?';

  database.query(query, [clienteId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al obtener el cliente por ID');
    } else {
      if (result.length === 0) {
        res.status(404).send('Cliente no encontrado');
      } else {
        res.json(result[0]);
      }
    }
  });
};

const updateCliente = (req, res) => {
  const clienteId = req.params.id;
  const { nombre_cliente, email, password } = req.body;

  const query = 'UPDATE clientes SET nombre_cliente = ?, email = ?, password = ? WHERE id_cliente = ?';

  database.query(query, [nombre_cliente, email, password, clienteId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al actualizar el cliente');
    } else {
      if (result.affectedRows === 0) {
        res.status(404).send('Cliente no encontrado');
      } else {
        res.send('Cliente actualizado');
      }
    }
  });
};

const deleteCliente = (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM clientes WHERE id_cliente = ?';

  database.query(query, [id], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al eliminar el cliente');
    } else {
      res.send('Cliente eliminado');
    }
  });
};

module.exports = {
  createTableClientes,
  createCliente,
  getClientes,
  getClienteById,
  updateCliente,
  deleteCliente,
};