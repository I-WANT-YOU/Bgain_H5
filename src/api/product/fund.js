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

  static async getFundOrderHistory(status) {
    try {
      const requestOptions = {
        url: '/fund-product-order/history',
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        data: {
          fund_order_status: status,
        },
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getFundOrderDetail(id) {
    try {
      const requestOptions = {
        url: `/fund-product-order/get-fund-order-detail/${id}`,
        headers: { 'Content-Type': 'application/json' },
        method: 'get',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getFundOwnerDetail(option) {
    try {
      const requestOptions = {
        url: '/fund/owner-fund-detail',
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        data: {
          fund_id: option.id,
          currency_type: option.currencyType,
        },
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async sellFund(options) {
    try {
      const requestOptions = {
        url: '/fund/fund-sell',
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

  static async sellFundDetail(option) {
    try {
      const requestOptions = {
        url: '/fund/fund-details-before-sell',
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        data: {
          fund_id: option.fundId,
          fund_user_stat_id: option.userId,
        },
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async cancelOrder(options) {
    try {
      const requestOptions = {
        url: '/fund-product-order/cancel',
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

export default FundService;
