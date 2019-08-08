import { get, map } from 'lodash';
import * as Auth from '@utils/auth';
import UserService from '@api/user';
import * as types from '../mutationTypes';

const state = {
  basicInfo: {},
  kycInfo: {},
  userBanalce: {},
  submitKycResult: {},
};

const getters = {
  authLevel: state => get(state.basicInfo, 'authlevel', 0),
  username: state => get(state.basicInfo, 'username', ''),
  countryCode: state => get(state.basicInfo, 'country_calling_code', '+86'),
  submitKycStatus: state => get(state.submitKycResult, 'kyc_status', 'auditing'),
  submitKycMsg: state => get(state.submitKycResult, 'kyc_msg', ''),
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
  [types.GET_SUBMIT_KYC_RESULT](state, payload) {
    state.submitKycResult = payload;
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
  /**
   * 提交 KYC 申请
   * @param context
   * @param params
   * @example
   *  {
      "nationality": "中国",
      "first_name": "李红",
      "last_name": "",
      "document_number": "4304211398309241982",
      "document_type": "passport",
      "token":"694147",
      "img_url_1": "",
      "img_url_2": "",
      "img_url_3": "",
    }
   * @returns {Promise<Promise<never> | Promise<unknown>>}
   */
  async submitKyc({ commit }, params) {
    try {
      const response = await UserService.submitKyc(params);
      const data = Auth.handlerSuccessResponseV2(response);
      commit(types.GET_SUBMIT_KYC_RESULT, data);
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
