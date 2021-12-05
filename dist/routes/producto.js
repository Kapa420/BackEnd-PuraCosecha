"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllerProducto_1 = require("../controllers/controllerProducto");
/*import isAdmin from "../middlewares/admin";*/
const productoRoutes = (app) => {
    const router = (0, express_1.Router)();
    app.use('/', router);
    router.get('/obtenerProductosAdmins', /*isAdmin,*/ controllerProducto_1.obtenerProductosAdmins);
    router.get('/obtenerProductoAdmins/:id', controllerProducto_1.obtenerProductoAdmins);
    router.post('/agregarProductoAdmins', controllerProducto_1.agregarProductoAdmins);
    router.put('/actualizarProductoAdmins/:id', controllerProducto_1.actualizarProductoAdmins);
    router.delete('/eliminarProducto/:id', controllerProducto_1.eliminarProducto);
};
// uso export para que pueda exportar y luego en .appts se pueda importar
exports.default = productoRoutes;
//# sourceMappingURL=producto.js.map