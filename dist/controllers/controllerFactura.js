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
exports.actualizarFactura = exports.agregarFactura = exports.eliminarFactura = exports.obtenerFacturas = exports.obtenerFactura = void 0;
const mysql_service_1 = __importDefault(require("../services/mysql.service"));
const obtenerFactura = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const response = yield (0, mysql_service_1.default)(`SELECT factura.id_factura,
              cliente.nombre,
              cliente.apellido,
              factura.fecha as Fecha_compra
      FROM factura
      INNER JOIN cliente
      ON factura.id_cliente = cliente.id_cliente
      WHERE id_factura = ${id}
      ORDER BY factura.id_factura`);
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
exports.obtenerFactura = obtenerFactura;
const obtenerFacturas = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mysql_service_1.default)(`SELECT factura.id_factura,
            cliente.nombre,
            cliente.apellido,
            factura.fecha as Fecha_compra
    FROM factura
    INNER JOIN cliente
    ON factura.id_cliente = cliente.id_cliente
    ORDER BY factura.id_factura`).then(response => {
        const data = {
            message: `${response.length} datos encontrados`,
            data: response.length > 0 ? response : null
        };
        res.json(data);
    }).catch(error => {
        next(error);
    });
});
exports.obtenerFacturas = obtenerFacturas;
const eliminarFactura = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, mysql_service_1.default)(`DELETE FROM factura
                WHERE id_factura = '${req.params.id}'`).then((response) => {
        res.json({
            message: response.affectedRows > 0 ? `deleted` : 'No existe registro con id: ${req.params.id}'
        });
    }).catch((error) => {
        next(error);
    });
});
exports.eliminarFactura = eliminarFactura;
const agregarFactura = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_cliente, fecha } = req.body;
    try {
        const response = yield (0, mysql_service_1.default)(`INSERT INTO factura(id_factura, id_cliente, fecha)
      VALUES (NULL,'${id_cliente}','${fecha}')
      `);
        res.status(201).json({
            message: "created",
            id: response.insertId
        });
    }
    catch (error) {
        next(error);
    }
});
exports.agregarFactura = agregarFactura;
const actualizarFactura = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { id_cliente, fecha } = req.body;
    (0, mysql_service_1.default)(`
    UPDATE factura SET id_cliente = '${id_cliente}',
                       fecha = '${fecha}'
    WHERE id_factura = ${id}`).then((response) => {
        console.log(response);
        res.json({
            message: response.affectedRows > 0 ? 'updated' : `No existe registro con id: ${req.params.id}`
        });
    }).catch((error) => {
        next(error);
    });
});
exports.actualizarFactura = actualizarFactura;
//# sourceMappingURL=controllerFactura.js.map