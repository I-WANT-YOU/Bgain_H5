import { get } from 'lodash';
import { FundService } from '@api/product';
import * as Auth from '@utils/auth';
import { filterUndefined } from '@utils/tools';
import * as types from '../../mutationTypes';
import { FUND_STATUS } from '@/constants/options';

const state = {
  funds: [],
  currencies: [],
};

const getters = {
  initialFunds: state => state.funds.filter(({ status }) => status === FUND_STATUS.INITIAL),
  otherFunds: state => state.funds.filter(({ status }) => status !== FUND_STATUS.INITIAL),
};

const mutations = {
  [types.GET_FUND_PRODUCTS](state, payload) {
    state.funds = payload;
  },
  [types.GET_FUND_CURRENCIES](state, payload) {
    state.currencies = payload;
  },
};

const actions = {
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
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
