var rutasAnexos = require("../controllers/anexosControllers.js").anexos;

index.post("/anexos/productos", (request, response)=>{
    rutasAnexos.anexosProductos(request, response)
})