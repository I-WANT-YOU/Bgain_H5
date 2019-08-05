import { get } from 'lodash';
import * as Auth from '@utils/auth';
import UserService from '@api/user';
import * as types from '../mutationTypes';

const state = {
  basicInfo: {},
};

const getters = {
  authLevel: state => get(state.basicInfo, 'authlevel', 0),
};

const mutations = {
  [types.GET_USER_SUMMARY](state, payload) {
    state.basicInfo = payload;
  },
};

const actions = {
  async getUserSummary({ commit }) {
    try {
      const response = await UserService.getUserSummary();
      const data = await Auth.handlerSuccessResponse(response);
      commit(types.GET_USER_SUMMARY, data);
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
