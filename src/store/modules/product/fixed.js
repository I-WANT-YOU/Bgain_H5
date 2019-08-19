import { get, chain } from 'lodash';
import { handlerSuccessResponse, handlerSuccessResponseV2 } from '@utils/auth';
import * as types from '@/store/mutationTypes';
import { FixedService } from '@/api/product';

const state = {
  fixeds: {},
  fixed: {},
  fixedBuyInfo: {},
  availabelCoupons: [],
  userPortfolio: [],
  userholdingDetail: {},
};

const getters = {
  products: state => get(state.fixeds, 'product_summary_list', []),
  currencies: (state, { products }) => products.map(({ currency_type: currency = '' }) => currency),
  getFixedProductsByCurrency: (state, { products }) => currency => chain(products)
    .filter(({ currency_type: type }) => currency === type)
    .head()
    .get('product_summaries', [])
    .value(),
  userHoldFixedAsset: state => get(state.userholdingDetail, 'total_asset', {}),
  userHoldFixedSummary: state => get(state.userholdingDetail, 'pending_profit_summary_list', []),
};

const mutations = {
  [types.GET_ALL_FIXED_PRODUCT](state, payload) {
    state.fixeds = payload;
  },
  [types.GET_FIXED_PRODUCT_BY_ID](state, payload) {
    state.fixed = get(payload, 'obj', {});
  },
  [types.GET_FIXED_BUY_INFO](state, payload) {
    state.fixedBuyInfo = payload;
  },
  [types.GET_AVAILABEL_COUPONS](state, payload) {
    state.availabelCoupons = payload;
  },
  [types.GET_USER_PORTFOLIO](state, payload) {
    state.userPortfolio = payload;
  },
  [types.GET_USER_HOLDING_DETAIL](state, payload) {
    state.userholdingDetail = payload;
  },
};

const actions = {
  async getAllFixedProduct({ commit }) {
    try {
      const response = await FixedService.getAllFixedProduct();
      const data = await handlerSuccessResponse(response);
      commit(types.GET_ALL_FIXED_PRODUCT, data);
    } catch (error) {
      throw error;
    }
  },

  // 获取定期产品详情
  async getFixedProductById({ commit }, productId) {
    try {
      const response = await FixedService.getFixedProductById(productId);
      const data = await handlerSuccessResponse(response);
      commit(types.GET_FIXED_PRODUCT_BY_ID, data);
    } catch (error) {
      throw error;
    }
  },

  // 获取定期产品购买页信息
  async getFixedBuyInfo({ commit }, productId) {
    try {
      const response = await FixedService.getFixedBuyInfo(productId);
      const data = await handlerSuccessResponseV2(response);
      commit(types.GET_FIXED_BUY_INFO, data);
    } catch (error) {
      throw error;
    }
  },

  /**
   * 购买定期产品
   * @param context
   * @param params
   * @example
   * {
      "product_id" : 177,
      "amount": 6000,
      "amount_currency":"usdt",
      "payment_currency": "usdt",
      "payment_password": "123456",
      "user_coupon_id": "",
      "product_type":"fix_income",
      "auto_transfer_in":true
   * }
   * @returns {Promise<Promise<never> | Promise<unknown>>}
   */
  async buyFixedProduct(context, params) {
    try {
      const response = await FixedService.buyFixedProduct(params);
      return handlerSuccessResponseV2(response);
    } catch (error) {
      throw error;
    }
  },

  // 获取可用的优惠券
  async getAvailableCoupons({ commit }, { id, amount }) {
    try {
      const response = await FixedService.getAvailableCoupons({
        product_id: id,
        amount,
      });
      const data = await handlerSuccessResponse(response);
      commit(types.GET_AVAILABEL_COUPONS, get(data, 'available_coupon_list', []));
    } catch (error) {
      throw error;
    }
  },

  async getUserPortfolio({ commit }) {
    try {
      const response = await FixedService.getUserPortfolio();
      const data = await handlerSuccessResponse(response);
      commit(types.GET_USER_PORTFOLIO, get(data, 'portfolios', []));
    } catch (error) {
      throw error;
    }
  },

  async getUserPortfolioHistory({ commit }) {
    try {
      const response = await FixedService.getUserPortfolioHistory();
      const data = await handlerSuccessResponse(response);
      commit(types.GET_USER_PORTFOLIO, get(data, 'portfolios', []));
    } catch (error) {
      throw error;
    }
  },

  async setAutoPortfolio(context, option) {
    try {
      const response = await FixedService.setAutoPortfolio(option);
      return handlerSuccessResponse(response);
    } catch (error) {
      throw error;
    }
  },

  async getUsetFixedHoldingDetail({ commit }, status) {
    try {
      const response = await FixedService.getUsetFixedHoldingDetail(status);
      const data = await handlerSuccessResponseV2(response);
      commit(types.GET_USER_HOLDING_DETAIL, data);
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
