const usuariosModels = require("../models/usuariosModels.js").usuariosModels;
const validacion = require("../validations/usuariosValidations.js").validacion;
const usuariosController = {};

usuariosController.registrar = (request, response) => {
  const post = {
    nombre: request.body.nombre,
    apellido: request.body.apellido,
    correo: request.body.correo.toLowerCase(),
    contrasena: request.body.contrasena,
    cedula: request.body.cedula,
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

  usuariosModels.buscar(post, (resultado) => {
    if (resultado.length !== 0) {
      response.json({ estado: false, mensaje: "Correo en uso, prueba otro" });
      return false;
    }
    post.contrasena = sha256(post.contrasena + config.claveSecreta);
    let codigoAzar = "R-" + Math.floor(Math.random() * 8999 + 1000);
    post.codigoReg = codigoAzar;

    usuariosModels.registro(post, (respuesta) => {
      if (respuesta.estado == false) {
        response.json({ estado: false, mensaje: "Error en registro" });
        return false;
      } else {
        console.log("----------->");
        console.log(respuesta);
        response.json({ estado: true, respuesta });
      }

      const transportador = nodemailer.createTransport({
        host: config.emailHost,
        port: config.emailPort,
        secure: false,
        requireTLS: true,
        auth: {
          user: config.emailUser,
          pass: config.emailPass,
        },
      });

      var mailOptions = {
        from: config.emailUser,
        to: post.correo,
        subject: "Con este cógido, activas tu cuenta: " + post.codigoReg,
        html: `<div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 30px; text-align: center;">
                <div style="max-width: 500px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">

                  <h1 style="color: #2c3e50;">Bienvenido a <span style="color: #3498db;">${config.negocio}</span></h1>

                  <p style="font-size: 16px; color: #333;">Gracias por registrarte. Usa el siguiente código para activar tu cuenta:</p>

                  <div style="font-size: 24px; font-weight: bold; letter-spacing: 4px; color: #e74c3c; background-color: #fdecea; padding: 15px; margin: 20px auto; width: fit-content; border-radius: 8px;">
                    ${post.codigoReg}
                  </div>

                  <a href="${config.dominio}/activar/${post.correo}/${post.codigoReg}" target = "_blank"
                     style="display: inline-block; background-color: #3498db; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 5px; font-weight: bold; font-size: 16px;">
                    Activar mi cuenta
                  </a>

                  <p style="margin-top: 30px; font-size: 14px; color: #888;">
                    Si no te registraste en <strong>La Ruta</strong>, puedes ignorar este mensaje.
                  </p>
                </div>
              </div>`,
      };

      transportador.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          response.json({
            estado: false,
            mensaje: "Error enviando el correo",
          });
        } else {
          console.log(info);
          response.json({ estado: true, mensaje: "Correo enviado" });
        }
      });
    });
  });
};

usuariosController.buscar = (request, response) => {
  post = {
    correo: request.body.correo.toLowerCase(),
  };
  usuariosModels.buscar(post, (resultado) => {
    if (resultado.length == 0) {
      response.json({ estado: false, mensaje: "credenciales" });
    } else if (resultado[0].estado == "inactivo") {
      response.json({ estado: false, mensaje: "Usuario inactivo" });
    } else {
      response.json({ estado: true, valor: resultado[0] });
    }
  });
};

usuariosController.activar = (request, response) => {
  var post = {
    correo: request.body.correo,
    codigo: request.body.codigo,
  };
  console.log(post)
  usuariosModels.buscar(post, (resultado) => {
    if (resultado.length == 0) {
      response.json({ estado: false, mensaje: "Correo inválido" });
    } else {
      usuariosModels.activar(post, (respuesta) => {
        if (respuesta == null) {
          response.json({ estado: false, mensaje: "Código inválido" });
        } else {
          response.json({
            estado: true,
            mensaje: "Cuenta activada correctamente",
          });
        }
      });
    }
  });
};

usuariosController.iniciar = (request, response) => {
  post = {
    correo: request.body.correo,
    contrasena: request.body.contrasena,
  };

  if (validacion.inicio(post) == "datos") {
    response.json({ estado: false, mensaje: "Ingresa correo y contraseña" });
  } else if (validacion.inicio(post) == "correo") {
    response.json({ estado: false, mensaje: "Correo no válido" });
    return false;
  } else if (validacion.inicio(post) == "contrasena") {
    response.json({
      estado: false,
      mensaje: "Contraseña no valida. Debe tener entre 10 y 15 caracteres",
    });
    return false;
  } else {
    usuariosModels.buscar(post, (resultado) => {
      if (resultado.length == 0) {
        response.json({ estado: false, mensaje: "correo" });
      } else if (resultado[0].estado == "inactivo") {
        response.json({ estado: false, mensaje: "Usuario inactivo" });
      } else {
        usuariosModels.iniciar(post, (resultado) => {
          if (resultado.length == 0) {
            response.json({ estado: false, mensaje: "Contraseña incorrecta" });
          } else {
            request.session.correo = resultado[0].correo;
            request.session.rol = resultado[0].rol;
            request.session.nombre = resultado[0].nombre;

            response.json({ estado: true, mensaje: "Bienvenido" });
          }
        });
      }
    });
    post.contrasena = sha256(post.contrasena + config.claveSecreta);
  }
};

module.exports.usuarios = usuariosController;
