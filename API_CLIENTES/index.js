const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
require('dotenv').config();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

const database = require('./src/db'); 

database.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos MySQL');
});
// Configurar Express para servir archivos estáticos desde el directorio 'src'
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    console.log('Accediendo a la ruta raíz');
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

const routes = require('./src/routes/index');
app.use(routes);


// Iniciar el servidor
const PORT = process.env.PORT_API || 8081;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

