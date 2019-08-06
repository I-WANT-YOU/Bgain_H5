import request from '@utils/request';
import { handlerResponse } from '@utils/auth';

class CurrentService {
  static async getAllCurrentProduct() {
    try {
      const requestOptions = {
        url: '/current/profit-detail',
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getCurrentTradeRecords() {
    try {
      const requestOptions = {
        url: '/current/list-order',
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getHistoryInterestRate(currency) {
    try {
      const requestOptions = {
        url: '/current/history-interest-rate',
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        data: {
          currency_type: currency,
        },
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getHistoryProfit(currency) {
    try {
      const requestOptions = {
        url: '/current/history-profit',
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        data: {
          currency_type: currency,
        },
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getCurrentBuyInfo(currency) {
    try {
      const requestOptions = {
        url: '/current/buy-info',
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        data: {
          currency_type: currency,
        },
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getCurrentSellInfo(currency) {
    try {
      const requestOptions = {
        url: '/current/sell-info',
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        data: {
          currency_type: currency,
        },
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async buyCurrentProduct({ amount, currency, password }) {
    try {
      const requestOptions = {
        url: '/trade/buy',
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        data: {
          amount,
          amount_currency: currency,
          auto_transfer_in: false,
          group_id: 0,
          payment_currency: currency,
          payment_password: password,
          product_id: 0,
          product_type: 'current_income',
          user_coupon_id: 0,
        },
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async sellCurrentProduct({ amount, currency, password }) {
    try {
      const requestOptions = {
        url: '/trade/sell',
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        data: {
          trade_type: 'sell',
          amount,
          payment_currency: currency,
          payment_password: password,
          product_type: 'current_income',
        },
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default CurrentService;
