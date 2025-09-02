var rutasLotes = require("../controllers/lotesControllers.js").lotes;
const seguridadMDW = require("../../middleware/seguridad.js").security


index.post("/lotes/buscar", (request, response)=>{
    rutasLotes.buscar(request, response)
})

index.get("/lotes/cargar/:_id", (request, response)=>{
    rutasLotes.cargar(request, response)
})

index.delete("/lotes/eliminar", seguridadMDW.admin, (request, response)=>{
    rutasLotes.eliminar(request, response)
})

index.get("/lotes/cargarTodas", (request, response)=>{
    rutasLotes.cargarTodas(request, response)
})

index.get("/lotes/cargarId/:_id", (request, response)=>{
    rutasLotes.cargarId(request, response)
})

index.get("/lotes/cargarPorLugar/:lugar", (request, response)=>{
    rutasLotes.cargarPorLugar(request, response)
})

index.post("/lotes/guardar", seguridadMDW.admin, (request, response)=>{
    rutasLotes.guardar(request,response)
})

index.put("/lotes/actualizar", seguridadMDW.admin, (request, response)=>{
    rutasLotes.actualizar(request, response)
})

index.post("/lotes/titulos", (request, response)=>{
    rutasLotes.titulos(request, response)
})