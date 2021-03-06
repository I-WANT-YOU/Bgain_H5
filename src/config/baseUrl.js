const dev = 'https://api.fin-bee.com';
const prod = 'https://api.fin-bee.com';

// const dev = 'http://dev.xjetry.top:9091/';
// const prod = 'http://dev.xjetry.top:9091';

// const dev = 'http://dev.xjetry.top:8081';
// const prod = 'http://dev.xjetry.top:8081';

// const dev = 'http://dev.xjetry.top:8084';
// const prod = 'http://dev.xjetry.top:8084';


const env = process.env.NODE_ENV || 'development';

const config = {
  development: dev,
  production: prod,
};

export default config[env];
