"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerProductoAdmins = exports.obtenerProductosAdmins = exports.actualizarProductoAdmins = exports.agregarProductoAdmins = exports.eliminarProducto = void 0;
const mysql_service_1 = __importDefault(require("../services/mysql.service"));
const obtenerProductoAdmins = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const response = yield (0, mysql_service_1.default)(`SELECT * FROM producto where id_producto = ${id}`);
        const data = {
            message: `${response.length} datos encontrados`,
            data: response.length > 0 ? response[0] : null
        };
        res.json(data);
    }
    catch (error) {
        next(error);
    }
});
exports.obtenerProductoAdmins = obtenerProductoAdmins;
const obtenerProductosAdmins = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mysql_service_1.default)('SELECT * FROM producto').then(response => {
        const data = {
            message: `${response.length} datos encontrados`,
            data: response.length > 0 ? response : null
        };
        res.json(data);
    }).catch(error => {
        next(error);
    });
});
exports.obtenerProductosAdmins = obtenerProductosAdmins;
const actualizarProductoAdmins = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_producto, categoria_producto, precio, id_productor } = req.body;
    const { id } = req.params;
    (0, mysql_service_1.default)(`UPDATE producto SET nombre_producto = '${nombre_producto}',
                                    categoria_producto = '${categoria_producto}'
                                    precio = '${precio}',
                                    id_productor = '${id_productor}'
                                    WHERE id_producto = '${id}'`)
        .then((response) => {
        console.log(response);
        res.json({ message: response.affectedRows > 0 ? 'updated' : `No existe registro con id: ${req.params.id}` });
    }).catch((error) => {
        next(error);
    });
});
exports.actualizarProductoAdmins = actualizarProductoAdmins;
const agregarProductoAdmins = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_producto, categoria_producto, precio, id_productor } = req.body;
    try {
        const response = yield (0, mysql_service_1.default)(`INSERT INTO producto
      (
        nombre_producto,
        categoria_producto,
        precio,
        id_productor
      ) VALUES
      (
        '${nombre_producto}',
        '${categoria_producto}',
        '${precio}',
        '${id_productor}'
      )
        `);
        res.status(201).json({
            message: 'created',
            id: response.insertId
        });
    }
    catch (error) {
        next(error);
    }
});
exports.agregarProductoAdmins = agregarProductoAdmins;
const eliminarProducto = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, mysql_service_1.default)(`DELETE FROM producto WHERE id_producto = '${req.params.id}'`).then((response) => {
        res
            .json({
            message: response.affectedRows > 0 ? `deleted` : 'No existe registro con id: ${req.params.id}'
        });
    }).catch((error) => {
        next(error);
    });
});
exports.eliminarProducto = eliminarProducto;
//# sourceMappingURL=controllerProducto.js.map