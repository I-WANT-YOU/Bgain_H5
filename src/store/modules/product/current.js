import { chain, get } from 'lodash';
import { CurrentService } from '@api/product';
import * as Auth from '@utils/auth';
import { formatDate } from '@utils/tools';
import * as types from '../../mutationTypes';

const state = {
  currencies: [],
  currents: [],
  tradeRecords: [],
  historyRates: [],
};

const getters = {
  getCurrentProductsByCurrency: ({ currents }) => currency => chain(currents)
    .filter(({ currency_type: type }) => currency === type)
    .head()
    .value(),
  historyProfitMax: ({ historyRates }) => Number(get(historyRates, 'history_profit_max', '')),
  historyProfitRates: ({ historyRates }) => chain(historyRates)
    .get('history_profit_daily', [])
    .map(({ amount, date }) => ({
      amount,
      date: formatDate(date),
    }))
    .value(),
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
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
