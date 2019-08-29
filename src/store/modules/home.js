import { get } from 'lodash';
import HomeService from '@api/home';
import { handlerSuccessResponseV2, handlerSuccessResponse } from '@utils/auth';
import * as types from '../mutationTypes';

const state = {
  infos: {},
  recordList: {},
  popInfo: {},
};

const getters = {
  announcement: state => get(state.infos, 'announcement_system_index', {}),
  banners: state => get(state.infos, 'banner_list', [1, 2]),
  funds: state => get(state.infos, 'fund_product_list', []),
  currents: state => get(state.infos, 'current_product_list', []),
  fixeds: state => get(state.infos, 'fix_product_summary_list', []),
  isLogin: state => get(state.infos, 'login', false),
  hasUnreadMessage: state => get(state.infos, 'exist_unread_message', false),
};

const mutations = {
  [types.GET_ALL_HOME_INFO](state, payload) {
    state.infos = payload;
  },
  [types.GET_RECORD](state, payload) {
    state.recordList = payload;
  },
  [types.GET_POP_INFO](state, payload) {
    state.popInfo = payload;
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
  // 用户是否有充值记录
  async getRecord({ commit }) {
    try {
      const response = await HomeService.getRecord();
      const data = await handlerSuccessResponse(response);
      commit(types.GET_RECORD, data);
    } catch (error) {
      throw error;
    }
  },

  /* 判断是否显示弹窗 */
  async getPopInfo({ commit }) {
    try {
      const response = await HomeService.getPopInfo();
      const data = await handlerSuccessResponseV2(response);
      commit(types.GET_POP_INFO, data);
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
