const validaciones = {}

const datosNoPermitidos = ["", null, undefined]
let llaves = []
let existencia


validaciones.datos = (post) => {
    llaves = Object.keys(post)
    
    if (llaves.length == 0) return "vacio"
    else {
        for (i = 0; i < llaves.length; i++) {
            existencia = datosNoPermitidos.findIndex(item => item == post[llaves[i]])
            if(llaves[i]=='codigo') {
                continue
            }
            if (existencia !== -1) return "Ingresar valor: " + llaves[i]
        }
        return true;
    }
}


module.exports.validacion = validaciones