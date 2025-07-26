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

module.exports.lugares = lugaresController;
