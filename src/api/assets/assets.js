import request from '@utils/request';
import { handlerResponse } from '@utils/auth';

class AssetsService {
  // 获取用户总资产信息(总资产首页)
  static async getUserAssets() {
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

  // 获取用户资产交易记录
  static async getUserAssetsRecord(currencyType) {
    try {
      const requestOptions = {
        url: '/balance/get-user-balance-transfer-details',
        method: 'post',
        data: {
          currency: currencyType,
        },
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 获取用户资产可用余额信息
  static async getUserAvailableAssets() {
    try {
      const requestOptions = {
        url: '/balance/get-user-balance',
        method: 'get',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default AssetsService;
