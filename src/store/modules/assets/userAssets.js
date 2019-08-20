import * as types from '../../mutationTypes';
import assetsService from '@/api/assets/assets';
import { handlerSuccessResponse } from '@/utils/auth';

const state = {
  userAssets: { // 用户总资产
    single_currency: [],
  },
  userAssetsRecord: {
    operation_logs: [],
  }, // 用户资产记录
  userAvailableAssetsAssets: { // 用户可用资产
    balances: [],
  },
};
const mutations = {
  [types.GET_USER_ASSETS](state, payload) {
    state.userAssets = { ...payload };
  },
  [types.GET_USER_ASSETS_RECORD](state, payload) {
    state.userAssetsRecord = payload;
  },
  [types.GET_USER_AVAILABLE](state, payload) {
    state.userAvailableAssetsAssets = { ...payload };
  },
};

const actions = {
  // 获取用户总资产信息
  async getUserAssets({ commit }) {
    try {
      const response = await assetsService.getUserAssets();
      const data = await handlerSuccessResponse(response);
      commit(types.GET_USER_ASSETS, data);
    } catch (error) {
      throw error;
    }
  },

  // 获取用户资产交易记录
  async getUserAssetsRecord({ commit }, currencyType) {
    try {
      const response = await assetsService.getUserAssetsRecord(currencyType);
      const data = await handlerSuccessResponse(response);
      commit(types.GET_USER_ASSETS_RECORD, data);
    } catch (error) {
      throw error;
    }
  },

  // 获取用户可用资产
  async getUserAvailableAssets({ commit }) {
    try {
      const response = await assetsService.getUserAvailableAssets();
      const data = await handlerSuccessResponse(response);
      commit(types.GET_USER_AVAILABLE, data);
    } catch (error) {
      throw error;
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
