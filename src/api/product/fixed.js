import request from '@utils/request';
import { handlerResponse } from '@utils/auth';

class FixedService {
  static async getAllFixedProduct() {
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

  static async getFixedProductById(productId) {
    try {
      const requestOptions = {
        url: '/product/get-product-details',
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        data: {
          product_id: productId,
        },
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getFixedBuyInfo(id) {
    try {
      const requestOptions = {
        url: `/product/purchase-info/${id}`,
        method: 'get',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async buyFixedProduct(options) {
    try {
      const requestOptions = {
        url: '/trade/buy',
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

  static async getAvailableCoupons(options) {
    try {
      const requestOptions = {
        url: '/coupon/get-available-coupons',
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

export default FixedService;
