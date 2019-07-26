import request from '@utils/request';
import { handlerResponse } from '@/utils/auth';

export default class AuthService {
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
      throw error;
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
      throw error;
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
      throw error;
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
      throw error;
    }
  }

  static async getToken({ username, geetestOptions }) {
    try {
      const requestOptions = {
        url: '/auth/send-token',
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        data: {
          target: username,
          ...geetestOptions,
        },
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw error;
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
      throw error;
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
      throw error;
    }
  }

  static async validateUsername(username) {
    try {
      const requestOptions = {
        url: '/auth/valide-register-name',
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        data: { username },
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw error;
    }
  }
}
