// const prod = 'https://api.fin-bee.com';
// const dev = 'http://dev.xjetry.top:8081';
// const dev = 'http://dev.xjetry.top:8084';
// const dev = 'http://dev.xjetry.top:8084';
const prod = 'http://dev.xjetry.top:8084';
const dev = 'http://dev.xjetry.top:8084';
// const dev = 'http://dev.xjetry.top:8085';
// const dev = 'http://192.168.50.174:8091';

const env = process.env.NODE_ENV || 'development';

const config = {
  development: dev,
  production: prod,
};

export default config[env];
