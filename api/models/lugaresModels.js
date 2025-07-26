const lugaresModels = {};
const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const lugareschema = new Schema({
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

const modelo = mongoose.model("lugares", lugareschema);

lugaresModels.registro = (post, callback) => {
  const instancia = new modelo();
  instancia.titulo = post.titulo;
  instancia.subtitulo = post.subtitulo;
  instancia.descripcion = post.descripcion;
  instancia.contrasena = post.contrasena;
  instancia.listaDos = post.listaDos;
  instancia.listaTres = post.listaTres;
  instancia.listaCuatro = post.listaCuatro;
  instancia.listaCinco = post.listaCinco;
  instancia.codigo = post.codigo
  instancia
    .save()
    .then((respuesta) => {
      return callback({ estado: true });
    })
    .catch((error) => {
      console.log(error);
      return callback({ estado: false });
    });
};

lugaresModels.buscar = (post, callback) => {
  modelo
    .find({ codigo: post.codigo }, { contrasena: 0, _id: 0 })
    .then((respuesta) => {
      return callback(respuesta);
    });
};  



lugaresModels.cargar = (params, callback) => {
  modelo
    .find({codigo: params.codigo})
    .then((respuesta) => {
      return callback(respuesta);
    });
};

module.exports.lugaresModels = lugaresModels;
