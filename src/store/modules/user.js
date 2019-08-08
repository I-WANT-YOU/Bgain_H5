import { get, map } from 'lodash';
import * as Auth from '@utils/auth';
import UserService from '@api/user';
import * as types from '../mutationTypes';

const state = {
  basicInfo: {},
  userBanalce: {},
};

const getters = {
  authLevel: state => get(state.basicInfo, 'authlevel', 0),
  singleCurrency: state => get(state.userBanalce, 'single_currency', {}),
  currencies: state => map(state.userBanalce.single_currency, item => item.currency),
};

const mutations = {
  [types.GET_USER_SUMMARY](state, payload) {
    state.basicInfo = payload;
  },
  [types.GET_USER_BALANCE_SUMMARY](state, payload) {
    state.userBanalce = payload;
  },
};

const actions = {
  async getUserSummary({ commit }) {
    try {
      const response = await UserService.getUserSummary();
      const data = await Auth.handlerSuccessResponse(response);
      commit(types.GET_USER_SUMMARY, data);
    } catch (error) {
      throw error;
    }
  },
  async getUserBalanceSummary({ commit }) {
    try {
      const response = await UserService.getUserBalanceSummary();
      const data = await Auth.handlerSuccessResponse(response);
      commit(types.GET_USER_BALANCE_SUMMARY, data);
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
