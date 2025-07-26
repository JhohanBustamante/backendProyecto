var config = {};

config.bd = "proyecto";
config.port = 3000;
config.claveSecreta = "123abc098zyx";
config.dominio = "http://localhost:4200"
config.expiracion = 60000*10


config.emailHost = "smtp.gmail.com";

config.emailPort = 587;
config.emailUser = "jhohantma@gmail.com";
config.emailPass = "ojzarzmoxuokvjhv";
config.negocio = "Venta de Lotes RB"

config.listaCors = [
    "http://localhost:4200"
]

module.exports.config = config;