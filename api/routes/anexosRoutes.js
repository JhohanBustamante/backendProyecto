var rutasAnexos = require("../controllers/anexosControllers.js").anexos;

index.post("/anexos/productos/:nombre", (request, response)=>{
    rutasAnexos.anexosProductos(request, response)
})