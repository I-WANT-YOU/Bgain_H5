import { get } from 'lodash';
import { FundService } from '@api/product';
import * as Auth from '@utils/auth';
import { filterUndefined } from '@utils/tools';
import * as types from '../../mutationTypes';
import { FUND_STATUS } from '@/constants/options';
import { formatDate } from '@utils/tools';

const state = {
  funds: [],
  currencies: [],
  fund: {},
  fundBuyInfo: {},
  holdingFunds: {},
  fundBuyResult: {},
};

const getters = {
  initialFunds: state => state.funds.filter(({ status }) => status === FUND_STATUS.INITIAL),
  otherFunds: state => state.funds.filter(({ status }) => status !== FUND_STATUS.INITIAL),
  fundDetail: state => get(state.fund, 'fund_product_detail_record', {}),
  fundNavHistories: state => get(state.fund, 'fund_nav_histories', []),
  next_end_date: state => formatDate(state.fundBuyResult.next_end_date),
  confirm_date: state => formatDate(state.fundBuyResult.confirm_date),
  next_open_date: state => formatDate(state.fundBuyResult.next_open_date),
  submit_date: state => formatDate(state.fundBuyResult.submit_date),
  amount: state => state.fundBuyResult.amount,
};

const mutations = {
  [types.GET_FUND_PRODUCTS](state, payload) {
    state.funds = payload;
  },
  [types.GET_FUND_CURRENCIES](state, payload) {
    state.currencies = payload;
  },
  [types.GET_FUND_PRODUCT_DETAIL](state, payload) {
    state.fund = payload;
  },
  [types.GET_FUND_BUY_INFO](state, payload) {
    state.fundBuyInfo = payload;
  },
  [types.GET_HOLDING_FUNDS](state, payload) {
    state.holdingFunds = payload;
  },
  [types.BUY_FUNDS](state, payload) {
    console.log(payload);
    state.fundBuyResult = payload;
  }
};

const actions = {
  // 获取基金产品列表
  async getFundProducts({ commit }, { currency, type, risk }) {
    try {
      const response = await FundService.getFundProducts(filterUndefined({
        currency_type: currency,
        fund_product_type: type,
        risk_level_type: risk,
      }));
      const data = await Auth.handlerSuccessResponse(response);
      commit(types.GET_FUND_CURRENCIES, get(data, 'coins', []));
      commit(types.GET_FUND_PRODUCTS, get(data, 'fund_products', []));
    } catch (error) {
      throw error;
    }
  },

  // 获取基金产品详情
  async getFundProductDetail({ commit }, productId) {
    try {
      const response = await FundService.getFundProductDetail(productId);
      const data = await Auth.handlerSuccessResponse(response);
      commit(types.GET_FUND_PRODUCT_DETAIL, data);
    } catch (error) {
      throw error;
    }
  },

  // 获取基金购买页信息
  async getFundBuyInfo({ commit }, productId) {
    try {
      const response = await FundService.getFundBuyInfo(productId);
      const data = await Auth.handlerSuccessResponse(response);
      commit(types.GET_FUND_BUY_INFO, data);
    } catch (error) {
      throw error;
    }
  },

  // 获取用户在持基金
  async getHoldingFunds({ commit }) {
    try {
      const response = await FundService.getHoldingFunds();
      const data = await Auth.handlerSuccessResponse(response);
      commit(types.GET_HOLDING_FUNDS, data);
    } catch (error) {
      throw error;
    }
  },

  // 基金购买
  async FundBuy({ commit }, payload) {
    try {
      const response = await FundService.FundBuy(payload);
      const data = await Auth.handlerSuccessResponse(response);
      commit(types.BUY_FUNDS, data);
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
