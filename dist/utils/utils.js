"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
class Utils {
    static response(response, status, error, message, data) {
        if (Array.isArray(data)) {
            let resultPrint = {
                status: status || 200,
                error: error || false,
                message: message || 'Ok',
                count: data.length,
                data: data ? data : []
            };
            return response.status(resultPrint.status).json(resultPrint);
        }
        else if (data == null) {
            let resultPrint = {
                status: status || 200,
                error: error || false,
                message: message || 'Ok',
            };
            return response.status(resultPrint.status).json(resultPrint);
        }
        else {
            let resultPrint = {
                status: status || 200,
                error: error || false,
                message: message || 'Ok',
                data: data
            };
            return response.status(resultPrint.status).json(resultPrint);
        }
    }
}
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map