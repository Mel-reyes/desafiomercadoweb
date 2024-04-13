const express = require('express');
const { engine } = require('express-handlebars');

const app = express(); // Crear una instancia de Express

// Rutas para servir Bootstrap y jQuery desde node_modules
app.use('/bsjs', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/bscss', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/jq', express.static(__dirname + '/node_modules/jquery/dist'));

// Rutas para servir archivos estáticos desde la carpeta 'assets'
app.use(express.static('assets'));

// Configuración base para Handlebars (con extensión de archivo hbs)
app.engine(
  'hbs',
  engine({
    layoutsDir: 'views',
    partialsDir: 'views/parciales/',
    extname: 'hbs',
    defaultLayout: 'index'
  })
);

app.set('view engine', 'hbs');

// Listado de productos disponibles
const PRODUCTS = ['banana', 'cebollas', 'lechuga', 'papas', 'pimenton', 'tomate'];

// Disponibiliza ruta por defecto a página principal
app.get('/', (_, res) => res.render('index', { layout: 'index', products: PRODUCTS }));

// Manejo básico de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Lanza el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});