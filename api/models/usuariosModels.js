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
});

const modelo = mongoose.model("usuarios", usuarioSchema);


usuariosModels.guardar = (post, callback) => {
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

usuariosModels.eliminar = (post, callback)=>{
  modelo.findByIdAndDelete(post._id).then((resultado)=>{
    return callback({estado:true})
  }).catch((error)=>{
    console.log(error)
    return callback({estado:false})
  })
}

usuariosModels.cargarId = (post, callback) => {
  modelo.findById(post._id, { __v: 0, contrasena: 0 }).then((resultado) => {
    return callback({ datos: resultado })
  })
}

usuariosModels.cargarTodas = (callback) => {
  modelo.find( {}, { __v: 0, contrasena: 0 }).then((resultado) => {
    return callback({ datos: resultado })
  })
} 

usuariosModels.actualizar = (post, callback) => {
  modelo.findOneAndUpdate({ _id: post._id }, 
    { nombre: post.nombre, apellido: post.apellido, estado: post.estado, rol: post.rol })
    .then((resultado) => {
    return callback({ estado:true })
  }).catch((error)=>{
    console.log(error)
    return callback({estado:false})
  })
}

usuariosModels.actualizarContrasena = (post, callback) => {
  modelo.findOneAndUpdate({ _id: post._id }, 
    { contrasena: post.contrasena})
    .then((resultado) => {
    return callback({ estado:true })
  }).catch((error)=>{
    console.log(error)
    return callback({estado:false})
  })
}

usuariosModels.actualizarDatos= (post, callback) => {
  modelo.findOneAndUpdate({ _id: post._id }, 
    { nombre: post.nombre})
    .then((resultado) => {
    return callback({ estado:true })
  }).catch((error)=>{
    console.log(error)
    return callback({estado:false})
  })
}

usuariosModels.iniciar = (post, callback) => {
  modelo.find({ correo: post.correo, contrasena: post.contrasena }, { contrasena: 0, }).then((respuesta) => {
    return callback(respuesta);
  })
}

usuariosModels.admin = (post, callback) => {
  modelo.findOneAndUpdate(
    { correo: post.correo },
    { rol: "Administrador" }
  ).then((respuesta) => {
    return callback(respuesta);
  });
};

usuariosModels.activar = (post, callback) => {
  modelo.findOneAndUpdate(
    { correo: post.correo, codigoReg: post.codigo },
    { estado: "Activo" }
  ).then((respuesta) => {
    return callback(respuesta);
  });
};

usuariosModels.buscar = (post, callback) => {
  modelo.find({ correo: post.correo }, { contrasena: 0, _id: 0, }).then((respuesta) => {
    return callback(respuesta);
  })
}

usuariosModels.registro = (post, callback) => {
  const instancia = new modelo();
  instancia.nombre = post.nombre;
  instancia.apellido = post.apellido;
  instancia.correo = post.correo;
  instancia.contrasena = post.contrasena;
  instancia.estado = "Inactivo";
  instancia.rol = "Cliente";
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


module.exports.usuariosModels = usuariosModels;
