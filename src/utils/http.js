import axios from 'axios';
import router from '../router';

const request = axios.create({
  timeout: 5000,
});

request.interceptors.request.use(
  (config) => {
    const requestConfig = config;
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      requestConfig.headers.Authorization = accessToken;
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
      localStorage.removeItem('access_token');
      router.replace({
        path: '/login',
      });
    }
    return Promise.reject(error);
  },
);

export default request;
