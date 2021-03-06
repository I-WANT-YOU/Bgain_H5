/* eslint-disable */
import CoinService from '@api/coin/purchaseCoin';
import { handlerSuccessResponse, handlerSuccessResponseV2,handlerSuccessResponseV3 } from '@utils/auth';
import * as types from '../../mutationTypes';
import {get} from "lodash";

const state = {
  purchaseCoinInfo: [],
  currencyData: {},
  currencyPrice: {},
  depositRecords: {},
};


const getters = {
  currencyType: state => state.purchaseCoinInfo.map(item => item.currency_type),
  address: state => state.purchaseCoinInfo.map(item => item.address),
  description: state => state.purchaseCoinInfo.map(item => item.description.split('；')),
  depositRecord: state=> get(state.depositRecords, 'wallet_record_list', []),
};

const mutations = {
  [types.GET_PURCHASE_INFO](state, payload) {
    state.purchaseCoinInfo = payload;
  },
  [types.GET_CURRENCY_LIST](state, payload) {
    state.currencyData = payload;
  },
  [types.GET_CURRENCY_PRICE](state, payload) {
    state.currencyPrice = payload;
  },
  [types.GET_DEPOSIT_RECORD](state, payload) {
    state.depositRecords = payload;
  },
};

const actions = {
  // 获取买币地址和信息
  async getPurchaseCoinAddress({ commit }) {
    try {
      const response = await CoinService.getPurchaseCoinAddress();
      const data = await handlerSuccessResponse(response);
      commit(types.GET_PURCHASE_INFO, data.deposit_infos);
    } catch (error) {
      throw error;
    }
  },
  // 可购买币种列表和已有订单
  async getCurrencyList({ commit }) {
    try {
      const response = await CoinService.getCurrencyList();
      const data = await handlerSuccessResponseV3(response);
      commit(types.GET_CURRENCY_LIST, data);
    } catch (error) {
      throw error;
    }
  },

  // 可购买币种价格
  async getCurrencyPrice({ commit }, params) {
    try {
      const response = await CoinService.getCurrencyPrice(params);
      const data = await handlerSuccessResponseV2(response);
      commit(types.GET_CURRENCY_PRICE, data);
    } catch (error) {
      throw error;
    }
  },

  // 充币记录
  async getDepositRecord({ commit }, params) {
    try {
      const response = await CoinService.getDepositRecord(params);
      const data = await handlerSuccessResponse(response);
      commit(types.GET_DEPOSIT_RECORD, data);
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
