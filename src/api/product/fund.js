import request from '@utils/request';
import { handlerResponse } from '@utils/auth';

class FundService {
  static async getFundProducts(options) {
    try {
      const requestOptions = {
        url: '/fund-product/list',
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

  static async getFundProductDetail(id) {
    try {
      const requestOptions = {
        url: '/fund/fund-details',
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

  static async getFundBuyInfo(id) {
    try {
      const requestOptions = {
        url: `/fund-product-order/get-fund-buy-info/${id}`,
        headers: { 'Content-Type': 'application/json' },
        method: 'get',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getHoldingFunds() {
    try {
      const requestOptions = {
        url: '/fund/owner-fund',
        method: 'get',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async buyFund(options) {
    try {
      const requestOptions = {
        url: '/fund-product-order/buy',
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

  static async getFundTradeRules(id) {
    try {
      const requestOptions = {
        url: `/fund-product/trade-rules/${id}`,
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getFundInformation(id) {
    try {
      const requestOptions = {
        url: `/fund/fund-information/${id}`,
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default FundService;
