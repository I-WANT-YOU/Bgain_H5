import * as types from '../../mutationTypes';
import assetsService from '@/api/coin/purchaseCoin';
import { handlerSuccessResponseV2 } from '@/utils/auth';

const state = {
  userAppeal: {},
};
const mutations = {
  [types.POST_USER_APPEAL](state, payload) {
    state.userAppeal = payload;
  },
};

const actions = {
  // 传入订单信息
  async postAppealingInfo({ commit }, appealingInfo) {
    try {
      const response = await CoinService.postAppealingInfo(appealingInfo);
      const data = await handlerSuccessResponseV2(response);
      commit(types.POST_USER_APPEAL, data);
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
