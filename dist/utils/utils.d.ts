export declare class CResponse {
    private response;
    private status;
    private error;
    private message;
    private data;
    constructor(response: any, status: number, error: boolean, message: string, data: any);
}
export declare class JwtDecode {
    readonly auth: any;
    constructor(auth: any);
}
export declare class Utils {
    static response(response: any, status: number, error: boolean, message: string, data: any): any;
    static fdate(date: Date): String;
    static formatYearAndMonth(date: Date): String;
    static formatDate(date: Date): String;
    static formatDateTimeAgo(date: Date): String;
    static formatDateWithSubtractDays(date: Date): String;
    static formatDateWithSeconds(date: Date): String;
    static isImage(ext: string): boolean;
    static slug(val: string, isUnique: boolean, markUnique: string): string;
    static terbilang(angka: any): any;
    static customFilename: (_: any, file: {
        originalname: string;
    }, callback: (arg0: any, arg1: string) => void) => void;
}
