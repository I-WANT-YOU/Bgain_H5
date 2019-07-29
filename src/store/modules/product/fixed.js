import { get, chain } from 'lodash';
import { handlerSuccessResponse } from '@utils/auth';
import * as types from '@/store/mutationTypes';
import { FixedService } from '@/api/product';

const state = {
  fixeds: {},
};

const getters = {
  products: state => get(state.fixeds, 'product_summary_list', []),
  currencies: (state, { products }) => products.map(({ currency_type: currency = '' }) => currency),
  getFixedProductsByCurrency: (state, { products }) => currency => chain(products)
    .filter(({ currency_type: type }) => currency === type)
    .head()
    .get('product_summaries', [])
    .value(),
};

const mutations = {
  [types.GET_ALL_FIXED_PRODUCT](state, payload) {
    state.fixeds = payload;
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
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
