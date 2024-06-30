const database = require('../db');

const createTableMensajes = (req, res) => {
    const query = 'CREATE TABLE IF NOT EXISTS mensajes(id_mensaje int AUTO_INCREMENT, nombre VARCHAR(50), email VARCHAR(50), mensaje TEXT, PRIMARY KEY(id_mensaje))';
  
    database.query(query, (err) => {
      if (err) throw err;
      res.send('Tabla de mensajes creada');
    });
  };
  
  const createMensaje = (req, res) => {
    console.log(req.body);
    const { nombre, email, mensaje } = req.body;
    const query = 'INSERT INTO mensajes (nombre, email, mensaje) VALUES (?, ?, ?)';
  
    database.query(query, [nombre, email, mensaje], (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error al crear el mensaje');
      } else {
        res.send('Mensaje creado');
      }
    });
  };
  
  const getMensajes = (req, res) => {
    const query = 'SELECT * FROM mensajes';
  
    database.query(query, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error al obtener mensajes');
      } else {
        console.log(results); // Verifica los resultados en la consola
        res.json(results);
      }
    });
  };
  
  const getMensajeById = (req, res) => {
    const mensajeId = req.params.id;
    const query = 'SELECT * FROM mensajes WHERE id_mensaje = ?';
  
    database.query(query, [mensajeId], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error al obtener el mensaje por ID');
      }
      if (result.length === 0) {
        return res.status(404).send('Mensaje no encontrado');
        }
        return res.json(result[0]);
        })
      };
    
  
  const updateMensaje = (req, res) => {
    const mensajeId = req.params.id;
    const { nombre, email, mensaje } = req.body;
  
    const query = 'UPDATE mensajes SET nombre = ?, email = ?, mensaje = ? WHERE id_mensaje = ?';
  
    database.query(query, [nombre, email, mensaje, mensajeId], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error al actualizar el mensaje');
      }
      if (result.affectedRows === 0) {
        return res.status(404).send('Mensaje no encontrado');
        }
      return res.send('Mensaje actualizado');
        
      }
    )};
  
  
  const deleteMensaje = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM mensajes WHERE id_mensaje = ?';
  
    database.query(query, [id], (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error al eliminar el mensaje');
      } else {
        res.send('Mensaje eliminado');
      }
    });
  };
  
  module.exports = {
    createTableMensajes,
    createMensaje,
    getMensajes,
    getMensajeById,
    updateMensaje,
    deleteMensaje,
  };
  