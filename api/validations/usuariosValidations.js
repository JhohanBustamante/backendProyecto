var validaciones = {};

const datosNoPermitidos = ["", undefined, null];
const validacionCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const validacionContrasena =
  /^(?=(.*[a-z]){2,})(?=(.*[A-Z]){1,})(?=(.*\d){2,})[a-zA-Z\d]{10,15}$/;

validaciones.correoContrasena = (post) => {
  let existencia = datosNoPermitidos.findIndex(
    (dato) =>
      dato == post.nombre ||
      dato == post.correo ||
      dato == post.contrasena
  );
  if (existencia >= 0) {
    return "datos";
  } else if (!validacionCorreo.test(post.correo)) {
    return "correo";
  } else if (!validacionContrasena.test(post.contrasena)) {
    return "contrasena";
  } else {
    return true;
  }
};

validaciones.inicio = (post) => {
  let existencia = datosNoPermitidos.findIndex(
    (dato) => dato == post.correo || dato == post.contrasena
  );
  if (existencia >= 0) {
    return "datos";
  } else if (!validacionCorreo.test(post.correo)) {
    return "correo";
  } else if (!validacionContrasena.test(post.contrasena)) {
    return "contrasena";
  } else {
    return true;
  }
};

module.exports.validacion = validaciones;
