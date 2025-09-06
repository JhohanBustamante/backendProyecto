var express = require("express");
global.index = express();
const bodyParser = require("body-parser");
index.use(bodyParser.json());
index.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require("mongoose");
global.config = require("./config.js").config;
global.sha256 = require("sha256");
global.nodemailer = require("nodemailer");
const cors = require("cors");
const { config } = require("./config.js");
const session = require("express-session");
const mongoStore = require("connect-mongo");
global.path = require("path");
global.appRoot = path.resolve(__dirname);
global.multer = require("multer")

mongoose
  .connect("mongodb://127.0.0.1:27017/" + config.bd)
  .then((respuesta) => {
    console.log("conexión correcta a mongo");
  })
  .catch((error) => {
    console.log(error);
  });

index.use((req, res, next) => {
  const origin = req.headers.origin;

  if (config.listaCors.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }

  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

index.use(
  session({
    secret: config.claveSecreta,
    resave: true,
    saveUninitialized: true,
    store: mongoStore.create({
      client: mongoose.connection.getClient(),
      dbName: config.bd + "sessions",
      collectionName: "sessions",
      ttl: config.expiracion,
    }),
    cookie: {
      maxAge: config.expiracion,
      httpOnly: true,
    },
    name: "CookieApp",
    rolling: true,
  })
  
);

require("./api/routes/usuariosRoutes.js");
require("./api/routes/lugaresRoutes.js");
require("./api/routes/lotesRoutes.js");
require("./api/routes/anexosRoutes.js");

index.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (config.listablanca.indexOf(origin) === -1) {
        return callback("Error de Cors No hay permisos", false);
      } else {
        return callback(null, true);
      }
    },
  })
);

index.use("/imagenes", express.static(__dirname + "/imagenes"));

index.listen(config.port, () => {
  console.log("Servidor actividades funcionando por el port: " + config.port);
});
