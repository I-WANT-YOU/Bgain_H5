import request from '@utils/request';
import { handlerResponse } from '@utils/auth';

class UserService {
  static async getUserSummary() {
    try {
      const requestOptions = {
        url: '/user/get-user-summary',
        method: 'get',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getUserBalanceSummary() {
    try {
      const requestOptions = {
        url: '/balance/get-user-balance-summary',
        method: 'get',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default UserService;
