import { get, map } from 'lodash';
import * as Auth from '@utils/auth';
import UserService from '@api/user';
import * as types from '../mutationTypes';

const state = {
  basicInfo: {},
  kycInfo: {},
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
  [types.GET_KYC_INFO](state, payload) {
    state.kycInfo = payload;
  },
  [types.GET_USER_BALANCE_SUMMARY](state, payload) {
    state.userBanalce = payload;
  },
};

const actions = {
  // 获取用户信息
  async getUserSummary({ commit }) {
    try {
      const response = await UserService.getUserSummary();
      const data = await Auth.handlerSuccessResponse(response);
      commit(types.GET_USER_SUMMARY, data);
    } catch (error) {
      throw error;
    }
  },
  // 提交 KYC 申请
  async submitKyc(context, params) {
    try {
      const response = await UserService.submitKyc(params);
      return Auth.handlerSuccessResponseV2(response);
    } catch (error) {
      throw error;
    }
  },
  // 获取用户 KYC 信息
  async getKycInfo({ commit }) {
    try {
      const response = await UserService.getKycInfo();
      const data = await Auth.handlerSuccessResponseV2(response);
      commit(types.GET_KYC_INFO, data);
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
