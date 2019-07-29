import axios from 'axios';
import router from '../router';

import * as Auth from './auth';
import baseUrl from '../config/baseUrl';

const request = axios.create({
  timeout: 5000,
  baseURL: baseUrl,
});

request.interceptors.request.use(
  (config) => {
    const requestConfig = config;
    const accessToken = Auth.getToken();

    if (accessToken) {
      requestConfig.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (process.env.NODE_ENV === 'development') {
      requestConfig.headers.Authorization = 'Bearer 10';
    }

    requestConfig.headers.language = 'ZH_CN';

    return requestConfig;
  },
  error => Promise.reject(error),
);

request.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response.status === 401) {
      Auth.removeToken();
      router.replace({
        path: '/login',
      });
    }
    return Promise.reject(error);
  },
);

export default request;
