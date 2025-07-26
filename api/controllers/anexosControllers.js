const multer = require("multer");
const path = require("path");
const anexosController = {};

anexosController.anexosProductos = (request, response) => {
  var upload = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, appRoot + "/imagenes/");
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
    }),
    fileFilter: (req, file, cb) => {
      var ext = path.extname(file.originalname);
      if (
        ext !== ".png" &&
        ext !== ".jpg" &&
        ext !== ".tif" &&
        ext !== ".jpeg"
      ) {
        cb("Solo aceptamos formatos de imagen", null);
      }
    },
  }).single("file");
  upload(request, response, (err) => {
    if (err) {
      console.log("-----------");
      console.log(err);
      response.json({ estado: false, error: err });
    } else {
      response.json({ estado: true, mensaje: "Archivo cargado" });
    }
  });
};

module.exports.anexos = anexosController;
