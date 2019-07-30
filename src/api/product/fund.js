import request from '@utils/request';
import { handlerResponse } from '@utils/auth';

class FundService {
  static async getFundProducts(options) {
    try {
      const requestOptions = {
        url: '/fund-product/list',
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        data: options,
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default FundService;
