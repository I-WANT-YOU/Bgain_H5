import Vue from 'vue';
// import eruda from 'eruda';
import App from './App.vue';
import router from './router';
import store from './store';
import 'amfe-flexible';
import 'normalize.css';
import './assets/css/common.css';

import './assets/scripts/geetest';
import './icons';

import vVisible from '@/directive/v-visible';

Vue.config.productionTip = false;

// if (process.env.NODE_ENV === 'development') {
//   eruda.init();
// }

Vue.use(vVisible);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
