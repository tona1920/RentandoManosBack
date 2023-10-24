const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const configPassport = require('./config/passport');

//Importar rutas
const userRoutes = require('./routes/userRotes');

const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

configPassport(passport);

app.disable('x-powered-by');

app.set('port', port);

//Llamar rutas
userRoutes(app);

server.listen(port, '192.168.0.14' || 'localhost', function() {
    const address = server.address(); // Obtiene la dirección y el puerto del servidor
    console.log('Aplicacion iniciada en http://' + address.address + ':' + address.port);
});

app.get('/', (req, res) => {
    res.send('Ruta raiz');
});

app.get('/test', (req, res) => {
    res.send('Ruta test');
});

// Error Handler
app.use((err, req, res) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

module.exports = {
    app:app,
    server:server
}