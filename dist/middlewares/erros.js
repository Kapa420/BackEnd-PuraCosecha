"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (error, req, res, next) => {
    console.log(error);
    const message = error.message || error.sqlMessage;
    res.status(error.status || 500);
    res.json({ message: message || 'Internal server error' });
};
exports.default = errorHandler;
//# sourceMappingURL=erros.js.map