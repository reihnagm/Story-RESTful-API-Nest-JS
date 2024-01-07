import * as moment from 'moment';
import { extname } from 'path';

export class Utils {
    static response(response: any, status: number, error: boolean, message: string, data: any) {
        if(Array.isArray(data)) {
            let resultPrint = {
                status: status || 200,
                error: error || false,
                message: message || 'Ok',
                data: data ? data : []
            }
            return response.status(resultPrint.status).json(resultPrint)
        } else if(data == null) {
            let resultPrint = {
                status: status || 200,
                error: error || false,
                message: message || 'Ok',  
            }
            return response.status(resultPrint.status).json(resultPrint)
        } else {
            let resultPrint = {
                status: status || 200,
                error: error || false,
                message: message || 'Ok',
                data: data
            }
            return response.status(resultPrint.status).json(resultPrint)
        }
    }

    static fdate (date: Date): String {
        return moment(date).locale('id').format('dddd, d MMMM YYYY')
    }

    static formatYearAndMonth(date: Date): String {
        return moment(date).locale('id').format('yyyy/MM')
    }

    static formatDate (date: Date): String {
        return moment(date).locale('id').format('yyyy/MM/DD')
    }

    // formatDateTimeAgo: (date) => {
    //     return moment(date).locale('en').fromNow()
    // },

    // formatDateWithSubtractDays: (date, d) => {
    //     return moment(date).subtract(d, 'days').locale('id').format('yyyy/MM/DD')
    // },

    // formatDateWithSeconds: (date) => {
    //     return moment(date).locale('id').format('yyyy/MM/DD H:mm:ss')
    // },

    static isImage (ext: string) {
        switch (ext) {
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
            case 'svg':
            return true
        }
        return false
    }

    static slug (val: string, isUnique: boolean, markUnique: string) {
        return isUnique ? `${val.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'')}-${markUnique}`
            : `${val.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'')}`
    }

    static terbilang(angka: any) {
		var bilne=["","satu","dua","tiga","empat","lima","enam","tujuh","delapan","sembilan","sepuluh","sebelas"];
		if(angka < 12){
			return bilne[angka];
		}else if(angka < 20){
			return Utils.terbilang(angka-10)+" belas";
		}else if(angka < 100){
			return Utils.terbilang(Math.floor(parseInt(angka)/10))+" puluh "+Utils.terbilang(parseInt(angka)%10);
		}else if(angka < 200){
			return "seratus "+Utils.terbilang(parseInt(angka)-100);
		}else if(angka < 1000){
			return Utils.terbilang(Math.floor(parseInt(angka)/100))+" ratus "+Utils.terbilang(parseInt(angka)%100);
		}else if(angka < 2000){
			return "seribu "+Utils.terbilang(parseInt(angka)-1000);
		}else if(angka < 1000000){
			return Utils.terbilang(Math.floor(parseInt(angka)/1000))+" ribu "+Utils.terbilang(parseInt(angka)%1000);
		}else if(angka < 1000000000){
			return Utils.terbilang(Math.floor(parseInt(angka)/1000000))+" juta "+Utils.terbilang(parseInt(angka)%1000000);
		}else if(angka < 1000000000000){
			return Utils.terbilang(Math.floor(parseInt(angka)/1000000000))+" milyar "+Utils.terbilang(parseInt(angka)%1000000000);
		}else if(angka < 1000000000000000){
			return Utils.terbilang(Math.floor(parseInt(angka)/1000000000000))+" trilyun "+Utils.terbilang(parseInt(angka)%1000000000000);
		}
	}

    static customFilename = (_: any, file: { originalname: string; }, callback: (arg0: any, arg1: string) => void) => {
        const name = file.originalname.split('.')[0];
        const fileExtName = extname(file.originalname);
        const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
        callback(null, `${name}-${randomName}${fileExtName}`);
    };
}

