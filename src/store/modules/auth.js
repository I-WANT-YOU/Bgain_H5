import * as Auth from '@utils/auth';
import AuthService from '@api/auth';
import router from '@router';
import * as types from '../mutationTypes';

const state = {
  authenticated: !!Auth.getToken(),
  userInfo: {},
};

const mutations = {
  [types.AUTHENTICATED](state) {
    state.authenticated = true;
  },
  [types.UNAUTHENTICATED](state) {
    state.authenticated = false;
  },
  getUserInfo(state, userInfo) {
    state.userInfo = { ...userInfo };
  },
};

const actions = {
  async login({ commit }, params) {
    try {
      const response = await AuthService.login(params);
      const data = await Auth.handlerSuccessResponse(response);
      if (data && data.accessToken) {
        commit(types.AUTHENTICATED);
        Auth.setToken(data.accessToken);
        router.push('/');
      }
    } catch (error) {
      throw error;
    }
  },
  async logout({ commit }) {
    try {
      await AuthService.logout();
      commit(types.UNAUTHENTICATED);
      Auth.removeToken();
      router.push('/');
    } catch (error) {
      throw error;
    }
  },
  async register({ commit }, params) {
    try {
      const response = await AuthService.register(params);
      const data = await Auth.handlerSuccessResponse(response);
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
      const response = await AuthService.getToken(params);
      return Auth.handlerSuccessResponse(response);
    } catch (error) {
      throw error;
    }
  },
  async resetPassword(context, params) {
    try {
      const response = await AuthService.resetPassword(params);
      return Auth.handlerSuccessResponse(response);
    } catch (error) {
      throw error;
    }
  },
  async changePassword({ commit }, params) {
    try {
      const response = await AuthService.changePassword(params);
      const data = await Auth.handlerSuccessResponse(response);
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
      return await AuthService.getGeetestOptions();
    } catch (error) {
      throw error;
    }
  },
  /**
   * 验证用户是否存在以及邀请码是否正确
   *
   * @param context
   * @param params
   * @example:
   * params: {
   *   username: '',
   *   invitationCode: '',
   * }
   * @returns {Promise<*>}
   */
  async validateUsername(context, params) {
    try {
      const response = await AuthService.validateUser(params);
      return Auth.handlerSuccessResponse(response);
    } catch (error) {
      throw error;
    }
  },
  // 设置交易密码
  async setPaymentPassword(context, params) {
    try {
      const response = await AuthService.setPaymentPassword(params);
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
