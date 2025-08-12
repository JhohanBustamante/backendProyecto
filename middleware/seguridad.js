const security = {}

security.admin = (request, response, next) => {
    let rol = request.session.rol
    if(rol==undefined || rol == null || rol == ""){
        response.json({estado:false, mensaje:"Debes iniciar sesión"});
        return false;
    }
    else {
        if(rol != "Administrador"){
            response.json({estado:false, mensaje:"No tienes acceso a esta API"});
            return false;
        } else {
            next()
        }   
    }
}


module.exports.security = security