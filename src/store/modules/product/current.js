import { chain, get } from 'lodash';
import { CurrentService } from '@api/product';
import * as Auth from '@utils/auth';
import { formatDate } from '@utils/tools';
import * as types from '../../mutationTypes';

const state = {
  currencies: [],
  currents: [],
  tradeRecords: [],
  historyRates: {},
  historyProfit: {},
  buyInfo: {},
  sellInfo: {},
  buyResult: {},
  sellResult: {},
};

const getters = {
  getCurrentProductsByCurrency: ({ currents }) => currency => chain(currents)
    .filter(({ currency_type: type }) => currency === type)
    .head()
    .value(),
  historyProfitRateMax: ({ historyRates }) => Number(get(historyRates, 'history_profit_max', '0')),
  historyProfitRates: ({ historyRates }) => chain(historyRates)
    .get('history_profit_daily', [])
    .map(({ amount, date }) => ({
      amount,
      date: formatDate(date),
    }))
    .value(),
  historyProfitMax: ({ historyProfit }) => Number(get(historyProfit, 'history_profit_max', '0')),
  historyProfits: ({ historyProfit }) => chain(historyProfit)
    .get('history_profit_daily', [])
    .map(({ amount, date }) => ({
      amount,
      date: formatDate(date),
    }))
    .value(),
  minBuyAmount: ({ buyInfo }) => Number(get(buyInfo, 'current_buy_min', '0')),
  buyBalance: ({ buyInfo }) => Number(get(buyInfo, 'amount', '0')),
  maxSellAmount: ({ sellInfo }) => Number(get(sellInfo, 'amount', '0')),
  buyAmount: ({ buyResult }) => get(buyResult, 'amount', '0'),
  buyStartDate: ({ buyResult }) => get(buyResult, 'interestStartDate', 0),
};

const mutations = {
  [types.GET_ALL_CURRENT_PRODUCT](state, payload) {
    state.currents = payload;
  },
  [types.GET_CURRENT_CURRENCIES](state, payload) {
    state.currencies = payload;
  },
  [types.GET_CURRENT_TRADE_RECORDS](state, payload) {
    state.tradeRecords = payload;
  },
  [types.GET_HISTORY_INTEREST_RATE](state, payload) {
    state.historyRates = payload;
  },
  [types.GET_HISTORY_PROFIT](state, payload) {
    state.historyProfit = payload;
  },
  [types.GET_CURRENT_BUY_INFO](state, payload) {
    state.buyInfo = payload;
  },
  [types.GET_CURRENT_SELL_INFO](state, payload) {
    state.sellInfo = payload;
  },
  [types.GET_CURRENT_BUY_RESULT](state, payload) {
    state.buyResult = payload;
  },
};

const actions = {
  async getAllCurrentProduct({ commit }) {
    try {
      const response = await CurrentService.getAllCurrentProduct();
      const data = await Auth.handlerSuccessResponse(response);
      commit(types.GET_CURRENT_CURRENCIES, get(data, 'currency_type_list', []));
      commit(types.GET_ALL_CURRENT_PRODUCT, get(data, 'current_profit', []));
    } catch (error) {
      throw error;
    }
  },

  async getCurrentTradeRecords({ commit }) {
    try {
      const response = await CurrentService.getCurrentTradeRecords();
      const data = await Auth.handlerSuccessResponse(response);
      commit(types.GET_CURRENT_TRADE_RECORDS, get(data, 'current_orders', []));
    } catch (error) {
      throw error;
    }
  },

  async getHistoryInterestRate({ commit }, currency) {
    try {
      const response = await CurrentService.getHistoryInterestRate(currency);
      const data = await Auth.handlerSuccessResponse(response);
      commit(types.GET_HISTORY_INTEREST_RATE, data);
    } catch (error) {
      throw error;
    }
  },

  async getHistoryProfit({ commit }, currency) {
    try {
      const response = await CurrentService.getHistoryProfit(currency);
      const data = await Auth.handlerSuccessResponse(response);
      commit(types.GET_HISTORY_PROFIT, data);
    } catch (error) {
      throw error;
    }
  },

  async getCurrentBuyInfo({ commit }, currency) {
    try {
      const response = await CurrentService.getCurrentBuyInfo(currency);
      const data = await Auth.handlerSuccessResponse(response);
      commit(types.GET_CURRENT_BUY_INFO, data);
    } catch (error) {
      throw error;
    }
  },

  async getCurrentSellInfo({ commit }, currency) {
    try {
      const response = await CurrentService.getCurrentSellInfo(currency);
      const data = await Auth.handlerSuccessResponse(response);
      commit(types.GET_CURRENT_SELL_INFO, data);
    } catch (error) {
      throw error;
    }
  },

  async buyCurrentProduct({ commit }, { amount, currency, password }) {
    try {
      const response = await CurrentService.buyCurrentProduct({
        amount,
        currency,
        password,
      });
      const data = await Auth.handlerSuccessResponse(response);
      commit(types.GET_CURRENT_BUY_RESULT, {
        interestStartDate: get(data, 'interest_start_date', 0),
        amount,
      });
    } catch (error) {
      throw error;
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
