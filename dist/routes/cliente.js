"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllerCliente_1 = require("../controllers/controllerCliente");
/*import isAdmin from "../middlewares/admin";*/
const clienteRoutes = (app) => {
    const router = (0, express_1.Router)();
    app.use('/', router);
    router.get('/obtenerClientes', /*isAdmin,*/ controllerCliente_1.obtenerClientes);
    router.get('/obtenerClienteId/:id', controllerCliente_1.obtenerClienteId);
    router.get('/obtenerClienteEmail/:email', controllerCliente_1.obtenerClienteEmail);
    router.post('/agregarCliente', controllerCliente_1.agregarCliente);
    router.put('/actualizarCliente/:id', controllerCliente_1.actualizarCliente);
    router.delete('/eliminarCliente/:id', controllerCliente_1.eliminarCliente);
    router.post('/iniciarSesionCliente', controllerCliente_1.iniciarSesion);
};
exports.default = clienteRoutes;
//# sourceMappingURL=cliente.js.map