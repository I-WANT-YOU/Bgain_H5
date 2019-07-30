import { get, chain } from 'lodash';
import { handlerSuccessResponse } from '@utils/auth';
import * as types from '@/store/mutationTypes';
import { FixedService } from '@/api/product';

const state = {
  fixed: {},
};

const getters = {
  products: state => get(state.fixed, 'product_summary_list', []),
  currencies: (state, { products }) => products.map(({ currency_type: currency = '' }) => currency),
  getFixedProductsByCurrency: (state, { products }) => currency => chain(products)
    .filter(({ currency_type: type }) => currency === type)
    .head()
    .get('product_summaries', [])
    .value(),
};

const mutations = {
  [types.GET_FIXED_PRODUCTS](state, payload) {
    state.fixed = payload;
  },
};

const actions = {
  async getFixedProducts({ commit }) {
    try {
      const response = await FixedService.getFixedProducts();
      const data = await handlerSuccessResponse(response);
      commit(types.GET_FIXED_PRODUCTS, data);
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
