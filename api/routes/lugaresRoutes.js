var rutasLugares = require("../controllers/lugaresControllers.js").lugares;

index.post("/lugares/buscar", (request, response)=>{
    rutasLugares.buscar(request, response)
})

index.post("/lugares/registrar", (request, response)=>{
    rutasLugares.registrar(request, response)
})

index.get("/lugares/cargar/:codigo", (request, response)=>{
    rutasLugares.cargar(request, response)
})