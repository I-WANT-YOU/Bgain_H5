import * as types from '../../mutationTypes';

const state = {
  userPaymentInfo: [],
};
const mutations = {
  [types.GET_USER_PAYMENT_INFO](state, payload) {
    state.userPaymentInfo = payload;
  },
};

const actions = {
  // 传入订单信息
  getUserPaymentInfo({ commit }, userPaymentInfo) {
    commit(types.GET_USER_PAYMENT_INFO, userPaymentInfo);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
