import Vue from 'vue';
import eruda from 'eruda';
import App from './App.vue';
import router from './router';
import store from './store';
import 'amfe-flexible';
import 'normalize.css';
import './assets/css/common.css';

import './assets/scripts/geetest';
import './icons';

Vue.config.productionTip = false;

if (process.env.NODE_ENV === 'development') {
  eruda.init();
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
