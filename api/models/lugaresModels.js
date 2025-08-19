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

lugaresModels.guardar = (post, callback) => {
  const instancia = new modelo();
  instancia.nombre = post.nombre;
  instancia.apellido = post.apellido;
  instancia.correo = post.correo;
  instancia.contrasena = post.contrasena;
  instancia.estado = post.estado;
  instancia.rol = post.rol;

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

lugaresModels.eliminar = (post, callback)=>{
  modelo.findByIdAndDelete(post._id).then((resultado)=>{
    return callback({estado:true})
  }).catch((error)=>{
    console.log(error)
    return callback({estado:false})
  })
}

lugaresModels.cargarId = (post, callback) => {
  modelo.findById(post._id, { __v: 0, contrasena: 0 }).then((resultado) => {
    return callback({ datos: resultado })
  })
}

lugaresModels.cargarTodas = (callback) => {
  modelo.find( {}, { __v: 0, contrasena: 0 }).then((resultado) => {
    return callback({ datos: resultado })
  })
} 

lugaresModels.actualizar = (post, callback) => {
  modelo.findOneAndUpdate({ _id: post._id }, 
    { nombre: post.nombre, apellido: post.apellido, estado: post.estado, rol: post.rol })
    .then((resultado) => {
    return callback({ estado:true })
  }).catch((error)=>{
    console.log(error)
    return callback({estado:false})
  })
}

module.exports.lugaresModels = lugaresModels;
