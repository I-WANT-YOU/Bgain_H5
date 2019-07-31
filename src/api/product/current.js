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
}

export default CurrentService;
