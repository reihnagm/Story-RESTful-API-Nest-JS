export class Utils {
  static response(response: any, status: number, error: boolean, message: string, data: any) {
    if(Array.isArray(data)) {
      let resultPrint = {
        status: status || 200,
        error: error || false,
        message: message || 'Ok',
        count: data.length,  
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
}

