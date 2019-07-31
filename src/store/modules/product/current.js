import { chain, get } from 'lodash';
import { CurrentService } from '@api/product';
import * as Auth from '@utils/auth';
import * as types from '../../mutationTypes';

const state = {
  currencies: [],
  currents: [],
  tradeRecords: [],
};

const getters = {
  getCurrentProductsByCurrency: ({ currents }) => currency => chain(currents)
    .filter(({ currency_type: type }) => currency === type)
    .head()
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
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
