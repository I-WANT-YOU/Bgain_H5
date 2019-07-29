import { get } from 'lodash';
import HomeService from '@api/home';
import { handlerSuccessResponseV2 } from '@utils/auth';
import * as types from '../mutationTypes';

const state = {
  infos: {},
};

const getters = {
  announcement: state => get(state, 'announcement_system_index', {}),
  banners: state => get(state, 'banner_list', []),
  funds: state => get(state, 'fund_product_list', []),
  currents: state => get(state, 'current_product_list', []),
  fixeds: state => get(state, 'fix_product_summary_list', []),
  isLogin: state => get(state, 'login', false),
  hasUnreadMessage: state => get(state, 'exist_unread_message', false),
};

const mutations = {
  [types.GET_ALL_HOME_INFO](state, payload) {
    state.infos = payload;
  },
};

const actions = {
  /**
   * 获取首页的所有信息
   * 不需要参数
   * @param commit
   * @returns {Promise<void>}
   */
  async getAllHomeInfo({ commit }) {
    try {
      const response = await HomeService.getAllHomeInfo();
      const data = await handlerSuccessResponseV2(response);
      commit(types.GET_ALL_HOME_INFO, data);
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
