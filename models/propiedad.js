var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var propiedadSchema = new Schema({
    precio:    { type: Number },
    moneda:    { type: String, enum:
      ['Colones', 'Dolares']
    },
    tamanno:     { type: Number },
    provincia:  { type: String },
    canton:  { type: String }
    //demarcacion:    { type: String, enum:
     // ['Portero', 'Defensa', 'Centrocampista', 'Delantero']
    //}  
});

//Se podrá crear un nuevo objeto con new Jugador
module.exports = mongoose.model('Propiedad', propiedadSchema);