"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
function response(res, status, error, message, data) {
    let resultPrint = {};
    resultPrint.status = status || 200;
    resultPrint.error = error || false;
    resultPrint.message = message || 'Ok.';
    if (data) {
        resultPrint.data = data;
    }
    return res.status(resultPrint.status).json(resultPrint);
}
exports.response = response;
//# sourceMappingURL=response.js.map