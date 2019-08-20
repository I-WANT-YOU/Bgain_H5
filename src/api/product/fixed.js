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

  static async getUserPortfolio() {
    try {
      const requestOptions = {
        url: '/portfolio/get-user-portfolio',
        headers: { 'Content-Type': 'application/json' },
        method: 'get',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getUserPortfolioHistory() {
    try {
      const requestOptions = {
        url: '/portfolio/get-portfolio-history',
        headers: { 'Content-Type': 'application/json' },
        method: 'get',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 自动转入分币宝
  static async setAutoPortfolio(option) {
    try {
      const requestOptions = {
        url: '/portfolio/set-auto-transfer-in',
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        data: {
          auto_transfer_in: option.status,
          portfolio_id: option.id,
        },
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 我的定期资产详情
  static async getUsetFixedHoldingDetail(status) {
    try {
      const requestOptions = {
        url: `/my/cds/holding/${status}`,
        headers: { 'Content-Type': 'application/json' },
        method: 'get',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default FixedService;
