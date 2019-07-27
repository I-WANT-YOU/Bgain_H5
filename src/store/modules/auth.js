import * as Auth from '@utils/auth';
import AuthServcice from '@api/auth';
import router from '@router';
import * as types from '../mutationTypes';

const state = {
  authenticated: !!Auth.getToken(),
};

const mutations = {
  [types.AUTHENTICATED](state) {
    state.authenticated = true;
  },
  [types.UNAUTHENTICATED](state) {
    state.authenticated = false;
  },
};

const actions = {
  async login({ commit }, params) {
    try {
      const response = await AuthServcice.login(params);
      const data = await Auth.handlerSuccessResponse(response);
      if (data && data.accessToken) {
        commit(types.AUTHENTICATED);
        Auth.setToken(data.accessToken);
      }
    } catch (error) {
      throw error;
    }
  },
  async logout({ commit }) {
    try {
      await AuthServcice.logout();
      commit(types.UNAUTHENTICATED);
      Auth.removeToken();
      router.push('/');
    } catch (error) {
      throw error;
    }
  },
  async register({ commit }, params) {
    try {
      const response = await AuthServcice.register(params);
      const data = Auth.handlerSuccessResponse(response);
      if (data && data.accessToken) {
        commit(types.AUTHENTICATED);
        Auth.setToken(data.accessToken);
      }
    } catch (error) {
      throw error;
    }
  },
  /**
   * 发送验证码
   * @param context
   * @param params
   * @example
   * params: {
   *   username: '',
   *   // 如果 username 为手机号，必填
   *   countryCode: '',
   *   geetestOptions: {},
   * }
   * @returns {Promise<void>}
   */
  async getToken(context, params) {
    try {
      await AuthServcice.getToken(params);
    } catch (error) {
      throw error;
    }
  },
  async resetPassword(context, params) {
    try {
      await AuthServcice.resetPassword(params);
      router.push('/login');
    } catch (error) {
      throw error;
    }
  },
  async changePassword({ commit }, params) {
    try {
      const response = await AuthServcice.changePassword(params);
      const data = Auth.handlerSuccessResponse(response);
      if (data && data.accessToken) {
        commit(types.AUTHENTICATED);
        Auth.setToken(data.accessToken);
      }
    } catch (error) {
      throw error;
    }
  },
  async getGeetestOptions() {
    try {
      return await AuthServcice.getGeetestOptions();
    } catch (error) {
      throw error;
    }
  },
  async validateUsername(context, username) {
    try {
      const response = await AuthServcice.validateUsername(username);
      return Auth.handlerSuccessResponse(response);
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
