import { get, isNil } from 'lodash';
import * as Auth from '@utils/auth';
import UserService from '@api/user';
import * as types from '../mutationTypes';

const state = {
  basicInfo: {},
  kycInfo: {},
  userBalance: {},
  submitKycResult: {},
  isSignInInfo: {},
  referInfo: {},
  assetRecord: {},
  couponList: {},
  transfers: {},
  vCodeInfo: {}, // 发送验证码 收到的信息
  redeemCodeInfo: {}, // 判断兑换码的有效信息
  codeExchangeInfo: {}, // 进行兑换返回的信息
  userNameInfo: {}, // 校验用户名是否注册
};

const getters = {
  authLevel: state => get(state.basicInfo, 'authlevel', 0),
  username: state => get(state.basicInfo, 'username', ''),
  countryCode: state => get(state.basicInfo, 'country_calling_code', '+86'),
  kycStatus: (state) => {
    const status = get(state.basicInfo, 'kyc_stauts', 'UN_CERTIFIED');
    if (isNil(status)) {
      return 'UN_CERTIFIED';
    }
    return status.toUpperCase();
  },
  otcStatus: (state) => {
    const status = get(state.basicInfo, 'otc_kyc_status', 'UN_CERTIFIED');
    if (isNil(status)) {
      return 'UN_CERTIFIED';
    }
    return status.toUpperCase();
  },
  submitKycStatus: state => get(state.kycInfo.data, 'kyc_record_status', 'auditing'),
  submitKycMsg: state => get(state.kycInfo.data, 'certified_message', ''),
  singleCurrency: state => (state.userBalance
    ? [{ currency: 'BTC', ...state.userBalance.btc },
      { currency: 'CNY', ...state.userBalance.cny },
      { currency: 'USDT', ...state.userBalance.usdt }] : []),
  singleCurrencys: state => get(state.userBalance, 'single_currency', []),
  currencyss: state => Object.entries(state.userBalance).filter(item => item[0] !== 'single_currency' && item[0] !== 'activity'),
  balances: state => get(state.userBalance, 'single_currency', []).map(({ currency, balance }) => ({
    currency,
    balance,
  })),
  bonusSummary: state => get(state.referInfo.bonus_summary, 'all', 0),
  inviteeDetailsList: state => get(state.referInfo, 'invitee_details_list', []),
  invitationCode: state => get(state.referInfo, 'invitation_code', []),
  rewardRecordList: state => get(state.referInfo, 'reward_record_list', []),
  everyTokens: state => get(state.referInfo.bonus_summary, 'every_tokens', {}),
  assetRecords: state => get(state.assetRecord, 'operation_logs', []),
  newCoupons: state => get(state.couponList, 'new_coupons', []),
  usedCoupons: state => get(state.couponList, 'used_coupons', []),
  expiredCoupons: state => get(state.couponList, 'expired_coupons', []),
  kycStatu: state => get(state.kycInfo.data, 'kyc_record_status', 'un_certified'),
};

const mutations = {
  [types.GET_USER_SUMMARY](state, payload) {
    state.basicInfo = payload;
  },
  [types.GET_KYC_INFO](state, payload) {
    state.kycInfo = payload;
  },
  [types.GET_USER_BALANCE_SUMMARY](state, payload) {
    state.userBalance = payload;
  },
  [types.GET_SUBMIT_KYC_RESULT](state, payload) {
    state.submitKycResult = payload;
  },
  [types.GET_USER_IS_SIGN_IN](state, payload) {
    state.isSignInInfo = payload;
  },
  [types.GET_USER_REFER](state, payload) {
    state.referInfo = payload;
  },
  [types.GET_ASSET_RECORD](state, payload) {
    state.assetRecord = payload;
  },
  [types.GET_USER_COUPON_LIST](state, payload) {
    state.couponList = payload;
  },
  [types.GET_TRANSFER_DETAILS](state, payload) {
    state.transfers = payload;
  },
  [types.GET_V_CODE](state, payload) {
    state.vCodeInfo = payload;
  },
  [types.REDEEM_CODE_INFO](state, payload) {
    state.redeemCodeInfo = payload;
  },
  [types.CODE_EXCHANGE](state, payload) {
    state.codeExchangeInfo = payload;
  },
  [types.GET_USERNAME_INFO](state, payload) {
    state.userNameInfo = payload;
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
  // 交易记录
  async getTransferDetails({ commit }, currency) {
    try {
      const response = await UserService.getTransferDetails(currency);
      const data = await Auth.handlerSuccessResponse(response);
      commit(types.GET_TRANSFER_DETAILS, data);
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
      const data = await Auth.handlerSuccessResponseV3(response);
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

  // 用户一键授权OTC验证
  async toGrantAuthorization() {
    try {
      await UserService.toGrantAuthorization();
      // const data = await Auth.handlerSuccessResponseV2(response);
      // commit(types.GET_KYC_INFO, data);
    } catch (error) {
      throw error;
    }
  },

  // 判断用户是否签到
  async getUserIsSignIn({ commit }) {
    try {
      const response = await UserService.getUserIsSignIn();
      const data = await Auth.handlerSuccessResponse(response);
      commit(types.GET_USER_IS_SIGN_IN, data);
    } catch (error) {
      throw error;
    }
  },

  // 邀友返利
  async getReferInfo({ commit }) {
    try {
      const response = await UserService.getReferInfo();
      const data = await Auth.handlerSuccessResponse(response);
      commit(types.GET_USER_REFER, data);
    } catch (error) {
      throw error;
    }
  },

  // 资金记录
  async getAssetRecord({ commit }) {
    try {
      const response = await UserService.getTransferDetails('');
      const data = await Auth.handlerSuccessResponse(response);
      commit(types.GET_ASSET_RECORD, data);
    } catch (error) {
      throw error;
    }
  },

  // 优惠券
  async getUserCouponList({ commit }) {
    try {
      const response = await UserService.getUserCouponList();
      const data = await Auth.handlerSuccessResponse(response);
      commit(types.GET_USER_COUPON_LIST, data);
    } catch (error) {
      throw error;
    }
  },
  /* 刮刮乐活动中发送验证码 */
  async getActiveVerificationCode({ commit }, params) {
    try {
      const response = await UserService.getActiveVerificationCode(params);
      const data = await Auth.handlerSuccessResponse(response);
      commit(types.GET_V_CODE, data);
    } catch (error) {
      throw error;
    }
  },
  /* 判断兑换码的有效性 */
  async postRedeemCode({ commit }, params) {
    try {
      const response = await UserService.postRedeemCode(params);
      const data = await Auth.handlerSuccessResponseV2(response);
      commit(types.REDEEM_CODE_INFO, data);
    } catch (error) {
      throw error;
    }
  },
  /* 进行兑换 */
  async codeExchange({ commit }, params) {
    try {
      const response = await UserService.codeExchange(params);
      const data = await Auth.handlerSuccessResponseV3(response);
      commit(types.CODE_EXCHANGE, data);
    } catch (error) {
      throw error;
    }
  },
  /* 刮刮乐 验证用户名是否注册 */
  async getUserNameInfo({ commit }, params) {
    try {
      const response = await UserService.getUserNameInfo(params);
      const data = await Auth.handlerSuccessResponse(response);
      commit(types.GET_USERNAME_INFO, data);
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
