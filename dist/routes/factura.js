"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllerFactura_1 = require("../controllers/controllerFactura");
const controllerFactura_2 = require("../controllers/controllerFactura");
const controllerFactura_3 = require("../controllers/controllerFactura");
/*import isAdmin from "../middlewares/admin";*/
const facturaRoutes = (app) => {
    const router = (0, express_1.Router)();
    app.use('/', router);
    router.get('/obtenerFacturas', /*isAdmin,*/ controllerFactura_1.obtenerFacturas);
    router.get('/obtenerFactura/:id', controllerFactura_1.obtenerFactura);
    router.delete('/eliminarFactura/:id', controllerFactura_2.eliminarFactura);
    router.post('/agregarFactura', controllerFactura_2.agregarFactura);
    router.put('/actualizarFactura/:id', controllerFactura_3.actualizarFactura);
};
exports.default = facturaRoutes;
//# sourceMappingURL=factura.js.map