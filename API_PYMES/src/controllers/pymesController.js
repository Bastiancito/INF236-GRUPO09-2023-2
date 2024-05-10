const database = require('../db');


const createTablePymes = (req, res) => {
  const query =  'CREATE TABLE IF NOT EXISTS pymes(id_pyme int AUTO_INCREMENT, nombre_pyme VARCHAR(50),nombre_propietario VARCHAR(50),doc_identidad VARCHAR(50), direccion_pyme VARCHAR(50), direccion_contacto VARCHAR(50),descripcion_pyme VARCHAR(128),etiquetas_pyme VARCHAR(128), PRIMARY KEY(id_pyme))';

  database.query(query, (err) => {
      if (err) throw err;
      res.send('Tabla creada')
  });
};

const getPymes = (req, res) => {
    const query = 'SELECT * FROM pymes';
  
    database.query(query, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error al obtener pymes');
      } else {
        console.log(results); 
        res.json(results);
      }
    });
  };

  const createPyme = (req, res) => {
    const { nombre_pyme, nombre_propietario, doc_identidad, direccion_pyme, direccion_contacto, descripcion_pyme } = req.body;
    const query = 'INSERT INTO pymes (nombre_pyme, nombre_propietario, doc_identidad, direccion_pyme,etiquetas_pyme, direccion_contacto, descripcion_pyme) VALUES (?, ?, ?, ?, ?, ?)';
  
    database.query(query, [nombre_pyme, nombre_propietario, doc_identidad, direccion_pyme,etiquetas_pyme ,direccion_contacto, descripcion_pyme], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error al crear pyme', details: err.message });
      }
      res.json({ message: 'Pyme creado', data: results });
    });
};

module.exports={
    createTablePymes,
    createPyme,
    getPymes
};