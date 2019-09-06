import * as types from '../../mutationTypes';
import CoinService from '@/api/coin/purchaseCoin';
import { handlerSuccessResponseV2, handlerSuccessResponseV3 } from '@/utils/auth';

const state = {
  orderInformation: { // 生成订单产生的信息
    payment_type: {},
  },
  orderInfoById: {}, // 根据用户id获取的信息
  orderList: [], // 订单列表
  allPayInfo: {}, // 用户选择支付方式后 生成的数据
  hadPayInfo: {}, // 用户已经付款接口
};

const getters = {
  standerOrderList: state => state.orderList.map((item) => {
    item.dest_currency_type = item.dest_currency_type.toUpperCase();
    return item;
  }),
  paymentType: state => state.orderInformation.payment_type,
};
const mutations = {
  [types.GET_ORDER_INFO](state, payload) {
    state.orderInformation = payload;
  },
  [types.GET_ORDER_INFO_BY_ID](state, payload) { // 根据ID获取用户订单
    state.orderInfoById = payload;
  },
  [types.GET_ORDER_LIST](state, payload) { // 根据ID获取用户订单
    state.orderList = payload;
  },
  [types.CHECK_PAY_TYPE_INFO](state, payload) { // 根据ID获取用户订单
    state.allPayInfo = payload;
  },
  [types.HAD_PAY_INFO](state, payload) { // 用户确认付款
    state.hadPayInfo = payload;
  },
};

const actions = {
  // 下一步 生成订单
  async generateOrderInfo({ commit }, orderInfo) {
    try {
      const response = await CoinService.generateOrderInfo(orderInfo);
      const data = await handlerSuccessResponseV3(response);
      commit(types.GET_ORDER_INFO, data);
    } catch (error) {
      throw error;
    }
  },
  // (请付款页面) 根据订单ID查询订单
  async getOrderInfoById({ commit }, orderId) {
    try {
      const response = await CoinService.getOrderInfoById(orderId);
      const data = await handlerSuccessResponseV2(response);
      commit(types.GET_ORDER_INFO_BY_ID, data);
    } catch (error) {
      throw error;
    }
  },

  // 查询订单列表
  async getOrderList({ commit }) {
    try {
      const response = await CoinService.getOrderList();
      const data = await handlerSuccessResponseV2(response);
      commit(types.GET_ORDER_LIST, data);
    } catch (error) {
      throw error;
    }
  },

  // 提交订单(选择支付方式页面)
  async submitOrder({ commit }, payType) {
    try {
      const response = await CoinService.submitOrder(payType);
      const data = await handlerSuccessResponseV2(response);
      commit(types.CHECK_PAY_TYPE_INFO, data);
    } catch (error) {
      throw error;
    }
  },

  // 用户确认支付(请付款页面)
  async confirmHadPay({ commit }, orderId) {
    try {
      const response = await CoinService.confirmHadPay(orderId);
      const data = await handlerSuccessResponseV3(response);
      commit(types.HAD_PAY_INFO, data);
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
  getters,
};
