const lugaresModels = require("../models/lugaresModels.js").lugaresModels;
const validacion = require("../validations/lugaresValidations.js").validacion;
const lugaresController = {};

lugaresController.registrar = (request, response) => {
  const post = {
    titulo: request.body.titulo,
    subtitulo: request.body.subtitulo,
    descripcion: request.body.descripcion,
    listaUno: request.body.listaUno,
    listaDos: request.body.listaDos,
    listaTres: request.body.listaTres,
    listaCuatro: request.body.listaCuatro,
    listaCinco: request.body.listaCinco,
    codigo: request.body.codigo,
  };
  lugaresModels.buscar(post, (resultado) => {
    if (resultado.length !== 0) {
      response.json({ estado: false, mensaje: "Codigo en uso, prueba otro" });
      return false;
    } else {
      lugaresModels.registro(post, (respuesta) => {
        if (respuesta.estado == false) {
          response.json({ estado: false, mensaje: "Error en registro" });
          return false;
        } else response.json({ estado: true, mensaje: "Registro exitoso" });
      });
    }
  });
};

lugaresController.cargar = (request, response) => {
  lugaresModels.cargar(request.params, (resultado) => {
    console.log(resultado);
    response.json(resultado);
  });
};

lugaresController.buscar = (request, response) => {
  post = {
    correo: request.body.correo.toLowerCase(),
  };
  lugaresModels.buscar(post, (resultado) => {
    if (resultado.length == 0) {
      response.json({ estado: false, mensaje: "credenciales" });
    } else if (resultado[0].estado == "inactivo") {
      response.json({ estado: false, mensaje: "Usuario inactivo" });
    } else {
      response.json({ estado: true, valor: resultado[0] });
    }
  });
};



lugaresController.cargarId = (request, response) => {
  post = {
    _id: request.params._id
  }
  if (post._id == "" || post._id == undefined || post._id == null) {
    response.json({ estado: false, mensaje: "_id no cargado" })
  } else if (post._id.length !== 24) {
    response.json({ estado: false, mensaje: "Cantidad de caracteres erroneo" })
  } else {
    lugaresModels.cargarId(post, (resultado) => {
      response.json({ estado: true, datos: resultado })
    })
  }
}

lugaresController.cargarTodas = (request, response) => {
  lugaresModels.cargarTodas((resultado) => {
    response.json({ estado: true, datos: resultado })
  })
}

lugaresController.actualizar = (request, response) => {
  post = {
    _id: request.body._id,
    nombre: request.body.nombre,
    apellido: request.body.apellido,
    rol: request.body.rol,
    estado: request.body.estado
  }
  if (post.nombre == "" || post._id == "" || post._id.length !== 24) {
    response.json({ estado: false, mensaje: "Datos invalidos" })
  } else {
    lugaresModels.cargarId(post, (resultado) => {
      if (resultado.datos == null) {
        response.json({ estado: false, mensaje: "No hay usuarios con ese _id" })
      } else {
        lugaresModels.actualizar(post, (resultado) => {
          response.json({ estado: true, mensaje: "Actualizado" })
        })
      }
    })
  }
}

lugaresController.eliminar = (request, response) => {
  post = {
    _id: request.body._id
  }
  if (post._id.length !== 24) {
    response.json({ estado: false, mensaje: "Datos invalidos" })
  } else {
    lugaresModels.cargarId(post, (resultado) => {
      if (resultado.datos == null) {
        response.json({ estado: false, mensaje: "No hay usuarios con ese _id" })
      } else {
        lugaresModels.eliminar(post, (resultado) => {
          response.json({ estado: true, mensaje: "Eliminado" })
        })
      }
    })
  }
}

lugaresController.guardar = (request, response) => {
  const post = {
    nombre: request.body.nombre,
    apellido: request.body.apellido,
    correo: request.body.correo.toLowerCase(),
    contrasena: request.body.contrasena,
    estado: request.body.estado,
    rol: request.body.rol
  };

  if (validacion.correoContrasena(post) == "datos") {
    response.json({
      estado: false,
      mensaje: "Ingresa correo, contraseña, nombre y apellido",
    });
    return false;
  } else if (validacion.correoContrasena(post) == "correo") {
    response.json({ estado: false, mensaje: "Correo no válido" });
    return false;
  } else if (validacion.correoContrasena(post) == "contrasena") {
    response.json({
      estado: false,
      mensaje:
        "Contraseña no valida. Debe tener entre 10 y 15 caracteres, 2 minúsculas y 1 mayúscula",
    });
    return false;
  }
  lugaresModels.buscar(post, (resultado) => {
    if (resultado.length !== 0) {
      response.json({ estado: false, mensaje: "Correo en uso, prueba otro" });
      return false;
    }
    post.contrasena = sha256(post.contrasena + config.claveSecreta);
    lugaresModels.guardar(post, (respuesta) => {
      if (respuesta.estado == false) {
        response.json({ estado: false, mensaje: "Error al guardar" });
        return false;
      } else {
        response.json({ estado: true, respuesta });
      }
    });
  });
};

module.exports.lugares = lugaresController;
