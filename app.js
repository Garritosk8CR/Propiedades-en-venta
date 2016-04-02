var express = require("express"),
    app     = express(),
    http    = require("http"),
    server  = http.createServer(app),
    mongoose = require("mongoose");

app.configure(function () {
    app.use(express.static(__dirname + '/public')); // Localización de los ficheros estáticos 
    app.use(express.logger('dev')); // Muestra un log de todos los request en la consola
    app.use(express.bodyParser());  // Permite cambiar el HTML con el método POST
  	app.use(express.methodOverride()); // Simula DELETE y PUT
  	app.use(app.router);
});

//Conexión con la BBDD jugadores
mongoose.connect('mongodb://localhost/venta_propiedades', function(err, res) {
    if(err) console.log('ERROR: connecting to Database. ' + err);
    else console.log('Connected to Database');
});

routes = require('./routes/propiedades')(app);

app.get('/', function (req, res) {
    res.sendfile('./public/index.html');
});

//Servidor corriendo en el puerto 7001
server.listen(7001, function() {
  	console.log("Servidor corriendo en http://localhost:7001");
});

