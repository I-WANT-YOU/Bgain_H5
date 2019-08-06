import request from '@utils/request';
import { handlerResponse } from '@utils/auth';

class HomeService {
  static async getAllHomeInfo() {
    try {
      const requestOptions = {
        url: '/index/get-index',
        method: 'get',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getRecord() {
    try {
      const requestOptions = {
        url: '/wallet/get-deposit-record',
        method: 'post',
      }
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default HomeService;
