"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllerProductor_1 = require("../controllers/controllerProductor");
/*import isAdmin from "../middlewares/admin";*/
const productoresRoutes = (app) => {
    const router = (0, express_1.Router)();
    app.use('/', router);
    router.get('/obtenerProductores', /*isAdmin,*/ controllerProductor_1.obtenerProductores);
    router.get('/obtenerProductor/:id', controllerProductor_1.obtenerProductor);
    router.post('/agregarProductor', controllerProductor_1.agregarProductor);
    router.put('/actualizarProductor/:id', controllerProductor_1.actualizarProductor);
    router.delete('/eliminarProductor/:id', controllerProductor_1.eliminarProductor);
    router.post('/iniciarSesionProductor', controllerProductor_1.iniciarSesion);
};
// uso export para que pueda exportar y luego en .appts se pueda importar
exports.default = productoresRoutes;
//# sourceMappingURL=productores.js.map