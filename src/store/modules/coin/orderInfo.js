import * as types from '../../mutationTypes';

const state = {
  orderInformation: [],
};
const mutations = {
  [types.GET_ORDER_INFO](state, payload) {
    state.orderInformation = payload;
  },
};

const actions = {
  // 传入订单信息
  getOrderInfo({ commit }, orderInfo) {
    commit(types.GET_ORDER_INFO, orderInfo);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
