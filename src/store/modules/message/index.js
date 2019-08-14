import MessageService from '@api/message';
import * as types from '../../mutationTypes';
import { handlerSuccessResponse } from '@/utils/auth';

const state = {
  news: [],
  system: [],
};

const mutations = {
  [types.GET_USER_NEWS](state, payload) {
    state.news = payload;
  },
  [types.GET_USER_SYSTEM_NEWS](state, payload) {
    state.system = payload;
  },
};

const actions = {
  async getAllNews({ commit }, appealingInfo) {
    try {
      const response = await MessageService.getAllNews(appealingInfo);
      const data = await handlerSuccessResponse(response);
      console.log(data);
      commit(types.GET_USER_NEWS, data);
    } catch (error) {
      throw error;
    }
  },

  async getSystemAnnouncements({ commit }, appealingInfo) {
    try {
      const response = await MessageService.getSystemAnnouncements(appealingInfo);
      const data = await handlerSuccessResponse(response);
      console.log(data);
      commit(types.GET_USER_SYSTEM_NEWS, data);
    } catch (error) {
      throw error;
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
