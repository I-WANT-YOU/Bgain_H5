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
}

export default HomeService;
