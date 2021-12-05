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
exports.iniciarSesion = exports.registrarCliente = exports.obtenerClientes = exports.obtenerClienteEmail = exports.obtenerClienteId = exports.actualizarCliente = exports.agregarCliente = exports.eliminarCliente = void 0;
const mysql_service_1 = __importDefault(require("../services/mysql.service"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const obtenerClienteId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const response = yield (0, mysql_service_1.default)(`
      SELECT * FROM cliente WHERE id_cliente = ${id}`);
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
exports.obtenerClienteId = obtenerClienteId;
const obtenerClienteEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    try {
        const response = yield (0, mysql_service_1.default)(`
    SELECT * FROM cliente WHERE email = "${email}"`);
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
exports.obtenerClienteEmail = obtenerClienteEmail;
const obtenerClientes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mysql_service_1.default)(`SELECT id_cliente,
              nombre,
              apellido,
              direccion,
              telefono,
              email,
              password
        FROM cliente`).then(response => {
        const data = {
            message: `${response.length} datos encontrados`,
            data: response.length > 0 ? response : null
        };
        res.json(data);
    }).catch(error => {
        next(error);
    });
});
exports.obtenerClientes = obtenerClientes;
const actualizarCliente = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, apellido, telefono, email, direccion, password } = req.body;
    const { id } = req.params;
    (0, mysql_service_1.default)(`UPDATE cliente SET nombre = '${nombre}',
                                   apellido = '${apellido}',
                                   direccion = '${direccion}',
                                   telefono = '${telefono}',
                                   email = '${email}',
                                   password = '${password}'
                                   WHERE id_cliente = '${id}'`).then((response) => {
        console.log(response);
        res.json({ message: response.affectedRows > 0 ? 'updated' : `No existe registro con id: ${req.params.id}` });
    }).catch((error) => {
        next(error);
    });
});
exports.actualizarCliente = actualizarCliente;
const agregarCliente = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, apellido, telefono, email, direccion, password } = req.body;
    try {
        const response = yield (0, mysql_service_1.default)(`INSERT INTO cliente
      (
        id_cliente,
        nombre,
        apellido,
        direccion,
        telefono,
        email,
        password
      ) VALUES
      (
        NULL,
        '${nombre}',
        '${apellido}',
        '${direccion}',
        '${telefono}',
        '${email}',
        '${password}')`);
        res.status(201).json({
            message: 'created',
            id: response.insertId
        });
    }
    catch (error) {
        next(error);
    }
});
exports.agregarCliente = agregarCliente;
const eliminarCliente = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, mysql_service_1.default)(`DELETE FROM cliente WHERE id_cliente = '${req.params.id}'`).then((response) => {
        res.json({
            message: response.affectedRows > 0 ? `deleted` : 'No existe registro con id: ${req.params.id}'
        });
    }).catch((error) => {
        next(error);
    });
});
exports.eliminarCliente = eliminarCliente;
const registrarCliente = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, apellido, direccion, telefono, email, password } = req.body;
    const existCliente = yield (0, mysql_service_1.default)(`SELECT * FROM cliente WHERE email = '${email}'`);
    if (existCliente.lenght > 0) {
        res.send("Ya existe el cliente");
    }
    else {
        const response = yield (0, mysql_service_1.default)(`INSERT INTO cliente
        (id_cliente, nombre, apellido, direccion, telefono,
          email, password ) VALUES
        (
          NULL, '${nombre}', '${apellido}', '${direccion}', '${telefono}',
          '${email}',   '${password}')`);
        res.status(201).json({
            message: 'Usuario Creado',
            id: response.insertId
        });
    }
});
exports.registrarCliente = registrarCliente;
const iniciarSesion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const dataUser = yield (0, mysql_service_1.default)(`SELECT * FROM cliente WHERE email = '${email}'`);
        if (dataUser.length > 0) {
            if (dataUser[0].password === password) {
                jsonwebtoken_1.default.sign(dataUser[0], 'Karen', (error, token) => {
                    if (error) {
                        next(error);
                    }
                    else {
                        res.json({
                            user: Object.assign(Object.assign({}, dataUser[0]), { token }),
                            statuscode: 2
                        });
                    }
                });
            }
            else {
                res.json({
                    message: "Contraseña incorrecta",
                    statuscode: 1
                });
            }
        }
        else {
            res.json({
                message: "No existe usuario",
                statuscode: 0
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.iniciarSesion = iniciarSesion;
//# sourceMappingURL=controllerCliente.js.map