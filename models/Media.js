const {Schema, model} = require("mongoose")

const MediaSchema = Schema({
    serial : {type: String, required: true, unique: true},
    titulo : {type: String, required: true, unique: true},
    sinopsis : {type: String, required: true},
    urlPeli : {type: String, required: true},
    foto : {type: String, required: true},
    fechaCreacion : {type: Date, required: true},
    fechaActualizacion : {type: Date, required: true},
    añoEstreno : {type: Date, required: true},
    generoP : {type: Schema.Types.ObjectId, ref: "Genero", required: true},
    directorP: {type: Schema.Types.ObjectId, ref: "Director", required: true},
    productora: {type: Schema.Types.ObjectId, ref: "Productora", required: true},
    tipo: {type: Schema.Types.ObjectId, ref: "Tipo", required: true},
});
 module.exports = model("Media", MediaSchema);