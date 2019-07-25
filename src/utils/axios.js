import axios from 'axios';

const serve = axios.create({
  timeout: 20000,
});

serve.interceptors.request.use(
  config =>
  // config.headers["authentication"] = "test";

    config,
  (error) => {
    // 请求错误处理
    Promise.reject(error);
  },
);

serve.interceptors.response.use(
  response =>
    // 成功请求到数据
    // 这里根据后端提供的数据进行对应的处理
    response,
  error =>
    // 响应错误处理
    Promise.reject(error),

);

export default serve;
