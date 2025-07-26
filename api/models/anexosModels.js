const anexosModels = {};
const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const anexosSchema = new Schema({
  titulo: String,
  subtitulo: String,
  descripcion: String,
  listaUno: String,
  listaDos: String,
  listaTres: String,
  listaCuatro: String,
  listaCinco: String,
  codigo: String
});

const modelo = mongoose.model("anexos", anexosSchema);



module.exports.anexosModels = anexosModels;
