const lotesModels = {};
const mongoose = require("mongoose");
const { lotes } = require("../controllers/lotesControllers");
var Schema = mongoose.Schema;

const loteschema = new Schema({
  titulo: String,
  metrosCuadrados: Number,
  precioMetroCuadrado: Number,
  lugar: String,
  descripcion: String,
  precio: Number,
  lugarNombre: String
});

const modelo = mongoose.model("lotes", loteschema);

lotesModels.buscar = (post, callback) => {
  modelo
    .find({ codigo: post.codigo }, { contrasena: 0, _id: 0 })
    .then((respuesta) => {
      return callback(respuesta);
    });
};  

lotesModels.cargar = (params, callback) => {
  modelo
    .find({_id: params._id})
    .then((respuesta) => {
      return callback(respuesta);
    });
};

lotesModels.guardar = (post, callback) => {
  const instancia = new modelo();
  instancia.metrosCuadrados = post.metrosCuadrados;
  instancia.titulo = post.titulo;
  instancia.descripcion = post.descripcion;
  instancia.lugar = post.lugar;
  instancia.precioMetroCuadrado = post.precioMetroCuadrado;
  instancia.precio = post.precio
  instancia.lugarNombre = post.lugarNombre
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

lotesModels.eliminar = (post, callback)=>{
  modelo.findByIdAndDelete(post._id).then((resultado)=>{
    return callback({estado:true})
  }).catch((error)=>{
    console.log(error)
    return callback({estado:false})
  })
}

lotesModels.cargarId = (post, callback) => {
  modelo.findById(post._id, { __v: 0, contrasena: 0 }).then((resultado) => {
    return callback({ datos: resultado })
  })
}

lotesModels.cargarTodas = (callback) => {
  modelo.find( {}, { __v: 0}).then((resultado) => {
    return callback({ datos: resultado })
  })
} 

lotesModels.actualizar = (post, callback) => {
  modelo.findOneAndUpdate({ _id: post._id }, 
    { precioMetroCuadrado: post.precioMetroCuadrado, lugar: post.lugar, descripcion: post.descripcion, metrosCuadrados: post.metrosCuadrados, 
      titulo: post.titulo, lugarNombre:post.lugarNombre, precio:post.precio })
    .then((resultado) => {
    return callback({ estado:true })
  }).catch((error)=>{
    console.log(error)
    return callback({estado:false})
  })
}

lotesModels.cargarPorlugar = (post, callback) => {
  console.log(post)
  modelo.find({lugar:post.lugar})
  .then((respuesta)=>{
    return callback({datos:respuesta});
  })
}

lotesModels.titulos = (post, callback) => {
  modelo
    .find({}, { titulo: 1, _id: 0 })
    .then((respuesta) => {
      return callback(respuesta);
    });
}

module.exports.lotesModels = lotesModels;