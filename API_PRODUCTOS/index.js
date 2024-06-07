const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const cors = require('cors');
require('dotenv').config();

//const PORT = 3000;                  //COMENTAR PARA CORRER BACK-END EN DOCKER

// Middleware para logs y manejo de JSON
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
//eo
const database = require('./src/db'); 

const routes = require('./src/routes/index');
app.use(routes);


database.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos MySQL');
});


app.use(express.static(path.join(__dirname, 'public')));

app.get('/crearpyme', (req, res) => {
    console.log('Accediendo a la ruta raíz');
    res.sendFile(path.join(__dirname, 'public', 'crearpyme.html'));
});

app.get('/', (req, res) => {
    console.log('Accediendo a la ruta raíz');
    res.sendFile(path.join(__dirname, 'public', 'carrito.html'));
});

// Ruta para acercade
app.get('/acercade', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'acercade.html'));
});

// Ruta para contacto
app.get('/contacto', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contacto.html'));
});

// Ruta para carrito
app.get('/carrito', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'carrito.html'));
});

// Ruta para insumo
app.get('/insumosp', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'insumosp.html'));
});




// Iniciar el servidor
const PORT = process.env.PORT_API || 8080;         //DESCOMENTAR PARA CORRER BACK-END EN DOCKER
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

