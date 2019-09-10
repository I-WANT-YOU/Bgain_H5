import { get, map } from 'lodash';
import dayjs from 'dayjs';
import { FundService } from '@api/product';
import * as Auth from '@utils/auth';
import { filterUndefined, formatDate } from '@utils/tools';
import * as types from '../../mutationTypes';
import { FUND_STATUS } from '@/constants/options';

const state = {
  funds: [],
  currencies: [],
  risk: [],
  productType: [],
  fund: {},
  fundBuyInfo: {},
  holdingFunds: {},
  fundBuyResult: {},
  fundTradeRules: {},
  fundInformation: {},
  fundOrderHistory: [],
  fundOrderDetail: {},
  fundOwnerDetail: {},
  fundSellDetail: {},
};
const getters = {
  initialFunds: state => state.funds.filter(({ status }) => status === FUND_STATUS.INITIAL),
  otherFunds: state => state.funds.filter(({ status }) => status !== FUND_STATUS.INITIAL),
  fundDetail: state => get(state.fund, 'fund_product_detail_record', {}),
  fundNavHistories: state => get(state.fund, 'fund_nav_histories', []),
  nextEndDate: state => formatDate(state.fundBuyResult.next_end_date, 'YYYY-MM-DD'),
  confirmDate: state => formatDate(state.fundBuyResult.confirm_date),
  nextOpenDate: state => formatDate(state.fundBuyResult.next_open_date, 'YYYY-MM-DD'),
  submitDate: state => formatDate(state.fundBuyResult.submit_date),
  amount: state => state.fundBuyResult.amount,
  fundNav: state => get(state.fundInformation, 'fund_nav_from_cms', [])
    .map((item) => {
      item.nav_time = dayjs(new Date(item.nav_time)) * 1;
      return item;
    }),
  holdFunds: state => get(state.holdingFunds, 'fund_user_stat_summary_list', []),
  holdCurencies: state => get(state.holdingFunds, 'fund_holding_total_msg', []),
  peddingsLength: state => get(state.holdingFunds, 'pending_order_num', 0),
  holdTotalPnlRatio: state => get(state.holdingFunds, 'total_pnl_ratio', 0),
  orderHistory: state => map(state.fundOrderHistory, (item) => {
    item.create_date = formatDate(item.create_date);
    return item;
  }, []),
};

const mutations = {
  [types.GET_FUND_PRODUCTS](state, payload) {
    state.funds = payload;
  },
  [types.GET_FUND_CURRENCIES](state, payload) {
    state.currencies = payload;
  },
  [types.GET_FUND_RISK_TYPE](state, payload) {
    state.risk = payload;
  },
  [types.GET_FUND_PRODUCT_TYPE](state, payload) {
    state.productType = payload;
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
    state.fundBuyResult = payload;
  },
  [types.GET_FUNDS_TRADE_RULES](state, payload) {
    state.fundTradeRules = payload;
  },
  [types.GET_FUNDS_INFORMATION](state, payload) {
    state.fundInformation = payload;
  },
  [types.GET_FUNDS_ORDER_HISTORY](state, payload) {
    state.fundOrderHistory = payload;
  },
  [types.GET_FUNDS_ORDER_DETAIL](state, payload) {
    state.fundOrderDetail = payload;
  },
  [types.GET_FUND_OWNER_DETAIL](state, payload) {
    state.fundOwnerDetail = payload;
  },
  [types.GET_FUND_SELL_DETAIL](state, payload) {
    state.fundSellDetail = payload;
  },
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
      commit(types.GET_FUND_RISK_TYPE, get(data, 'risk_level_types', []));
      commit(types.GET_FUND_PRODUCT_TYPE, get(data, 'types', []));
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
  async buyFund({ commit }, payload) {
    try {
      const response = await FundService.buyFund(payload);
      const data = await Auth.handlerSuccessResponse(response);
      commit(types.BUY_FUNDS, data);
    } catch (error) {
      throw error;
    }
  },

  // 基金交易规则
  async getFundTradeRules({ commit }, productId) {
    try {
      const response = await FundService.getFundTradeRules(productId);
      const data = await Auth.handlerSuccessResponse(response);
      commit(types.GET_FUNDS_TRADE_RULES, data);
    } catch (error) {
      throw error;
    }
  },

  // 基金产品详情
  async getFundInformation({ commit }, productId) {
    try {
      const response = await FundService.getFundInformation(productId);
      const data = await Auth.handlerSuccessResponse(response);
      commit(types.GET_FUNDS_INFORMATION, data);
    } catch (error) {
      throw error;
    }
  },

  // 基金历史交易记录
  async getFundOrderHistory({ commit }, options) {
    try {
      const response = await FundService.getFundOrderHistory(options);
      const data = await Auth.handlerSuccessResponse(response);
      commit(types.GET_FUNDS_ORDER_HISTORY, data);
    } catch (error) {
      throw error;
    }
  },

  // 基金订单详情
  async getFundOrderDetail({ commit }, status) {
    try {
      const response = await FundService.getFundOrderDetail(status);
      const data = await Auth.handlerSuccessResponse(response);
      commit(types.GET_FUNDS_ORDER_DETAIL, data);
    } catch (error) {
      throw error;
    }
  },

  // 基金订单详情
  async getSubCarryDetail({ commit }, productId) {
    try {
      const response = await FundService.getSubCarryDetail(productId);
      const data = await Auth.handlerSuccessResponse(response);
      commit(types.GET_FUNDS_ORDER_DETAIL, data);
    } catch (error) {
      throw error;
    }
  },

  // 在持基金详情
  async getFundOwnerDetail({ commit }, option) {
    try {
      const response = await FundService.getFundOwnerDetail(option);
      const data = await Auth.handlerSuccessResponse(response);
      commit(types.GET_FUND_OWNER_DETAIL, data);
    } catch (error) {
      throw error;
    }
  },

  // 赎回基金
  async sellFund(context, options) {
    console.log(options);
    try {
      const response = await FundService.sellFund(options);
      console.log(response);
      // return Auth.handlerSuccessResponse(response);
    } catch (error) {
      throw error;
    }
  },

  // 基金赎回前详情
  async sellFundDetail({ commit }, option) {
    try {
      const response = await FundService.sellFundDetail(option);
      const data = await Auth.handlerSuccessResponse(response);
      commit(types.GET_FUND_SELL_DETAIL, data);
    } catch (error) {
      throw error;
    }
  },

  // 撤单
  async cancelOrder(context, options) {
    try {
      const response = await FundService.cancelOrder({
        order_id: options.orderId,
        payment_password: options.password,
      });
      return Auth.handlerSuccessResponse(response);
    } catch (error) {
      throw error;
    }
  },

  // 发送短信
  async sendRemind(context, options) {
    try {
      const response = await FundService.sendRemind(options);
      return Auth.handlerSuccessResponseV3(response);
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
