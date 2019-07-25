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
}
