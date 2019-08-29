// const prod = 'https://api.fin-bee.com';
<<<<<<< HEAD
const prod = 'http://uat.xjetry.top:8091';
const dev = 'http://dev.xjetry.top:8081';
=======
const prod = 'http://dev.xjetry.top:8084';
// const dev = 'http://dev.xjetry.top:8081';
// const dev = 'http://localhost:8091';
const dev = 'http://dev.xjetry.top:8084';
>>>>>>> 63d0205d7e1aa11bf3e64409543481408ab1afbb

const env = process.env.NODE_ENV || 'development';

const config = {
  development: dev,
  production: prod,
};

export default config[env];
