const lotesModels = require("../models/lotesModels.js").lotesModels;
const lugaresModels = require("../models/lugaresModels.js").lugaresModels;
const validacion = require("../validations/lugaresValidations.js").validacion;
const lotesControllers = {};

lotesControllers.cargar = (request, response) => {
    lotesModels.cargar(request.params, (resultado) => {
        console.log(request.params);
        response.json(resultado);
    });
};

lotesControllers.buscar = (request, response) => {
    post = {
        correo: request.body.correo.toLowerCase(),
    };
    lotesModels.buscar(post, (resultado) => {
        if (resultado.length == 0) {
            response.json({ estado: false, mensaje: "credenciales" });
        } else if (resultado[0].estado == "inactivo") {
            response.json({ estado: false, mensaje: "Usuario inactivo" });
        } else {
            response.json({ estado: true, valor: resultado[0] });
        }
    });
};

lotesControllers.titulos = (request, response) => {
    post = {
    };
    lotesModels.titulos(post, (resultado) => {
        if (resultado.length == 0) {
            response.json({ estado: false, mensaje: "No hay titulos" });
        } else {
            response.json({ estado: true, valor: resultado });
        }
    });
};



lotesControllers.cargarId = (request, response) => {
    post = {
        _id: request.params._id
    }
    if (post._id == "" || post._id == undefined || post._id == null) {
        response.json({ estado: false, mensaje: "_id no cargado" })
    } else if (post._id.length !== 24) {
        response.json({ estado: false, mensaje: "Cantidad de caracteres erroneo" })
    } else {
        lotesModels.cargarId(post, (resultado) => {
            response.json({ estado: true, datos: resultado })
        })
    }
}


lotesControllers.cargarPorLugar = (request, response) => {
    post = {
        lugar: request.params.lugar
    }
    if(post.lugar=="", post.lugar==undefined, post.lugar==null){
        response.json({estado:false, mensaje:"Lugar no cargado"})
    } else {
        lotesModels.cargarPorlugar(post, (resultado)=>{
            response.json({estado:true, datos:resultado})
        })
    }
}

lotesControllers.cargarTodas = (request, response) => {
    lotesModels.cargarTodas((resultado) => {
        response.json({ estado: true, datos: resultado })
    })
}

lotesControllers.actualizar = (request, response) => {
    post = {
        _id: request.body._id,
        titulo: request.body.titulo,
        metrosCuadrados: request.body.metrosCuadrados,
        descripcion: request.body.descripcion,
        precioMetroCuadrado: request.body.precioMetroCuadrado,
        lugar: request.body.lugar
    }
    
    post.precioMetroCuadrado = parseInt(post.precioMetroCuadrado)
    post.metrosCuadrados = parseInt(post.metrosCuadrados)
    post.precio = post.precioMetroCuadrado * post.metrosCuadrados
    console.log(post)
    lugaresModels.cargarId({_id: post.lugar}, (resultado) => {
        post.lugarNombre = resultado.datos.titulo
        lotesModels.actualizar(post, (resultado) => {
            response.json({ estado: true, mensaje: "Actualizado" })
        })
    })

}

lotesControllers.eliminar = (request, response) => {
    post = {
        _id: request.body._id
    }
    if (post._id.length !== 24) {
        response.json({ estado: false, mensaje: "Datos invalidos" })
    } else {
        lotesModels.cargarId(post, (resultado) => {
            if (resultado.datos == null) {
                response.json({ estado: false, mensaje: "No hay usuarios con ese _id" })
            } else {
                lotesModels.eliminar(post, (resultado) => {
                    response.json({ estado: true, mensaje: "Eliminado" })
                })
            }
        })
    }
}

lotesControllers.guardar = (request, response) => {
    const post = {
        titulo: request.body.titulo,
        metrosCuadrados: request.body.metrosCuadrados,
        descripcion: request.body.descripcion,
        precioMetroCuadrado: request.body.precioMetroCuadrado,
        lugar: request.body.lugar
    };

    if (validacion.datos(post) !== true) {
        response.json({ estado: false, mensaje: validacion.datos(post) })
    } else {
        post.precioMetroCuadrado = parseInt(post.precioMetroCuadrado)
        post.metrosCuadrados = parseInt(post.metrosCuadrados)
        post.precio = post.precioMetroCuadrado * post.metrosCuadrados

        lugaresModels.cargarId({_id: post.lugar}, (resultado) => {
            post.lugarNombre = resultado.datos.titulo
            lotesModels.guardar(post, (respuesta) => {
                if (respuesta.estado == false) {
                    response.json({ estado: false, mensaje: "Error al guardar" });
                    return false;
                } else {
                    response.json({ estado: true, respuesta });
                }
            });
        })
    }
}

module.exports.lotes = lotesControllers;
