import request from '@utils/request';
import { handlerResponse } from '@utils/auth';

class CoinService {
  // 充值地址和信息
  static async getPurchaseCoinAddress() {
    try {
      const requestOptions = {
        url: '/wallet/deposit-info',
        method: 'get',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 可购买币种列表
  static async getCurrencyList() {
    try {
      const requestOptions = {
        url: '/otc/buy-info/currency-list',
        method: 'get',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 可购买币种价格
  static async getCurrencyPrice(type) {
    try {
      const requestOptions = {
        url: `/otc/buy-info/price/${type}`,
        method: 'get',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default CoinService;
