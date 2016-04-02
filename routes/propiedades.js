module.exports = function(app) {
	//Importamos el mismo Propiedad que exportamos en propiedad.js
	var Propiedad = require('../models/propiedad.js');

	//GET - Devolver todos los propiedades
    findAllPropiedades = function(req, res) {
    	Propiedad.find(function(err,propiedades){
    		if(!err) res.send(propiedades);
    		else console.log('ERROR: ' + err);
    	});
    };

    //GET - Devuelve un único propiedad por id
    findById = function(req, res) {
        //req.param.id es el parámetroq ue va a pasarle el navegador
        Propiedad.findById(req.params.id, function(err, propiedad) {
            if(!err) res.send(propiedad);
            else console.log('ERROR: ' + err);
        });
    };

    //POST - Insertar un nuevo propiedad
    addPropiedad = function(req, res) {
    	var propiedad = new Propiedad({
      		precio  	: req.body.precio,
            moneda  	: req.body.moneda,
      		tamanno		: req.body.tamanno,
      		provincia  	: req.body.provincia,
      		canton	: req.body.canton 
    	});
    	propiedad.save(function(err) {
    		if(!err) console.log('Propiedad creado');
    		else console.log('ERROR: ' + err);
    		//Para que se actualize la página al insertar un propiedad llamamos a la función de
    		//listar los propiedades. Se mete dentro del save para que se haga después.
    		findAllPropiedades(req, res);
    	});
    };

    //DELETE 
    deletePropiedad = function(req, res) {
      	Propiedad.findById(req.params.id, function(err, propiedad) {
        	propiedad.remove(function(err,propiedades) {
          		if(!err) console.log('Propiedad borrado');
          		else console.log('ERROR: ' + err);
          		//Igual que al añadir, al borrar volvemos a listar los propiedades
        		findAllPropiedades(req, res);
        	});
      	});
    }

    //PUT - Modificar
    updatePropiedad = function(req, res) {
      	Propiedad.findById(req.params.id, function(err, propiedad) {
        	propiedad.precio  = req.body.precio;
            propiedad.moneda  	= req.body.moneda;
        	propiedad.tamanno 	= req.body.tamanno;
        	propiedad.provincia  = req.body.provincia;
        	propiedad.canton  = req.body.canton;

        	propiedad.save(function(err) {
          		if(!err) console.log('Modificado');
          		else console.log('ERROR: ' + err);
          		findAllPropiedades(req, res);
        	});
      	});
    }

    //Rutas
    app.get('/propiedades', findAllPropiedades);
    app.get('/propiedad/:id', findById);
    app.post('/propiedad', addPropiedad);
    app.put('/propiedad/:id', updatePropiedad);
    app.delete('/propiedad/:id', deletePropiedad);
}