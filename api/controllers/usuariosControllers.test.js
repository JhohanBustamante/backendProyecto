const mongoose = require("mongoose")
global.config = require("../../config.js").config;
const usuariosController = require("./usuariosControllers.js").usuarios

describe("Post: /usuario/guardar", () => {
    let request, response

    beforeAll((done) => {
        // conexion a la bd

        mongoose
            .connect("mongodb://127.0.0.1:27017/" + config.bd)
            .then((respuesta) => {
                console.log("conexión correcta a mongo");
                done()
            })
            .catch((error) => {
                console.log(error);
            });
    })
    beforeEach(() => {
        request = { body: {} }
        response = {
            json: jest.fn().mockReturnThis()
        }
    })
    // test("debe sumar dos numeros", (done) => {
    //     var a = 5
    //     var b = 6
    //     expect(a + b).toBe(11)
    //     done()
    // })

    test("test", (done) => {

        request.body.nombre = "",
        request.body.apellido = "",
        request.body.correo = "",
        request.body.contrasena = "",
        request.body.estado = "",
        request.body.rol = ""


        usuariosController.guardar(request, response)
        expect(response.json).toHaveBeenCalledWith({
            estado: false,
            mensaje: "Ingresa correo, contraseña, nombre y apellido",
        })
        done()
    })
})