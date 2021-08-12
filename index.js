// const express = require('express');
// Esta es lo mismo que la linea de arriba pero la de arriba es la versión de commons y la de abajo de imports
import express from 'express';
import router from './routes/index.js';
import db from './config/database.js'
import dotenv from 'dotenv'
dotenv.config({ path: 'variables.env' });

const app = express();

// Conectar la base de datos
db.authenticate()
   .then(() => console.log('Base de datos conectada'))
   .catch(error => console.log(error));
   

// Definir puerto
const port = process.env.PORT || 4000;

// Habilitar PUG
app.set('view engine', 'pug');

// Obtener el año actual
// next -> Ya termine, vamonos al siguiente middleware
app.use( (req, res, next) => {
   const year = new Date();  
   res.locals.actualYear = year.getFullYear();
   res.locals.nombresitio = "Agencia de Viajes";
   next();
});

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

// Definir la carpeta publica
app.use(express.static('public'));

// Agregar router
app.use('/', router);

const host = process.env.HOST || '0.0.0.0';

app.listen(port, host, () => {
   console.log(`El Servidor esta funcionando en el puerto ${port}`)
})

