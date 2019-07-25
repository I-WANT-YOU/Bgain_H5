import axios from 'axios';

const serve = axios.create({
  timeout: 5000,
});

serve.interceptors.request.use(
  config => config,
  // config.headers["authentication"] = "test";
  error => Promise.reject(error),
  // 请求错误处理
);

serve.interceptors.response.use(
  response => response,
  // 成功请求到数据
  // 这里根据后端提供的数据进行对应的处理
  error => Promise.reject(error),
  // 响应错误处理
);

export default serve;
