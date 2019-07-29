import request from '@utils/request';
import { handlerResponse } from '@utils/auth';

class FixedService {
  static async getFixedProducts() {
    try {
      const requestOptions = {
        url: '/product/list-all-products',
        method: 'get',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default FixedService;
