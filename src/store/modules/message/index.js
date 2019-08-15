import { get, map } from 'lodash';
import MessageService from '@api/message';
import { formatDate } from '@utils/tools';
import { handlerSuccessResponse, handlerSuccessResponseV2 } from '@/utils/auth';
import * as types from '../../mutationTypes';

const state = {
  news: [],
  systemDetail: {},
};

const getters = {
  newList: state => get(state.news, 'announcement_record_list', [])
    .map((item) => {
      item.create_date = formatDate(item.create_date);
      return item;
    }),
  announcementList: state => map(state.news, (item) => {
    item.create_date = formatDate(item.create_date);
    return item;
  }, []),
  announcementDetail: state => ({
    ...state.systemDetail,
    createdAt: formatDate(`${state.systemDetail.createdAt}000` * 1),
  }),
};

const mutations = {
  [types.GET_USER_NEWS](state, payload) {
    state.news = payload;
  },
  [types.GET_USER_SYSTEM_NEWS_DETAIL](state, payload) {
    state.systemDetail = payload;
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
      return await handlerSuccessResponse(response);
    } catch (error) {
      throw error;
    }
  },

  async getSystemAnnouncements({ commit }) {
    try {
      const response = await MessageService.getSystemAnnouncements();
      const data = await handlerSuccessResponseV2(response);
      commit(types.GET_USER_NEWS, data);
    } catch (error) {
      throw error;
    }
  },

  async getSystemAnnouncementsDetail({ commit }, id) {
    try {
      const response = await MessageService.getSystemAnnouncementsDetail(id);
      const data = await handlerSuccessResponseV2(response);
      commit(types.GET_USER_SYSTEM_NEWS_DETAIL, data);
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
