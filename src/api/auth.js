import request from '@utils/request';
import { handlerResponse } from '@/utils/auth';

class AuthService {
  static async login({ username, password, geetestOptions }) {
    try {
      const requestOptions = {
        url: '/auth/signin',
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        data: {
          username,
          password,
          ...geetestOptions,
        },
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async logout() {
    try {
      const requestOptions = {
        url: '/auth/signout',
        method: 'post',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async register({
    username,
    password,
    token,
    invitationCode,
    countryCode,
  }) {
    try {
      const requestOptions = {
        url: '/auth/register',
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        data: {
          username,
          password,
          token,
          invitation_code: invitationCode,
          country_calling_code: countryCode,
        },
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getGeetestOptions() {
    try {
      const requestOptions = {
        url: '/auth/get-geetest-settings',
        method: 'get',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * 发送验证码
   * @param username
   * @param countryCode
   * @param geetestOptions
   * @returns {Promise<*>}
   */
  static async getToken({ username, countryCode, geetestOptions }) {
    try {
      const requestOptions = {
        url: '/auth/send-token',
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        data: {
          target: username,
          country_calling_code: countryCode,
          ...geetestOptions,
        },
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async resetPassword({ username, password, token }) {
    try {
      const requestOptions = {
        url: '/auth/reset-password',
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        data: {
          username,
          password,
          token,
        },
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async changePassword({ oldPassword, newPassword }) {
    try {
      const requestOptions = {
        url: '/auth/change-password',
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        data: {
          new_password: newPassword,
          old_password: oldPassword,
        },
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * 验证用户是否存在以及邀请码是否正确
   *
   * @param username
   * @param invitationCode
   * @returns {Promise<*>}
   */
  static async validateUser({ username, invitationCode }) {
    try {
      const requestOptions = {
        url: '/auth/valide-register-name',
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        data: {
          username,
          invitation_code: invitationCode,
        },
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 设置交易密码
  static async setPaymentPassword({ password, token }) {
    try {
      const requestOptions = {
        url: '/auth/set-payment-password',
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        data: {
          password,
          token,
        },
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default AuthService;
