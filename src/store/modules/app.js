import AppService from '@/api/app';
import * as types from '../mutationTypes';

const state = {
  uploadPolicy: {},
};

const getters = {};

const mutations = {
  [types.GET_UPLOAD_POLICY](state, payload) {
    state.uploadPolicy = payload;
  },
};

const actions = {
  async getUploadPolicy({ commit }) {
    try {
      const response = await AppService.getUploadPolicy();
      commit(types.GET_UPLOAD_POLICY, response);
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
