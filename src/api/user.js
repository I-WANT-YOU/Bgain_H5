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

  // 用户是否签到
  static async getUserIsSignIn() {
    try {
      const requestOptions = {
        url: '/membership/sign',
        method: 'post',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 用户一键授权
  static async toGrantAuthorization() {
    try {
      const requestOptions = {
        url: '/otc-kyc/do-kyc-post',
        method: 'post',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 邀友返利
  static async getReferInfo() {
    try {
      const requestOptions = {
        url: '/user/get-refer-info',
        method: 'get',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 资金记录
  static async getAssetRecord() {
    try {
      const requestOptions = {
        url: '/balance/get-user-balance-transfer-details',
        method: 'post',
        data: {
          currency: '',
          start_date: 0,
          end_date: 0,
        },
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default UserService;
