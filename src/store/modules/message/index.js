import { get } from 'lodash';
import MessageService from '@api/message';
import { formatDate } from '@utils/tools';
import { handlerSuccessResponse } from '@/utils/auth';
import * as types from '../../mutationTypes';

const state = {
  news: [],
  system: [],
};

const getters = {
  newList: state => get(state.news, 'announcement_record_list', [])
    .map((item) => {
      item.create_date = formatDate(item.create_date);
      return item;
    }),
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
  async getAllNews({ commit }) {
    try {
      const response = await MessageService.getAllNews();
      const data = await handlerSuccessResponse(response);
      commit(types.GET_USER_NEWS, data);
    } catch (error) {
      throw error;
    }
  },

  async setNewsRead(context, uuid) {
    try {
      const response = await MessageService.setNewsRead(uuid);
      return await handlerSuccessResponse(response);
    } catch (error) {
      throw error;
    }
  },

  async setAllNewsRead() {
    try {
      const response = await MessageService.setAllNewsRead();
      console.log(response);
      return await handlerSuccessResponse(response);
    } catch (error) {
      throw error;
    }
  },

  async getSystemAnnouncements({ commit }) {
    try {
      const response = await MessageService.getSystemAnnouncements();
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
  getters,
  actions,
};
