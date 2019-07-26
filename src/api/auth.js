import request from '@utils/request';

export default class AuthService {
  static login({ username, password, geetestOptions }) {
    return request({
      url: '/auth/signin',
      headers: { 'Content-Type': 'application/json' },
      method: 'post',
      data: {
        username,
        password,
        ...geetestOptions,
      },
    });
  }

  static logout() {
    return request({
      url: '/auth/signout',
      method: 'post',
    });
  }

  static register({
    username,
    password,
    token,
    invitationCode,
    countryCode,
  }) {
    return request({
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
    });
  }

  static getGeetestOptions() {
    return request({
      url: '/auth/get-geetest-settings',
      method: 'get',
    });
  }

  static getToken({ username, geetestOptions }) {
    return request({
      url: '/auth/send-token',
      headers: { 'Content-Type': 'application/json' },
      method: 'post',
      data: {
        target: username,
        ...geetestOptions,
      },
    });
  }

  static resetPassword({ username, password, token }) {
    return request({
      url: '/auth/reset-password',
      headers: { 'Content-Type': 'application/json' },
      method: 'post',
      data: {
        username,
        password,
        token,
      },
    });
  }

  static changePassword({ oldPassword, newPassword }) {
    return request({
      url: '/auth/change-password',
      headers: { 'Content-Type': 'application/json' },
      method: 'post',
      data: {
        new_password: newPassword,
        old_password: oldPassword,
      },
    });
  }

  static validateUsername(username) {
    return request({
      url: '/auth/valide-register-name',
      headers: { 'Content-Type': 'application/json' },
      method: 'post',
      data: { username },
    });
  }
}
