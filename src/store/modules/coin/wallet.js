import { get } from 'lodash';
import { formatDate, numberWithThousands } from '@utils/tools';
import CoinService from '@/api/coin/purchaseCoin';
import { handlerSuccessResponse, handlerSuccessResponseV2 } from '@/utils/auth';
import * as types from '../../mutationTypes';

const state = {
  walletInfo: {}, // 提币信息
  walletRecord: [],
  walletRecordDeatil: {},
};
const mutations = {
  [types.GET_WALLET_INFO](state, payload) {
    state.walletInfo = payload;
  },
  [types.GET_WALLET_RECORD](state, payload) {
    state.walletRecord = payload;
  },
  [types.GET_WALLET_RECORD_DETAIL](state, payload) {
    state.walletRecordDeatil = payload;
  },
};
const getters = {
  wallets: state => get(state.walletInfo, 'withdrawal_infos', []),
  walletRecordList: state => get(state.walletRecord, 'wallet_record_list', [])
    .map(item => ({
      ...item,
      create_date: formatDate(item.create_date),
      amount: numberWithThousands(item.amount),
    })),
};

const actions = {
  // 提币信息
  async getWalletInfo({ commit }, appealingInfo) {
    try {
      const response = await CoinService.getWalletInfo(appealingInfo);
      const data = await handlerSuccessResponse(response);
      commit(types.GET_WALLET_INFO, data);
    } catch (error) {
      throw error;
    }
  },

  // 提币信息
  async getWithdrawal(context, option) {
    try {
      const response = await CoinService.getWithdrawal(option);
      const data = await handlerSuccessResponse(response);
      console.log(data);
    } catch (error) {
      throw error;
    }
  },

  // 提币记录
  async getWalletRecord({ commit }, option) {
    try {
      const response = await CoinService.getWalletRecord(option);
      const data = await handlerSuccessResponse(response);
      commit(types.GET_WALLET_RECORD, data);
      console.log(data);
    } catch (error) {
      throw error;
    }
  },

  // 提币记录详情
  async getWalletRecordDetail({ commit }, option) {
    try {
      const response = await CoinService.getWalletRecordDetail(option);
      const data = await handlerSuccessResponseV2(response);
      commit(types.GET_WALLET_RECORD_DETAIL, data);
    } catch (error) {
      throw error;
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
