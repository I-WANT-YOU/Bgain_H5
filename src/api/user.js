import request from '@utils/request';
import { handlerResponse, handlerSuccessResponseV3 } from '@utils/auth';

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

  static async submitOTC(options) {
    try {
      const requestOptions = {
        url: '/otc-kyc/do-kyc',
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

  static async getOTCInfo() {
    try {
      const requestOptions = {
        url: '/otc-kyc/get-otc-kyc-info',
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

  // ??????????????????
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

  // ??????????????????
  static async toGrantAuthorization() {
    try {
      const requestOptions = {
        url: '/otc-kyc/do-kyc-post',
        method: 'post',
      };
      const response = await request(requestOptions);
      console.log(response);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // ????????????
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

  // ????????????
  static async getTransferDetails(currency) {
    try {
      const requestOptions = {
        url: '/balance/get-user-balance-transfer-details',
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        data: {
          currency,
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

  // ?????????
  static async getUserCouponList() {
    try {
      const requestOptions = {
        url: '/coupon/fetch-user-coupon-list',
        method: 'post',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // ????????? ???????????????
  static async getActiveVerificationCode(params) {
    try {
      const requestOptions = {
        url: '/auth/send-token',
        method: 'post',
        data: params,
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // ????????? ???????????????????????????
  static async postRedeemCode(params) {
    try {
      const requestOptions = {
        url: '/ticket/check',
        method: 'post',
        data: params,
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // ????????? ????????????
  static async codeExchange(params) {
    try {
      const requestOptions = {
        url: '/ticket/receive',
        method: 'post',
        data: params,
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // ????????? ???????????????????????????
  static async getUserNameInfo(params) {
    try {
      const requestOptions = {
        url: '/auth/valide-register-name',
        method: 'post',
        data: params,
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  /*
  * KYC OTC ????????????????????????
  * */
  static async checkOtcUserName(userName) {
    try {
      const requestOptions = {
        url: '/otc-kyc/check-username',
        method: 'post',
        data: userName,
      };
      const response = await request(requestOptions);
      return handlerSuccessResponseV3(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async checkUserOtcId(params) {
    try {
      const requestOptions = {
        url: '/otc-kyc/check-id-number',
        method: 'post',
        data: params,
      };
      const response = await request(requestOptions);
      return handlerSuccessResponseV3(response);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default UserService;
