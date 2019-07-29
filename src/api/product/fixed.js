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
}

export default FixedService;
