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
const express_1 = __importDefault(require("express"));
const cliente_1 = __importDefault(require("./routes/cliente"));
const productores_1 = __importDefault(require("./routes/productores"));
const producto_1 = __importDefault(require("./routes/producto"));
const factura_1 = __importDefault(require("./routes/factura"));
const config_1 = __importDefault(require("./config/config"));
const erros_1 = __importDefault(require("./middlewares/erros"));
/*import isAdmin from './middlewares/admin';*/
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
(0, cliente_1.default)(app);
(0, productores_1.default)(app);
(0, producto_1.default)(app);
(0, factura_1.default)(app);
app.use(erros_1.default);
app.get('/prueba/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(404).json({ message: "todo ok. :)" });
}));
app.listen(config_1.default.PORT, () => {
    return console.log(`servidor corriendo en el puerto ${config_1.default.PORT}`);
});
//# sourceMappingURL=app.js.map