var rutasUsuarios = require("../controllers/usuariosControllers.js").usuarios;
const seguridadMDW = require("../../middleware/seguridad.js").security


index.delete("/usuario/eliminar", seguridadMDW.admin, (request, response)=>{
    rutasUsuarios.eliminar(request, response)
})

index.get("/usuario/cargarTodas", (request, response)=>{
    rutasUsuarios.cargarTodas(request, response)
})

index.get("/usuario/cargarId/:_id", (request, response)=>{
    rutasUsuarios.cargarId(request, response)
})

index.post("/usuario/guardar", seguridadMDW.admin, (request, response)=>{
    rutasUsuarios.guardar(request,response)
})

index.put("/usuario/actualizar", seguridadMDW.admin, (request, response)=>{
    rutasUsuarios.actualizar(request, response)
})



index.post("/usuario/buscar", seguridadMDW.admin, (request, response)=>{
    rutasUsuarios.buscar(request, response)
})

index.get("/usuario/activar/:correo/:codigoReg", (request, response)=>{
    rutasUsuarios.activar(request, response)
})

index.post("/usuario/activar", (request, response)=>{
    rutasUsuarios.activar(request, response)
})

index.post("/usuario/registrar", (request, response)=>{
    rutasUsuarios.registrar(request, response)
})

index.post("/usuario/iniciar", (request, response)=>{
    rutasUsuarios.iniciar(request, response)
})

index.post("/usuario/estado", (request, response)=>{
    response.json(request.session)
})

index.post("/usuario/salir", (request, response)=>{
    request.session.destroy()
    response.json({estado:true, mensaje:"Sesión cerrada"})
})

index.put("/usuario/actualizarContrasena", (request, response)=>{
    rutasUsuarios.actualizarContrasena(request, response)
})

index.put("/usuario/actualizarDatos", (request, response)=>{
    rutasUsuarios.actualizarDatos(request, response)
})

index.post("/usuario/datos", (request, response)=>{
    rutasUsuarios.datos(request, response)
})

