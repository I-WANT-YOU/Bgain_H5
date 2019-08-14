import request from '@utils/request';
import { handlerResponse } from '@/utils/auth';

class ActivityService {
  static async sign() {
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

  // 获取首页列表
  static async getBgpProducts() {
    try {
      const requestOptions = {
        url: '/integral-product/list-on-sale',
        method: 'get',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  //  获取首页banner getBGPRecord
  static async getBanner() {
    try {
      const requestOptions = {
        url: '/integral-product/banners',
        method: 'get',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  //  获取历史记录列表
  static async getBGPRecord() {
    try {
      const requestOptions = {
        url: '/integral-product/buy-history',
        method: 'get',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  //  获取详情列表
  static async getBGPDetailList() {
    try {
      const requestOptions = {
        url: '/balance/get-user-balance-transfer-details',
        method: 'post',
        data: { currency: 'FBP' },
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getBgpProductDetail(id) {
    try {
      const requestOptions = {
        url: `/integral-product/product-details/${id}`,
        method: 'get',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async buyBgpProduct(id) {
    try {
      const requestOptions = {
        url: '/integral-product/buy',
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        data: {
          product_id: id,
        },
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getBuyProductResultByOrderId(id) {
    try {
      const requestOptions = {
        url: `/integral-product/order-details/${id}`,
        method: 'get',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // BGP 明细
  static async getBgpTransferDetails() {
    try {
      const requestOptions = {
        url: '/balance/get-user-balance-transfer-details',
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        data: {
          currency: 'FBP',
        },
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // BGP 兑换交易记录
  static async getBgpTransferHistory() {
    try {
      const requestOptions = {
        url: '/integral-product/buy-history',
        method: 'get',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 获取收货
  static async getAddressDetail() {
    try {
      const requestOptions = {
        url: '/address/address-detail',
        method: 'get',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 添加或更新收货地址
  static async addOrUpdateAddress(options) {
    try {
      const requestOptions = {
        url: '/address/insert-update-address',
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

export default ActivityService;
