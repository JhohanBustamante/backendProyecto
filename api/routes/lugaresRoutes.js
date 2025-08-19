var rutasLugares = require("../controllers/lugaresControllers.js").lugares;
const seguridadMDW = require("../../middleware/seguridad.js").security


index.post("/lugares/buscar", (request, response)=>{
    rutasLugares.buscar(request, response)
})

index.post("/lugares/registrar", (request, response)=>{
    rutasLugares.registrar(request, response)
})

index.get("/lugares/cargar/:codigo", (request, response)=>{
    rutasLugares.cargar(request, response)
})

index.delete("/lugares/eliminar", seguridadMDW.admin, (request, response)=>{
    rutasLugares.eliminar(request, response)
})

index.get("/lugares/cargarTodas", (request, response)=>{
    rutasLugares.cargarTodas(request, response)
})

index.get("/lugares/cargarId/:_id", (request, response)=>{
    rutasLugares.cargarId(request, response)
})

index.post("/lugares/guardar", seguridadMDW.admin, (request, response)=>{
    rutasLugares.guardar(request,response)
})

index.put("/lugares/actualizar", seguridadMDW.admin, (request, response)=>{
    rutasLugares.actualizar(request, response)
})