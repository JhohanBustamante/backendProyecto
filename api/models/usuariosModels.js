const usuariosModels = {};
const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const usuarioSchema = new Schema({
  nombre: String,
  apellido: String,
  correo: String,
  codigoReg: String,
  codigoRec: String,
  rol: String,
  contrasena: String,
  estado: String,
  cedula: String,
});

const modelo = mongoose.model("usuarios", usuarioSchema);

usuariosModels.registro = (post, callback) => {
  const instancia = new modelo();
  instancia.nombre = post.nombre;
  instancia.apellido = post.apellido;
  instancia.correo = post.correo;
  instancia.contrasena = post.contrasena;
  instancia.cedula = post.cedula; 
  instancia.estado = "inactivo";
  instancia.rol = "cliente";
  instancia.codigoReg = post.codigoReg;

  instancia
    .save()
    .then((respuesta) => {
      return callback({ estado: true, respuesta });
    })
    .catch((error) => {
      console.log(error);
      return callback({ estado: false });
    });
};

usuariosModels.buscar = (post, callback) => {
  modelo.find({correo: post.correo} , {contrasena: 0, _id: 0,}).then((respuesta)=>{
    return callback(respuesta);
  })
}

usuariosModels.activar = (post, callback) => {
  modelo.findOneAndUpdate(
    { correo: post.correo, codigoReg: post.codigo },
    { estado: "Activo" }
  ).then((respuesta) => {
    return callback(respuesta);
  });
};

usuariosModels.iniciar = (post, callback) => {
  modelo.find({correo: post.correo, contrasena: post.contrasena} , {contrasena: 0, _id: 0,}).then((respuesta)=>{
    return callback(respuesta);
  })
}

module.exports.usuariosModels = usuariosModels;
