"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = exports.ResponseOk = void 0;
const moment = require("moment");
const path_1 = require("path");
class ResponseOk {
    constructor(response, status, error, message, data) {
        this.response = response;
        this.status = status;
        this.error = error;
        this.message = message;
        this.data = data;
        if (Array.isArray(this.data)) {
            let resultPrint = {
                status: this.status || 200,
                error: this.error || false,
                message: this.message || 'Ok',
                data: this.data ? this.data : []
            };
            return this.response.status(resultPrint.status).json(resultPrint);
        }
        else if (data == null) {
            let resultPrint = {
                status: this.status || 200,
                error: this.error || false,
                message: this.message || 'Ok',
            };
            return this.response.status(resultPrint.status).json(resultPrint);
        }
        else {
            let resultPrint = {
                status: this.status || 200,
                error: this.error || false,
                message: this.message || 'Ok',
                data: this.data
            };
            return this.response.status(resultPrint.status).json(resultPrint);
        }
    }
}
exports.ResponseOk = ResponseOk;
class Utils {
    static response(response, status, error, message, data) {
        if (Array.isArray(data)) {
            let resultPrint = {
                status: status || 200,
                error: error || false,
                message: message || 'Ok',
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
    static fdate(date) {
        return moment(date).locale('id').format('dddd, d MMMM YYYY');
    }
    static formatYearAndMonth(date) {
        return moment(date).locale('id').format('yyyy/MM');
    }
    static formatDate(date) {
        return moment(date).locale('id').format('yyyy/MM/DD');
    }
    static formatDateTimeAgo(date) {
        return moment(date).locale('en').fromNow();
    }
    static formatDateWithSubtractDays(date) {
        return moment(date).subtract(1, 'days').locale('id').format('yyyy/MM/DD');
    }
    static formatDateWithSeconds(date) {
        return moment(date).locale('id').format('yyyy/MM/DD HH:mm:ss');
    }
    static isImage(ext) {
        switch (ext) {
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
            case 'svg':
                return true;
        }
        return false;
    }
    static slug(val, isUnique, markUnique) {
        return isUnique ? `${val.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}-${markUnique}`
            : `${val.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}`;
    }
    static terbilang(angka) {
        var bilne = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas"];
        if (angka < 12) {
            return bilne[angka];
        }
        else if (angka < 20) {
            return Utils.terbilang(angka - 10) + " belas";
        }
        else if (angka < 100) {
            return Utils.terbilang(Math.floor(parseInt(angka) / 10)) + " puluh " + Utils.terbilang(parseInt(angka) % 10);
        }
        else if (angka < 200) {
            return "seratus " + Utils.terbilang(parseInt(angka) - 100);
        }
        else if (angka < 1000) {
            return Utils.terbilang(Math.floor(parseInt(angka) / 100)) + " ratus " + Utils.terbilang(parseInt(angka) % 100);
        }
        else if (angka < 2000) {
            return "seribu " + Utils.terbilang(parseInt(angka) - 1000);
        }
        else if (angka < 1000000) {
            return Utils.terbilang(Math.floor(parseInt(angka) / 1000)) + " ribu " + Utils.terbilang(parseInt(angka) % 1000);
        }
        else if (angka < 1000000000) {
            return Utils.terbilang(Math.floor(parseInt(angka) / 1000000)) + " juta " + Utils.terbilang(parseInt(angka) % 1000000);
        }
        else if (angka < 1000000000000) {
            return Utils.terbilang(Math.floor(parseInt(angka) / 1000000000)) + " milyar " + Utils.terbilang(parseInt(angka) % 1000000000);
        }
        else if (angka < 1000000000000000) {
            return Utils.terbilang(Math.floor(parseInt(angka) / 1000000000000)) + " trilyun " + Utils.terbilang(parseInt(angka) % 1000000000000);
        }
    }
}
exports.Utils = Utils;
Utils.customFilename = (_, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = (0, path_1.extname)(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};
//# sourceMappingURL=utils.js.map