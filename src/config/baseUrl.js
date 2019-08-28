// const prod = 'https://api.fin-bee.com';
const prod = 'http://dev.xjetry.top:8081';
const dev = 'http://dev.xjetry.top:8081';

const env = process.env.NODE_ENV || 'development';

const config = {
  development: dev,
  production: prod,
};

export default config[env];
