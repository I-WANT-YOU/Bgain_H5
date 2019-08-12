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

  // 生成订单信息 getOrderInfoById
  static async generateOrderInfo(orderInfo) {
    try {
      const requestOptions = {
        url: '/otc/buy-info/pay-type',
        method: 'post',
        data: orderInfo,
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 根据订单ID查询订单
  static async getOrderInfoById(orderId) {
    try {
      const requestOptions = {
        url: `/otc/query-order-detail/${orderId}`,
        method: 'get',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 查询订单列表
  static async getOrderList() {
    try {
      const requestOptions = {
        url: '/otc/query-order-list',
        method: 'get',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  //  选择支付方式页面 进行订单提交
  static async submitOrder(payType) {
    try {
      const requestOptions = {
        url: '/otc/buy-info/check-pay-type',
        method: 'post',
        data: payType,
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 用户提交申诉
  static async postAppealingInfo(userAppeal) {
    try {
      const requestOptions = {
        url: '/otc/appeal',
        method: 'post',
        data: userAppeal,
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default CoinService;
