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

  static async submitKyc(options) {
    try {
      const requestOptions = {
        url: '/user/do-kyc',
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

  static async getKycInfo() {
    try {
      const requestOptions = {
        url: '/user/get-kyc-info',
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
