var rutasUsuarios = require("../controllers/usuariosControllers.js").usuarios;
const seguridadMDW = require("../../middleware/seguridad.js").security


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

index.post("/usuario/guardar", seguridadMDW.admin, (request, response)=>{
    rutasUsuarios.guardar(request,response)
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

index.get("/usuario/cargarId/:_id",(request, response)=>{
    rutasUsuarios.cargarId(request, response)
})

index.post("/usuario/actualizar", (request, response)=>{
    rutasUsuarios.actualizar(request, response)
})